import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { LayersIcon, GraduationCapIcon, BookOpenIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const AssociationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative py-20 px-6 md:px-16 text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-primary-100"
              style={{
                width: Math.random() * 300 + 50 + 'px',
                height: Math.random() * 300 + 50 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.1,
                transform: `scale(${Math.random() * 0.6 + 0.4})`
              }}
            ></div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto relative z-10"
      >
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center mb-12">
          {/* Text Content */}
          <div>
            <div className="inline-block mb-6">
              <div className="h-1 w-24 bg-gradient-to-r from-[#e22a32] to-[#f43f5e] mx-auto"></div>
              <h2 className="text-4xl font-bold mt-6 mb-2 bg-gradient-to-r from-[#e22a32] to-[#f43f5e] bg-clip-text text-transparent">
                {t('associationsOfferTitle') || 'Special Offer for Associations & Organizations'}
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-[#f43f5e] to-[#e22a32] mx-auto"></div>
            </div>

            <p className="text-gray-700 text-lg">
              {t('associationsOfferText') || 'Associations and organizations can benefit from a dedicated offer tailored to their needs. Just reach out to us to learn more!'}
            </p>
          </div>

          {/* Image Section */}
          <div className="mt-8 md:mt-0 rounded-xl overflow-hidden shadow-xl">
            <img
              src="/Deals.png"  // Update with your image path
              alt="Association Deals offer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      
      
      </motion.div>
    </section>
  );
};

export default AssociationSection;