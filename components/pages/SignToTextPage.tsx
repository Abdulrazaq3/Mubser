
import React, { useState } from 'react';
import Translator from '../Translator';
import { useTranslations } from '../../hooks/useTranslations';
import { motion } from 'framer-motion';

const SignToTextPage: React.FC = () => {
  const [mode, setMode] = useState<'letters' | 'words'>('letters');
  const { t, isLoaded } = useTranslations();

  if (!isLoaded) return <div className="bg-white dark:bg-dark-background min-h-screen" />;

  const TabButton: React.FC<{
    currentMode: 'letters' | 'words';
    targetMode: 'letters' | 'words';
    onClick: () => void;
    children: React.ReactNode;
  }> = ({ currentMode, targetMode, onClick, children }) => {
    const isActive = currentMode === targetMode;
    return (
      <button
        onClick={onClick}
        className={`relative w-1/2 py-4 px-1 text-center text-lg font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-t-lg ${
          isActive
            ? 'text-secondary dark:text-secondary-light'
            : 'text-primary/60 dark:text-accent/60 hover:text-primary dark:hover:text-accent'
        }`}
        aria-selected={isActive}
        role="tab"
      >
        {children}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-secondary dark:bg-secondary-light"
            layoutId="active-sign-tab"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </button>
    );
  };

  return (
    <div className="bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark dark:text-white mb-2">
            {t('signToTextPage.title')}
            </h2>
            <p className="text-primary-light dark:text-accent/80 mb-8 max-w-2xl mx-auto">
                {t('signToTextPage.subtitle')}
            </p>
        </div>
        <div role="tablist" aria-orientation="horizontal" className="max-w-md mx-auto flex border-b-2 border-primary/10 dark:border-white/10">
            <TabButton currentMode={mode} targetMode="letters" onClick={() => setMode('letters')}>
                {t('signToTextPage.lettersTab')}
            </TabButton>
            <TabButton currentMode={mode} targetMode="words" onClick={() => setMode('words')}>
                {t('signToTextPage.wordsTab')}
            </TabButton>
        </div>
      </div>
      <Translator key={mode} mode={mode} />
    </div>
  );
};

export default SignToTextPage;
