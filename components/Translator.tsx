
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VolumeUpIcon, CopyIcon, CameraIcon, UploadIcon, CheckIcon } from './icons';
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
    [Status.Watching]: { color: 'bg-green-400', key: 'watching' },
    [Status.Translating]: { color: 'bg-yellow-400 animate-pulse', key: 'translating' },
    [Status.Error]: { color: 'bg-red-500', key: 'error' },
  } as const;
  const { color, key } = statusConfig[status];
  return (
    <div className="absolute top-3 right-3 bg-black/50 text-white text-sm px-3 py-1 rounded-full flex items-center gap-2 z-10">
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
  const [captureInterval, setCaptureInterval] = useState(5);
  const [isCopied, setIsCopied] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<number | null>(null);
  const inFlightRef = useRef<boolean>(false);

  const analyzeImageBlob = useCallback(async (imageBlob: Blob) => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setStatus(Status.Translating);
    setError(null);
    setDetectedText('');
    setConfidence(0);

    const backendUrl = mode === 'words'
        ? 'https://pattae-melissa-nondoubtingly.ngrok-free.dev/analyze_word'
        : 'https://pattae-melissa-nondoubtingly.ngrok-free.dev/analyze';

    try {
      const formData = new FormData();
      formData.append('image', imageBlob, 'capture.jpg');

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const result = await response.json();

      if (result && result.label) {
        if (mode === 'letters') {
            setDetectedText(result.label.substring(0, 1).toUpperCase());
        } else {
            setDetectedText(result.label);
        }
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
          setError(t('translator.apiError') + " (CORS or network issue)");
      } else {
        setError(e?.message || t('translator.apiError'));
      }
      setStatus(Status.Error);
    } finally {
      inFlightRef.current = false;
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
    if (!detectedText || isCopied) return;
    navigator.clipboard.writeText(detectedText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }).catch((err) => console.error('Failed to copy: ', err));
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
    <section className="pb-12 sm:pb-20 pt-8 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col items-center gap-6 sm:gap-8"
        >
          {/* Video/Image Display */}
          <div className="relative w-full max-w-3xl aspect-video bg-primary-dark dark:bg-black/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-lg border-4 border-primary/10 dark:border-white/10">
              <div className={`absolute inset-0 border-4 rounded-xl pointer-events-none transition-colors duration-500 ${status === Status.Watching ? 'border-secondary animate-pulse' : 'border-transparent'}`} />
            
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
                   <p className="text-accent mb-4 text-lg">{t('translator.prompt')}</p>
                </div>
              )}

              {isCameraOn && status !== Status.Error && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <div className="w-5/6 h-5/6 border-2 border-dashed border-white/40 rounded-2xl flex items-center justify-center">
                    <p className="text-white/60 bg-black/30 px-4 py-1 rounded-full">
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

          {/* Result Display */}
          <div className="w-full text-center min-h-[120px] sm:min-h-[160px] flex items-center justify-center">
            <AnimatePresence>
            {detectedText && status !== Status.Translating && status !== Status.Error && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative flex items-center gap-4">
                        <p className="text-6xl sm:text-7xl md:text-8xl font-bold text-primary-dark dark:text-white" dir="ltr">
                            {detectedText}
                        </p>
                        <div className="flex flex-col gap-2">
                             <motion.button
                                onClick={handleSpeak}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="p-3 bg-gray-200 dark:bg-dark-card text-primary-dark dark:text-white rounded-full shadow-sm hover:bg-gray-300 dark:hover:bg-dark-surface transition-all"
                                aria-label={t('translator.speakButton')}
                            >
                                <VolumeUpIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                onClick={handleCopy}
                                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                className="p-3 bg-gray-200 dark:bg-dark-card text-primary-dark dark:text-white rounded-full shadow-sm hover:bg-gray-300 dark:hover:bg-dark-surface transition-all"
                                aria-label={t('translator.copyButton')}
                            >
                                {isCopied ? <CheckIcon className="w-5 h-5 text-green-500" /> : <CopyIcon className="w-5 h-5" />}
                            </motion.button>
                        </div>
                    </div>
                    <motion.p 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="mt-2 text-primary/70 dark:text-accent/70 font-medium"
                    >
                        {t('translator.confidenceLabel')}: {Math.round(confidence * 100)}%
                    </motion.p>
                </motion.div>
            )}
            </AnimatePresence>
            {!detectedText && status !== Status.Error && (
                <p className="text-gray-400 dark:text-gray-500 text-lg">
                    {t(`translator.placeholder.${mode}`)}
                </p>
            )}
            </div>

          {/* Controls Area */}
          <div className="w-full max-w-xl flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
                {!isCameraOn && !selectedImage && (
                    <motion.div 
                        key="idle-controls"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex flex-col sm:flex-row gap-4 w-full"
                    >
                         <motion.button
                            onClick={startCamera}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-colors flex items-center justify-center gap-2 text-lg"
                        >
                            <CameraIcon className="w-6 h-6" />
                            <span>{t('translator.startCamera')}</span>
                        </motion.button>
                        <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />
                        <motion.button
                            onClick={() => fileInputRef.current?.click()}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="flex-1 bg-accent/80 text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-accent transition-colors flex items-center justify-center gap-2 text-lg"
                        >
                            <UploadIcon className="w-6 h-6"/>
                            <span>{t('translator.uploadImage')}</span>
                        </motion.button>
                    </motion.div>
                )}
                {isCameraOn && (
                    <motion.div 
                        key="camera-controls"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="w-full flex flex-col items-center gap-4"
                    >
                        <motion.button onClick={stopCamera} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full max-w-xs bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all text-lg">
                            {t('translator.stopButton')}
                        </motion.button>
                        <div className="w-full max-w-xs px-1">
                            <label htmlFor="interval-slider" className="block text-sm font-medium text-primary-dark/80 dark:text-accent/80 mb-2 text-center">
                                {t('translator.captureIntervalLabel').replace('{seconds}', captureInterval.toString())}
                            </label>
                            <input
                                id="interval-slider"
                                type="range" min="2" max="10" step="1"
                                value={captureInterval}
                                onChange={(e) => setCaptureInterval(Number(e.target.value))}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-dark-card"
                                aria-label={t('translator.captureIntervalLabel').replace('{seconds}', captureInterval.toString())}
                            />
                        </div>
                    </motion.div>
                )}
                {selectedImage && !isCameraOn && (
                    <motion.div 
                        key="image-controls"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-4"
                    >
                        <motion.button onClick={handleAnalyzeUploadedImage} disabled={status === Status.Translating} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-all disabled:bg-gray-400 disabled:cursor-not-allowed text-lg">
                            {status === Status.Translating ? t('translator.status.translating') : t('translator.analyzeImageButton')}
                        </motion.button>
                        <motion.button onClick={clearSelectedImage} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:bg-red-700 transition-all text-lg">
                            {t('translator.removeImageButton')}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-center text-primary/60 dark:text-accent/60 mt-4">
            {t('translator.privacyNote')}
          </p>

        </motion.div>
      </div>
    </section>
  );
};

export default Translator;
