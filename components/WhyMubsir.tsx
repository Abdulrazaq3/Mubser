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
  
  if (!isLoaded) return <section className="py-12 sm:py-20" />;

  return (
    <section id="about" className="py-12 sm:py-20 bg-accent dark:bg-dark-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-repeat bg-center opacity-40 dark:opacity-100" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%231c3841\' fill-opacity=\'0.04\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      <div className="container mx-auto px-4 relative">
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
              className="bg-white/80 backdrop-blur-sm dark:bg-dark-card/80 p-8 rounded-3xl shadow-lg text-center dark:border dark:border-white/10 flex flex-col">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 dark:bg-secondary/20">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-primary-dark dark:text-white mb-2">{feature.title}</h3>
              <p className="text-primary-light dark:text-accent/80 flex-grow text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyMubsir;
