
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUpIcon, CopyIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';

const DEFAULT_INTERVAL_MS = 2000;

enum Status {
  Idle,
  Requesting,
  Watching,
  Translating,
  Error,
}

const StatusIndicator: React.FC<{ status: Status; t: (k: string)=>string }> = ({ status, t }) => {
  const statusConfig = {
    [Status.Idle]: { color: 'bg-gray-400', key: 'idle' },
    [Status.Requesting]: { color: 'bg-blue-400 animate-pulse', key: 'requesting' },
    [Status.Watching]: { color: 'bg-green-400 animate-pulse', key: 'watching' },
    [Status.Translating]: { color: 'bg-yellow-400 animate-pulse', key: 'translating' },
    [Status.Error]: { color: 'bg-red-500', key: 'error' },
  } as const;
  const { color, key } = statusConfig[status];
  return (
    <div className="absolute top-3 right-3 bg-black/50 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2">
      <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
      <span>{t(`translator.status.${key}`)}</span>
    </div>
  );
};

const Translator: React.FC = () => {
  const { t, isLoaded } = useTranslations();
  const { language } = useLanguage();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [detectedText, setDetectedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastProcessTimeRef = useRef<number>(0);
  const inFlightRef = useRef<boolean>(false);

  const processInterval = DEFAULT_INTERVAL_MS;

  const canvasToBlob = (canvas: HTMLCanvasElement, type = 'image/jpeg', quality = 0.9) =>
    new Promise<Blob>((resolve, reject) => {
      try {
        canvas.toBlob((blob) => {
          if (!blob) return reject(new Error('Failed to capture frame'));
          resolve(blob);
        }, type, quality);
      } catch (e) {
        reject(e);
      }
    });
  
  const blobToBase64 = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') {
          return reject(new Error('Failed to read blob as string'));
        }
        // remove data:mime/type;base64,
        resolve(reader.result.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const processFrame = useCallback(async () => {
    if (inFlightRef.current || !videoRef.current) return;
    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) return;

    inFlightRef.current = true;
    setStatus(Status.Translating);

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const canvas = canvasRef.current ?? document.createElement('canvas');
      if (!canvasRef.current) canvasRef.current = canvas;

      const w = video.videoWidth;
      const h = video.videoHeight;
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get 2D context');

      ctx.save();
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, w, h);
      ctx.restore();

      const blob = await canvasToBlob(canvas, 'image/jpeg', 0.9);
      const base64Data = await blobToBase64(blob);
      
      const imagePart = {
        inlineData: {
          mimeType: 'image/jpeg',
          data: base64Data,
        },
      };

      const prompt = language === 'ar' 
        ? "أنت خبير في لغة الإشارة العربية (ArSL). ما هو الحرف الذي يتم الإشارة به في هذه الصورة؟ أجب بالحرف الواحد فقط. إذا لم تكتشف أي إشارة، أجب بنص فارغ."
        : "You are an expert American Sign Language (ASL) translator. What letter is being signed in this image? Respond with only the single letter. If no sign is detected, respond with an empty string.";

      const textPart = { text: prompt };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [imagePart, textPart] },
      });

      const resultText = response.text.trim();

      if (resultText && resultText.length > 0) {
        setDetectedText(resultText.substring(0, 1).toUpperCase());
        setConfidence(0.95);
      } else {
        setDetectedText('');
        setConfidence(0);
      }
      
      setStatus(Status.Watching);
    } catch (e: any) {
      console.error('Gemini API Error:', e);
      setError(e?.message || t('translator.apiError'));
      setStatus(Status.Error);
    } finally {
      inFlightRef.current = false;
    }
  }, [t, language]);

  const loop = useCallback(
    (ts: number) => {
      if (lastProcessTimeRef.current === 0) lastProcessTimeRef.current = ts;
      const elapsed = ts - lastProcessTimeRef.current;
      if (elapsed >= processInterval && isCameraOn && status !== Status.Error) {
        lastProcessTimeRef.current = ts;
        processFrame();
      }
      animationFrameRef.current = requestAnimationFrame(loop);
    },
    [isCameraOn, processInterval, processFrame, status]
  );

  const startProcessing = useCallback(() => {
    setStatus(Status.Watching);
    lastProcessTimeRef.current = 0;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const stopProcessing = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const startCamera = async () => {
    if (isCameraOn) return;
    setStatus(Status.Requesting);
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
        startProcessing();
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setError(t('translator.cameraError'));
      setStatus(Status.Error);
      setIsCameraOn(false);
    }
  };

  const stopCamera = useCallback(() => {
    if (streamRef.current) streamRef.current.getTracks().forEach((tr) => tr.stop());
    setIsCameraOn(false);
    setStatus(Status.Idle);
    setDetectedText('');
    setConfidence(0);
    setError(null);
    stopProcessing();
    streamRef.current = null;
  }, [stopProcessing]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleSpeak = () => {
    if (!detectedText || typeof window.speechSynthesis === 'undefined') return;
    const u = new SpeechSynthesisUtterance(detectedText);
    u.lang = document.documentElement.lang === 'ar' ? 'ar-SA' : 'en-US';
    u.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

  const handleCopy = () => {
    if (!detectedText) return;
    navigator.clipboard.writeText(detectedText).catch((err) => console.error('Failed to copy: ', err));
  };

  const handleRetry = () => {
    setError(null);
    inFlightRef.current = false;
    setStatus(Status.Watching);
    lastProcessTimeRef.current = 0;
  };

  if (!isLoaded) return <section className="py-16 sm:py-24 min-h-[600px]" />;

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto bg-accent/30 dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-lg border border-primary/10 dark:border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* video */}
            <div className="relative aspect-video bg-primary-dark dark:bg-black/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transform -scale-x-100 ${isCameraOn ? 'opacity-100' : 'opacity-0'}`}
              />

              {!isCameraOn && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  {error ? (
                    <p className="text-red-400">{error}</p>
                  ) : (
                    <>
                      <p className="text-accent mb-4 text-lg">{t('translator.prompt')}</p>
                      <motion.button
                        onClick={startCamera}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-colors"
                      >
                        {t('translator.startCamera')}
                      </motion.button>
                    </>
                  )}
                </div>
              )}

              {isCameraOn && status !== Status.Error && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <div className="w-5/6 h-5/6 border-2 border-dashed border-white/40 rounded-2xl flex items-center justify-center">
                    <p className="text-white/60 bg-black/30 px-4 py-1 rounded-full animate-pulse">
                      {t('translator.handInFrame')}
                    </p>
                  </div>
                </div>
              )}
              {status === Status.Error && isCameraOn && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center p-4 text-center">
                  <p className="text-red-400 mb-4 text-lg">{error}</p>
                  <motion.button
                    onClick={handleRetry}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-secondary text-primary-dark font-bold py-2 px-5 rounded-xl shadow-md hover:bg-secondary-light transition-colors"
                  >
                    {t('translator.retryButton')}
                  </motion.button>
                </div>
              )}
              <StatusIndicator status={status} t={t} />
            </div>

            {/* results panel */}
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-4">
                  {t('translator.modes.letters')}
                </h3>

                <div
                  className="w-full min-h-[150px] bg-white dark:bg-dark-card p-4 rounded-2xl shadow-inner text-primary-dark dark:text-white text-2xl font-medium leading-relaxed"
                  aria-live="polite"
                >
                  {detectedText || (
                    <span className="text-gray-400 dark:text-gray-400">
                      {t('translator.placeholder.letters')}
                    </span>
                  )}
                </div>

                <div className="w-full bg-gray-200 dark:bg-dark-card rounded-full h-2.5 my-4 overflow-hidden">
                  <motion.div
                    className="h-2.5 rounded-full bg-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <motion.button
                  onClick={handleSpeak}
                  disabled={!detectedText}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-primary dark:bg-secondary dark:text-primary-dark text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-primary-light dark:hover:bg-secondary-light transition-all disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <VolumeUpIcon className="w-5 h-5" />
                  <span>{t('translator.speakButton')}</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    onClick={() => navigator.clipboard.writeText(detectedText).catch(console.error)}
                    disabled={!detectedText}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-gray-200 dark:bg-dark-card text-primary-dark dark:text-white rounded-xl shadow-md hover:bg-gray-300 dark:hover:bg-dark-surface transition-all disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:text-white disabled:cursor-not-allowed"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key="copy"
                        initial={{ scale: 0.5, rotate: 90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0.5, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CopyIcon className="w-5 h-5" />
                      </motion.div>
                    </AnimatePresence>
                  </motion.button>
                </div>

                {isCameraOn && (
                  <motion.button
                    onClick={stopCamera}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all"
                  >
                    {t('translator.stopButton')}
                  </motion.button>
                )}
              </div>

              <p className="text-xs text-center text-primary/60 dark:text-accent/60 mt-4">
                {t('translator.privacyNote')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Translator;
