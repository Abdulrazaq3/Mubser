import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslations } from '../hooks/useTranslations';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onNavigate,
  currentPage,
  isDarkMode, 
  setIsDarkMode 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const { t, isLoaded } = useTranslations();

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  
  const handleLinkClick = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { page: 'home', key: 'home' },
    { page: 'sign-to-text', key: 'signToText' },
    { page: 'text-to-sign', key: 'textToSign' },
    { page: 'faq', key: 'faq' }
  ];

  const NavLink: React.FC<{ page: string, label: string, isMobile?: boolean }> = ({ page, label, isMobile = false }) => {
    const isActive = currentPage === page;
    const desktopClasses = `relative text-lg transition-colors px-3 py-1 rounded-md ${isActive ? 'text-secondary font-semibold' : 'text-accent-light hover:text-secondary'}`;
    const mobileClasses = `text-3xl font-bold transition-colors ${isActive ? 'text-secondary' : 'text-accent-light hover:text-secondary'}`;

    return (
      <a 
        href={`#${page}`} 
        onClick={(e) => { e.preventDefault(); handleLinkClick(page); }} 
        className={isMobile ? mobileClasses : desktopClasses}
        aria-current={isActive ? 'page' : undefined}
      >
        {label}
        {isActive && !isMobile && (
            <motion.span 
                layoutId="active-pill" 
                className="absolute inset-0 bg-white/10 rounded-md -z-10"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
        )}
      </a>
    );
  };

  if (!isLoaded) return <header className="bg-primary h-24" />;

  return (
    <>
      <header className="bg-primary text-accent-light shadow-md sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center px-4 h-24">
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }} 
            className="flex items-center gap-3 transition-transform duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-lg p-1 -m-1"
            aria-label={t('header.homeAria')}
          >
            <img src="https://i.postimg.cc/SsZ3p19W/logo-bsr.png" alt={t('header.logoAlt')} className="h-20 object-contain" />
          </a>
          
          <nav className="hidden md:flex items-center gap-4">
            {navLinks.map(link => <NavLink key={link.page} page={link.page} label={t(`header.nav.${link.key}`)} />)}
          </nav>
          
          <div className="flex items-center gap-2">
             <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label={isDarkMode ? t('header.lightModeAria') : t('header.darkModeAria')}
              title={isDarkMode ? t('header.lightModeAria') : t('header.darkModeAria')}
            >
              {isDarkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            
             <button
              onClick={toggleLanguage}
              className="p-2 w-[50px] text-center rounded-full hover:bg-white/10 transition-colors font-bold"
              aria-label={t('header.toggleLanguageAria')}
              title={t('header.toggleLanguageAria')}
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden"
              aria-label={t('header.openMenuAria')}
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-primary-dark/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-5 p-2 text-accent-light"
              aria-label={t('header.closeMenuAria')}
            >
              <CloseIcon className="w-8 h-8" />
            </button>
            <motion.nav 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="flex flex-col items-center gap-8"
              onClick={(e) => e.stopPropagation()}
            >
               {navLinks.map(link => <NavLink key={link.page} page={link.page} label={t(`header.nav.${link.key}`)} isMobile />)}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;