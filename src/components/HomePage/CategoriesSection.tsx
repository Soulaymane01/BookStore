import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { manahij } from '../../data/books';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoriesSection: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <section id="categories" className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#e22a32]/80 via-[#e22a32]/70 to-[#e22a32]/90 bg-clip-text text-transparent">
          {t('categories')}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          {t('categoriesDescription')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {manahij.map((manhaj, index) => (
          <motion.div
            key={manhaj.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="h-[400px]" // ADD THIS: Fixed height of 400px (adjust as needed)
          >
            <Link
              to={`/catalog/${manhaj.id}`}
              className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
            >
              {/* Image Section */}
              <div className="w-full">
                <div className="h-64 overflow-hidden">
                  <img
                    src={manhaj.image_url}
                    alt={(manhaj.translations as Record<string, any>)[language]?.name || t('translationMissing')}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Text Section - Below Image */}
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-4">
                  {(manhaj.translations as Record<string, any>)[language]?.name || t('translationMissing')}
                </h3>
                <p className="text-gray-600 mb-6">
                  {(manhaj.translations as Record<string, any>)[language]?.description || t('descriptionMissing')}
                </p>
                <div className="flex items-center">
                  <span className="font-medium text-blue-900">{t('exploreMore')}</span>
                  <ChevronIcon className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;