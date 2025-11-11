
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUpIcon, CopyIcon, CameraIcon, UploadIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

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

interface TranslatorProps {
    mode: 'letters' | 'words';
}

const Translator: React.FC<TranslatorProps> = ({ mode }) => {
  const { t, isLoaded } = useTranslations();

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [status, setStatus] = useState<Status>(Status.Idle);
  const [detectedText, setDetectedText] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ file: File; url: string } | null>(null);
  const [captureInterval, setCaptureInterval] = useState(5); // Default 5 seconds

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inFlightRef = useRef<boolean>(false);

  const analyzeImageBlob = useCallback(async (imageBlob: Blob) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus(Status.Translating);
    setError(null);
    setDetectedText('');
    setConfidence(0);

    if (mode === 'words') {
        console.log('[DEBUG] Simulating analysis for "words" mode...');
        setTimeout(() => {
            const lang = document.documentElement.lang;
            setDetectedText(lang === 'ar' ? 'مرحباً' : 'Hello');
            setConfidence(0.92);
            if (streamRef.current) {
                setStatus(Status.Watching);
            } else {
                setStatus(Status.Idle);
            }
            inFlightRef.current = false;
            console.log('[DEBUG] Words analysis simulation finished.');
        }, 1200); // Simulate network delay
        return;
    }
    
    // Existing logic for 'letters' mode
    console.log('[DEBUG] Starting analysis for "letters" mode...');
    try {
      const formData = new FormData();
      formData.append('image', imageBlob, 'capture.jpg');
      
      const backendUrl = 'https://pattae-melissa-nondoubtingly.ngrok-free.dev/analyze';
      console.log(`[DEBUG] Attempting to POST to ${backendUrl}...`);

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });
      
      console.log('[DEBUG] Received response from backend:', response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('[DEBUG] Parsed JSON result:', result);

      if (result && result.label) {
        setDetectedText(result.label.substring(0, 1).toUpperCase());
        setConfidence(result.confidence || 0);
      } else {
        setDetectedText('');
        setConfidence(0);
      }
      
      if (streamRef.current) {
        setStatus(Status.Watching);
      } else {
        setStatus(Status.Idle);
      }
    } catch (e: any) {
      console.error('API Error:', e);
      if (e instanceof TypeError) {
          console.error('This might be a CORS or network issue. Check the browser console and network tab for more details.');
          setError(t('translator.apiError') + " (قد تكون مشكلة CORS)");
      } else {
        setError(e?.message || t('translator.apiError'));
      }
      setStatus(Status.Error);
    } finally {
      inFlightRef.current = false;
      console.log('[DEBUG] Letters analysis finished.');
    }
  }, [t, mode]);

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

  const processFrame = useCallback(async () => {
    if (inFlightRef.current || !videoRef.current || !isCameraOn) return;
    const video = videoRef.current;

    if (!video.videoWidth || !video.videoHeight) return;

    try {
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
      await analyzeImageBlob(blob);
    } catch (e) {
      console.error("Error processing frame:", e);
    }
  }, [analyzeImageBlob, isCameraOn]);
  
  const clearSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.url);
    }
    setSelectedImage(null);
    setError(null);
    setDetectedText('');
    setConfidence(0);
    setStatus(Status.Idle);
  };
  
  const stopCamera = useCallback(() => {
    if (streamRef.current) streamRef.current.getTracks().forEach((tr) => tr.stop());
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsCameraOn(false);
    setStatus(Status.Idle);
    setDetectedText('');
    setConfidence(0);
    setError(null);
    streamRef.current = null;
  }, []);
  
  const startCamera = async () => {
    if (isCameraOn) return;
    clearSelectedImage();
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
        setStatus(Status.Watching);
      }
    } catch (err) {
      console.error('Camera access denied:', err);
      setError(t('translator.cameraError'));
      setStatus(Status.Error);
      setIsCameraOn(false);
    }
  };

  useEffect(() => {
    if (isCameraOn) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        processFrame();
      }, captureInterval * 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isCameraOn, processFrame, captureInterval]);


  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (isCameraOn) stopCamera();
      setSelectedImage({ file, url: URL.createObjectURL(file) });
      setError(null);
      setDetectedText('');
      setConfidence(0);
      setStatus(Status.Idle);
    }
    if (event.target) {
        event.target.value = '';
    }
  };
  
  const handleAnalyzeUploadedImage = () => {
    if (selectedImage) {
        analyzeImageBlob(selectedImage.file);
    }
  };

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
    if(isCameraOn) {
      setStatus(Status.Watching);
    } else {
      setStatus(Status.Idle);
    }
  };

  if (!isLoaded) return <section className="py-16 sm:py-24 min-h-[600px]" />;

  return (
    <section className="pb-16 sm:pb-24 pt-8 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl mx-auto bg-accent/30 dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-lg border border-primary/10 dark:border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* video & image preview */}
            <div className="relative aspect-video bg-primary-dark dark:bg-black/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover transform -scale-x-100 transition-opacity duration-300 ${isCameraOn ? 'opacity-100' : 'opacity-0 absolute'}`}
              />

              {selectedImage && !isCameraOn && (
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={selectedImage.url}
                    alt={t('translator.imagePreviewAlt')}
                    className="w-full h-full object-contain"
                />
              )}

              {!isCameraOn && !selectedImage && (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  {error ? (
                    <p className="text-red-400">{error}</p>
                  ) : (
                    <>
                      <p className="text-accent mb-4 text-lg">{t('translator.prompt')}</p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <motion.button
                            onClick={startCamera}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-colors flex items-center justify-center gap-2"
                        >
                            <CameraIcon className="w-5 h-5" />
                            <span>{t('translator.startCamera')}</span>
                        </motion.button>
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                        <motion.button
                            onClick={() => fileInputRef.current?.click()}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-accent/80 text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-accent transition-colors flex items-center justify-center gap-2"
                        >
                            <UploadIcon className="w-5 h-5"/>
                            <span>{t('translator.uploadImage')}</span>
                        </motion.button>
                      </div>
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
              {status === Status.Error && (isCameraOn || selectedImage) && (
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
            <div className="flex flex-col justify-between h-full min-h-[250px] sm:min-h-0">
              <div>
                <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-4">
                  {t(`translator.modes.${mode}`)}
                </h3>
                <div
                  className="w-full min-h-[150px] bg-white dark:bg-dark-card p-4 rounded-2xl shadow-inner text-primary-dark dark:text-white text-2xl font-medium leading-relaxed"
                  aria-live="polite"
                >
                  {detectedText || (
                    <span className="text-gray-400 dark:text-gray-400">
                      {t(`translator.placeholder.${mode}`)}
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

              <div className="flex flex-col gap-4 mt-4">
                <div className="px-1">
                    <label htmlFor="interval-slider" className="block text-sm font-medium text-primary-dark/80 dark:text-accent/80 mb-2">
                        {t('translator.captureIntervalLabel').replace('{seconds}', captureInterval.toString())}
                    </label>
                    <input
                        id="interval-slider"
                        type="range"
                        min="2"
                        max="10"
                        step="1"
                        value={captureInterval}
                        onChange={(e) => setCaptureInterval(Number(e.target.value))}
                        disabled={isCameraOn}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-dark-card disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={t('translator.captureIntervalLabel').replace('{seconds}', captureInterval.toString())}
                    />
                </div>

                <AnimatePresence mode="wait">
                  {isCameraOn && (
                     <motion.div key="camera-controls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.button onClick={stopCamera} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all">
                            {t('translator.stopButton')}
                        </motion.button>
                     </motion.div>
                  )}
                  {selectedImage && !isCameraOn && (
                    <motion.div key="image-controls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                        <motion.button onClick={handleAnalyzeUploadedImage} disabled={status === Status.Translating} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1 bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-all disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {status === Status.Translating ? t('translator.status.translating') : t('translator.analyzeImageButton')}
                        </motion.button>
                        <motion.button onClick={clearSelectedImage} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all">
                            {t('translator.removeImageButton')}
                        </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-center gap-4">
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
                        onClick={handleCopy}
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
                </div>
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
