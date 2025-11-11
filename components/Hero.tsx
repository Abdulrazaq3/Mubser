import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  const { t, isLoaded } = useTranslations();

  if (!isLoaded) return <section className="py-20 md:py-32 h-[500px]" />;

  return (
    <section id="home" className="py-20 md:py-32 overflow-hidden animated-gradient dark:bg-dark-background">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold text-primary-dark dark:text-white mb-4 leading-tight"
        >
          {t('hero.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-lg md:text-xl text-primary-light dark:text-accent/80 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          {t('hero.subtitle.line1')}
          <br />
          {t('hero.subtitle.line2')}
          <br />
          {t('hero.subtitle.line3')}
        </motion.p>
        <motion.button
          onClick={onStartClick}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -4, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.95 }}
          className="bg-secondary text-primary-dark font-bold py-4 px-10 rounded-2xl text-xl shadow-lg hover:bg-secondary-light transition-all duration-300"
        >
          {t('hero.ctaButton')}
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;