import React, { createContext, useContext, useState } from 'react';

type LanguageContextType = {
  language: 'en' | 'ru';
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Устанавливаем русский язык по умолчанию
  const [language, setLanguage] = useState<'en' | 'ru'>('ru');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ru' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage должен использоваться внутри LanguageProvider');
  }
  return context;
};