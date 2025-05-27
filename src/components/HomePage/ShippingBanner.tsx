// src/components/ShippingBanner.tsx
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TruckIcon } from 'lucide-react';

const ShippingBanner: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-green-100 border-b border-green-200 text-green-700 py-2 text-center text-sm font-medium flex items-center justify-center">
      <TruckIcon className="inline-block w-4 h-4 mr-1 align-text-bottom" />
      <span>{t('shippingInfo')}</span>
    </div>
  );
};

export default ShippingBanner;