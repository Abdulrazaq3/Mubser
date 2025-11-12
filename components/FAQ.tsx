
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuestionMarkIcon } from './icons';
import { useTranslations } from '../hooks/useTranslations';

interface FAQItem {
  question: string;
  answer: string;
}

const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-primary/20 dark:border-white/20">
            <motion.h3>
                <button
                    onClick={onClick}
                    className="flex justify-between items-center w-full text-right py-5 px-2 text-lg font-medium text-primary-dark dark:text-white hover:bg-accent/50 dark:hover:bg-white/5 transition-colors rounded-md"
                    aria-expanded={isOpen}
                >
                    <span className="flex items-center gap-3">
                        <QuestionMarkIcon className="w-6 h-6 text-secondary" />
                        {item.question}
                    </span>
                    <motion.svg
                        animate={{ rotate: isOpen ? -180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 transform min-w-[24px]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </motion.svg>
                </button>
            </motion.h3>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <p className="p-5 pt-0 pr-11 text-primary-light dark:text-accent/80 leading-relaxed">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};


const FAQ: React.FC = () => {
    const { t, T, isLoaded } = useTranslations();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqData = T('faq.questions');

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    if (!isLoaded) return <section className="py-12 sm:py-20" />;

  return (
    <section id="faq" className="py-12 sm:py-20 bg-accent dark:bg-dark-surface">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-primary-dark dark:text-white mb-12">
            {t('faq.title')}
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto bg-white/50 dark:bg-dark-card/50 rounded-2xl shadow-lg p-2 sm:p-4 dark:border dark:border-white/10">
          {faqData.map((item, index) => (
            <AccordionItem 
                key={index} 
                item={item} 
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
