
import React from 'react';
import { SunIcon, MoonIcon } from './icons';

interface AccessibilityControlsProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

const AccessibilityControls: React.FC<AccessibilityControlsProps> = ({
  isDarkMode,
  setIsDarkMode,
}) => {
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="fixed top-4 left-4 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 rounded-lg shadow-lg flex items-center gap-2 border border-secondary2 dark:border-gray-700">
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-md hover:bg-secondary2 dark:hover:bg-gray-700 transition-colors text-primary dark:text-secondary2"
        aria-label={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
        title={isDarkMode ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع الداكن'}
      >
        {isDarkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  );
};

export default AccessibilityControls;