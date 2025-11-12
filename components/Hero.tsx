import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';
import { useLanguage } from '../contexts/LanguageContext';

interface HeroProps {
  onStartClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartClick }) => {
  const { t, isLoaded } = useTranslations();
  const { dir } = useLanguage();

  if (!isLoaded) return <section className="py-20 md:py-32 min-h-[60vh]" />;

  return (
    <section id="home" className="py-16 sm:py-20 md:py-24 overflow-hidden animated-gradient dark:bg-accent-light">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className={`text-center ${dir === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
                <motion.h1
                    initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-dark dark:text-primary-dark mb-4 leading-tight"
                >
                    {t('hero.title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl text-primary max-w-3xl mx-auto md:mx-0 mb-8 leading-relaxed"
                >
                    {t('hero.subtitle.line1')}
                    <br />
                    {t('hero.subtitle.line2')}
                    <br />
                    {t('hero.subtitle.line3')}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                    className={`flex ${dir === 'rtl' ? 'md:justify-end' : 'md:justify-start'} justify-center`}
                >
                    <motion.button
                        onClick={onStartClick}
                        whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(228, 170, 104, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-secondary text-primary-dark font-bold py-4 px-10 rounded-2xl text-xl shadow-lg hover:bg-secondary-light transition-all duration-300"
                    >
                        {t('hero.ctaButton')}
                    </motion.button>
                </motion.div>
            </div>
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="hidden md:flex justify-center"
            >
                <motion.img 
                    src="https://i.postimg.cc/SsZ3p19W/logo-bsr.png" 
                    alt="Translating Sign Language"
                    className="w-full max-w-lg mx-auto"
                    animate={{
                        y: [0, -15, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
