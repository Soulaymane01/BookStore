import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { GiftIcon } from 'lucide-react';

const AssociationSection: React.FC = () => {
  const { t } = useLanguage();
  return (
    <section className="relative py-32 overflow-hidden bg-gray-50/50">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="relative max-w-6xl mx-auto"
        >
          {/* Card Wrapper with Glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-red-600/20 to-amber-600/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative glass-effect rounded-[3rem] border border-white/40 p-8 md:p-16 shadow-2xl overflow-hidden min-h-[600px] flex flex-col md:flex-row items-center gap-12">
            
            {/* Left Content */}
            <div className="flex-1 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-600 text-sm font-bold mb-8 uppercase tracking-widest">
                <GiftIcon className="w-4 h-4" />
                {t('exclusiveOffer')}
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                {t('associationsOfferTitle')}
              </h2>
              <p className="text-gray-500 text-xl leading-relaxed mb-10 max-w-xl">
                 {t('associationsOfferTextLong')}
              </p>
              
              <div className="flex flex-wrap gap-4">
                 <a 
                   href="https://wa.me/34632694983" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="px-10 py-5 rounded-2xl bg-gray-900 text-white font-bold hover:bg-red-600 transition-all premium-shadow flex items-center gap-3"
                 >
                   {t('contactUsNow')}
                   <ArrowRightIcon className="w-5 h-5" />
                 </a>
              </div>
            </div>

            {/* Right Image/Poster */}
            <div className="flex-1 relative group">
              <motion.div
                whileHover={{ rotateY: 10, rotateX: -5 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
              >
                <img
                  src="/Deals.jpeg"
                  alt="Special Deals"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              {/* Floating accents */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-red-600 rounded-full blur-2xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-amber-600 rounded-full blur-2xl opacity-20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Internal ArrowIcon because lucide import was missing in previous thought's check
const ArrowRightIcon = ({ className }: { className?: string }) => {
    const { dir } = useLanguage();
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={`${className} ${dir === 'rtl' ? 'rotate-180' : ''}`}
        >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
    )
}

export default AssociationSection;