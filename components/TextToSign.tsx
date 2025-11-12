
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HandIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const TextToSign: React.FC = () => {
  const { t, isLoaded } = useTranslations();
  const [text, setText] = useState('');
  const [showAvatar, setShowAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = () => {
    if (!text.trim()) return;
    setIsLoading(true);
    setShowAvatar(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowAvatar(true);
    }, 1500);
  };
  
  if (!isLoaded) return <section className="py-12 sm:py-20 min-h-[600px]" />;

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary-dark dark:text-white mb-4">
            {t('textToSign.title')}
          </h2>
          <p className="text-center text-primary-light dark:text-accent/80 mb-10 max-w-2xl mx-auto">
            {t('textToSign.subtitle')}
          </p>

          <div className="bg-accent/50 dark:bg-dark-surface p-6 sm:p-8 rounded-3xl shadow-lg border border-primary/10 dark:border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Input Area */}
              <div className="flex flex-col gap-4">
                <label htmlFor="text-input" className="text-xl font-bold text-primary-dark dark:text-white">
                  {t('textToSign.inputLabel')}
                </label>
                <textarea
                  id="text-input"
                  rows={5}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={t('textToSign.placeholder')}
                  className="w-full p-4 bg-white dark:bg-dark-card rounded-2xl shadow-inner text-primary-dark dark:text-white text-lg focus:ring-2 focus:ring-secondary focus:outline-none transition"
                />
                <motion.button
                  onClick={handleTranslate}
                  disabled={isLoading || !text.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isLoading ? t('textToSign.loadingButton') : t('textToSign.translateButton')}
                </motion.button>
              </div>

              {/* Avatar/GIF Display */}
              <div className="relative aspect-square bg-primary-dark/90 dark:bg-black/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
                {isLoading && (
                  <div className="text-primary dark:text-accent" aria-label={t('textToSign.loadingAria')}>
                    <svg className="animate-spin h-10 w-10 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                )}
                {!isLoading && showAvatar && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src="https://i.postimg.cc/Qd9w5z5Y/text-to-sign.gif"
                    alt={t('textToSign.avatarAlt')}
                    className="w-full h-full object-cover"
                  />
                )}
                 {!isLoading && !showAvatar && (
                    <div className="text-center p-4 text-accent/70 flex flex-col items-center justify-center gap-4">
                        <HandIcon className="w-16 h-16 opacity-30"/>
                        <p>{t('textToSign.avatarPlaceholder')}</p>
                    </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TextToSign;
