import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const translationsCache: { [key: string]: any } = {};

export const useTranslations = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState(translationsCache[language] || null);

  useEffect(() => {
    const loadTranslations = async () => {
      if (translationsCache[language]) {
        setTranslations(translationsCache[language]);
        return;
      }
      try {
        const response = await fetch(`./locales/${language}.json`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        translationsCache[language] = data;
        setTranslations(data);
      } catch (error) {
        console.error(`Could not load translation file for language: ${language}`, error);
      }
    };

    loadTranslations();
  }, [language]);

  const t = useCallback((key: string): string => {
    if (!translations) return key;
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return key;
    }
    return typeof result === 'string' ? result : key;
  }, [translations]);
  
  const T = useCallback((key: string): any[] => {
    if (!translations) return [];
    const keys = key.split('.');
    let result = translations;
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) return [];
    }
    return Array.isArray(result) ? result : [];
  }, [translations]);


  return { t, T, isLoaded: !!translations };
};
