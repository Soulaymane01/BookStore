import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../i18n/translations';
import { Globe, CheckIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, t, dir } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/40 shadow-sm hover:bg-white transition-all text-xs font-bold uppercase tracking-widest text-gray-900"
      >
        <Globe size={16} className="text-red-500" />
        <span>{currentLang?.code}</span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute mt-4 w-48 glass-effect border border-white/40 rounded-[2rem] shadow-2xl overflow-hidden z-[70] ${dir === 'rtl' ? 'left-0' : 'right-0'}`}
          >
            <div className="py-4">
              <div className="px-6 py-2 mb-2">
                 <span className="text-[10px] uppercase tracking-widest font-black text-gray-400">{t('selectLanguage')}</span>
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLanguage(lang.code); setIsOpen(false); }}
                  className={`w-full flex items-center justify-between px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    language === lang.code
                      ? 'text-red-600 bg-red-50/50'
                      : 'text-gray-600 hover:bg-white/40'
                  }`}
                >
                  {lang.name}
                  {language === lang.code && <CheckIcon className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;