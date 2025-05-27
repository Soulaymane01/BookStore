import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpenIcon, GraduationCapIcon, LayersIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-900 mb-6 transform rotate-3">
              <BookOpenIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{t('multipleCategories')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('multipleCategoriesDesc')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-900 mb-6 transform -rotate-3">
              <GraduationCapIcon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{t('variousLevels')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('variousLevelsDesc')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-900 mb-6 transform rotate-3">
              <LayersIcon className="w-8 h-8" />
            </div>
                        <h3 className="text-2xl font-semibold mb-4">{t('organizedContent')}</h3>
            <p className="text-gray-600 leading-relaxed">{t('organizedContentDesc')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;