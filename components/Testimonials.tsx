import React from 'react';
import { motion, Variants } from 'framer-motion';
import { StarIcon, QuoteIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


const Testimonials: React.FC = () => {
    const { t, T, isLoaded } = useTranslations();
    const testimonials = T('testimonials.items');

    if (!isLoaded) return <section className="py-12 sm:py-20" />;

    return (
        <section className="py-12 sm:py-20 bg-accent dark:bg-dark-surface">
            <div className="container mx-auto px-4">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold text-center text-primary-dark dark:text-white mb-12"
                >
                    {t('testimonials.title')}
                </motion.h2>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {testimonials.map((testimonial: any, index: number) => (
                        <motion.div 
                            key={index}
                            variants={itemVariants}
                            className="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg flex flex-col items-center text-center dark:border dark:border-white/10 relative overflow-hidden"
                        >
                            <QuoteIcon className="absolute top-4 left-4 w-20 h-20 text-primary/5 dark:text-white/5 transform -rotate-12" />
                            <div className="relative z-10 flex flex-col items-center h-full">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-20 h-20 rounded-full mb-4 border-4 border-secondary/50" />
                                <div className="flex gap-1 text-secondary mb-4">
                                    {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                                </div>
                                <blockquote className="text-primary-light dark:text-accent/80 italic mb-6 flex-grow">
                                    "{testimonial.quote}"
                                </blockquote>
                                <div className="mt-auto">
                                    <p className="font-bold text-primary-dark dark:text-white">{testimonial.name}</p>
                                    <p className="text-sm text-primary-light/70 dark:text-accent/70">{testimonial.title}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
