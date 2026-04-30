import React, { useState, useRef, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  message?: string;
}

interface ContactOption {
  country: string;
  phoneNumber: string;
  label: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  message = "Hello! I have a question about your books.",
}) => {
  const { t, dir } = useLanguage();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);
  
  const contactOptions: ContactOption[] = [
    {
      country: "Spain",
      phoneNumber: "34632694983",
      label: "Spain (+34 632 69 49 83)"
    },
    {
      country: "Italy",
      phoneNumber: "393509740945",
      label: "Italy (+39 350 974 0945)"
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    if (showOptions) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOptions]);

  const handleContact = (phoneNumber: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    setShowOptions(false);
  };

  return (
    <div className={`fixed bottom-8 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-50`} ref={optionsRef}>
      <AnimatePresence>
        {showOptions && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`absolute bottom-20 ${dir === 'rtl' ? 'left-0' : 'right-0'} glass-effect border border-white/40 rounded-[2rem] shadow-2xl w-64 overflow-hidden mb-2`}
          >
            <div className="p-6 bg-green-500/10 text-green-700 text-xs font-bold uppercase tracking-widest border-b border-white/40">
              {t('chooseContact')}
            </div>
            <div className="py-2">
              {contactOptions.map((option) => (
                <button
                  key={option.country}
                  onClick={() => handleContact(option.phoneNumber)}
                  className="w-full text-left px-6 py-4 hover:bg-white/40 flex items-center transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3 flex-shrink-0">
                    <FaWhatsapp className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">{option.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowOptions(!showOptions)}
        className="flex items-center justify-center bg-green-500 text-white w-16 h-16 rounded-full shadow-2xl hover:bg-green-600 transition-all premium-shadow relative group"
      >
        <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20 pointer-events-none" />
        <FaWhatsapp className="text-2xl" />
        
        <span className={`absolute ${dir === 'rtl' ? 'left-full ml-4' : 'right-full mr-4'} top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all pointer-events-none`}>
          {t('chatWithUs')}
        </span>
      </motion.button>
    </div>
  );
};

export default WhatsAppButton;