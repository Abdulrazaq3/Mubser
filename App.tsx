
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import SplashScreen from './components/SplashScreen';
import HomePage from './components/pages/HomePage';
import SignToTextPage from './components/pages/SignToTextPage';
import TextToSignPage from './components/pages/TextToSignPage';
import FAQPage from './components/pages/FAQPage';
import { useLanguage } from './contexts/LanguageContext';

const App: React.FC = () => {
  const { language, dir } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getPageFromHash = () => window.location.hash.substring(1) || 'home';
  const [page, setPage] = useState(getPageFromHash());

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = (newPage: string) => {
    if (page === newPage) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    };
    window.location.hash = newPage;
  };

  useEffect(() => {
    const handleHashChange = () => {
      setPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);


  const renderPage = () => {
    switch (page) {
      case 'sign-to-text':
        return <SignToTextPage />;
      case 'text-to-sign':
        return <TextToSignPage />;
      case 'faq':
        return <FAQPage />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <SplashScreen key="splash" />
      ) : (
        <motion.div
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`transition-colors duration-300 min-h-screen flex flex-col`}
        >
          <Header
            onNavigate={handleNavigation}
            currentPage={page}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>
          <Footer />
          <ScrollToTopButton />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
