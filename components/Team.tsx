import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslations } from '../hooks/useTranslations';
import { LinkedInIcon, CloseIcon } from './icons';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  linkedin: string;
  avatar?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Team: React.FC = () => {
  const { t, T, isLoaded } = useTranslations();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const teamMembers = T('team.members');

  const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name.substring(0, 2);
  };
  
  const formatBio = (bio: string) => {
      return bio.split('. ').map((sentence, index, arr) => (
          <p key={index} className="mb-4">
              {sentence}{index < arr.length - 1 ? '.' : ''}
          </p>
      ));
  };

  if (!isLoaded) return <section className="py-12 sm:py-20" />;

  return (
    <section id="team" className="py-12 sm:py-20 bg-white dark:bg-dark-background">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-center text-primary-dark dark:text-white mb-16"
        >
          {t('team.title')}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member: TeamMember, index: number) => (
            <motion.div
              key={member.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => setSelectedMember(member)}
              className="bg-accent/50 dark:bg-dark-card p-6 rounded-3xl shadow-lg text-center dark:border dark:border-white/10 flex flex-col items-center cursor-pointer group"
            >
              <div className="relative w-28 h-28 mb-4">
                <div className="w-full h-full rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center border-4 border-white dark:border-dark-background overflow-hidden">
                    {member.avatar ? (
                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    ) : (
                    <span className="text-3xl font-bold text-primary-dark dark:text-white">{getInitials(member.name)}</span>
                    )}
                </div>
                <a 
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${member.name}'s LinkedIn Profile`}
                    className="absolute inset-0 bg-primary-dark/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                    <LinkedInIcon className="w-8 h-8 text-white" />
                </a>
              </div>

              <h3 className="text-xl font-bold text-primary-dark dark:text-white">{member.name}</h3>
              <p className="text-primary-light dark:text-accent/80 mb-4">{member.title}</p>
              <span className="mt-auto text-sm font-semibold text-secondary dark:text-secondary-light opacity-70 group-hover:opacity-100 transition-opacity">{t('team.viewDetails')}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-dark-surface w-full max-w-2xl rounded-3xl shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-primary-light dark:text-accent/70 hover:text-primary-dark dark:hover:text-white transition-colors p-2 rounded-full"
                aria-label={t('header.closeMenuAria')}
              >
                <CloseIcon className="w-6 h-6" />
              </button>

              <div className="p-8 text-center border-b border-primary/10 dark:border-white/10">
                <div className="w-24 h-24 rounded-full mb-4 bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center border-4 border-white dark:border-dark-surface mx-auto overflow-hidden">
                   {selectedMember.avatar ? (
                      <img src={selectedMember.avatar} alt={selectedMember.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-primary-dark dark:text-white">{getInitials(selectedMember.name)}</span>
                   )}
                </div>
                <h3 className="text-3xl font-bold text-primary-dark dark:text-white">{selectedMember.name}</h3>
                <p className="text-primary-light dark:text-accent/80 text-lg">{selectedMember.title}</p>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
                <div className="text-primary-light dark:text-accent/80 text-left leading-relaxed text-sm sm:text-base">
                   {formatBio(selectedMember.bio)}
                </div>
              </div>

              <div className="p-6 border-t border-primary/10 dark:border-white/10">
                 <a
                    href={selectedMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-secondary text-primary-dark font-bold py-3 px-6 rounded-xl shadow-md hover:bg-secondary-light transition-colors"
                  >
                    <LinkedInIcon className="w-6 h-6" />
                    <span>LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Team;
