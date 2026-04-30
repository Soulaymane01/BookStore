import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TruckIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const ShippingBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gray-900 overflow-hidden relative py-3">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-20 items-center justify-center text-white/90 text-xs font-bold uppercase tracking-[0.2em]"
      >
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <TruckIcon className="w-4 h-4 text-red-500" />
            <span>{t('shippingInfo')}</span>
            <div className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ShippingBanner;