import React from 'react';
import { motion, Variants } from 'framer-motion';
import { FastForwardIcon, TargetIcon, ShieldIcon, ArrowExchangeIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const iconMap: { [key: string]: React.ReactNode } = {
  fast: <FastForwardIcon className="w-10 h-10 text-secondary" />,
  accurate: <TargetIcon className="w-10 h-10 text-secondary" />,
  private: <ShieldIcon className="w-10 h-10 text-secondary" />,
  bilingual: <ArrowExchangeIcon className="w-10 h-10 text-secondary" />,
};

const WhyMubsir: React.FC = () => {
  const { t, T, isLoaded } = useTranslations();
  const features = T('whyMubsir.features');
  
  if (!isLoaded) return <section className="py-16 sm:py-24" />;

  return (
    <section id="about" className="py-16 sm:py-24 bg-accent dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-primary-dark dark:text-white mb-16">
            {t('whyMubsir.title')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature: any, index: number) => (
            <motion.div 
              key={index} 
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white dark:bg-dark-card p-8 rounded-3xl shadow-lg text-center dark:border dark:border-white/10 flex flex-col">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 dark:bg-secondary/20">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-2xl font-bold text-primary-dark dark:text-white mb-2">{feature.title}</h3>
              <p className="text-primary-light dark:text-accent/80 flex-grow">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMubsir;