import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { manahij } from '../data/books';
import { BookOpenIcon, ChevronRightIcon, ChevronLeftIcon, GraduationCapIcon, LayersIcon, SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const { t, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;
  
  return (
    <div>
      {/* Enhanced Hero Section with Dynamic Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80')] bg-cover bg-center opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#e22a32]/80 via-[#e22a32]/70 to-[#e22a32]/90" />
        </div>
       
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-8 text-center"
          >
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                {t('bookCatalog')}
              </h1>
              <p className="mx-auto max-w-[700px] text-red-50 md:text-xl">
                {t('description')}
              </p>
            </div>
            <div className="pt-4">
              <Link
                to="/catalog"
                className="inline-flex items-center justify-center rounded-full bg-white text-[#e22a32] px-8 py-3 text-lg font-medium shadow-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105"
              >
                <BookOpenIcon className="w-5 h-5 mr-2" />
                {t('browseBooks')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Categories Grid */}
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
                    alt={manhaj.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
              </div>

              {/* Text Section - Below Image */}
              <div className="p-6">
                <h3 className="text-3xl font-bold mb-4">
                  {manhaj.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {manhaj.description}
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

      {/* Enhanced Features Section */}
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
    </div>
  );
};

export default HomePage;