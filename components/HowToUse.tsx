import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CameraIcon, HandIcon, ReadIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const iconMap: { [key: string]: React.ReactNode } = {
  camera: <CameraIcon className="w-10 h-10 text-primary-dark" />,
  hand: <HandIcon className="w-10 h-10 text-primary-dark" />,
  read: <ReadIcon className="w-10 h-10 text-primary-dark" />,
};

const HowToUse: React.FC = () => {
  const { t, T, isLoaded } = useTranslations();
  const steps = T('howToUse.steps');

  if (!isLoaded) return <section className="py-12 sm:py-20" />;

  return (
    <section className="py-12 sm:py-20 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-primary-dark dark:text-white mb-12 sm:mb-16">
            {t('howToUse.title')}
        </motion.h2>
        <div className="relative">
            <div className="absolute top-16 left-0 w-full h-1 bg-secondary/30 dark:bg-secondary/20 hidden md:block" aria-hidden="true"></div>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {steps.map((step: any, index: number) => (
                <motion.div variants={itemVariants} key={index} className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="absolute -top-3 -right-3 bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-20 shadow-md">
                      {index + 1}
                    </div>
                    <div className="bg-secondary/20 rounded-full p-5 z-10 border-4 border-white dark:border-dark-background shadow-inner">
                        <div className="bg-secondary rounded-full p-5 shadow-lg">
                            {iconMap[step.icon]}
                        </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-primary-dark dark:text-white mb-2">{step.title}</h3>
                  <p className="text-primary-light dark:text-accent/80 max-w-xs">{step.description}</p>
                </motion.div>
            ))}
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
