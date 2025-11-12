import React from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';

interface CallToActionProps {
  onNavigate: (page: string) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ onNavigate }) => {
  const { t, isLoaded } = useTranslations();

  if (!isLoaded) return <section className="py-12 sm:py-20" />;

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-primary dark:bg-dark-card rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary to-primary-dark opacity-30 dark:opacity-50"></div>
            <div 
                className="absolute inset-0 bg-repeat"
                style={{
                    backgroundImage: `radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: '30px 30px'
                }}
            ></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {t('cta.title')}
            </h2>
            <p className="text-accent/80 max-w-2xl mx-auto mb-8">
                {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <motion.button
                onClick={() => onNavigate('sign-to-text')}
                whileHover={{ scale: 1.05, y: -4, filter: 'brightness(1.1)' }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-secondary text-primary-dark font-bold py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-secondary-light transition-all duration-300 hover:shadow-[0_0_25px_-5px_theme(colors.secondary.light)]"
                >
                {t('cta.button1')}
                </motion.button>
                <motion.button
                onClick={() => onNavigate('text-to-sign')}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-accent/20 text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg hover:bg-accent/30 transition-colors duration-300"
                >
                {t('cta.button2')}
                </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
