import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../i18n/translations';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Get current language name
  const currentLangName = languages.find(lang => lang.code === language)?.name || language;

  // Handle language change
  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <button 
        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label={t('languageSelector')}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={18} className="text-gray-600" />
        <span>{currentLangName}</span>
      </button>
      
      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 max-h-64 overflow-y-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-60"
          role="menu" 
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full text-left px-4 py-2 text-sm ${
                  language === lang.code
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                role="menuitem"
                aria-current={language === lang.code ? "true" : "false"}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;