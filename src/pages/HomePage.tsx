import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { manahij } from '../data/books';
import { BookOpenIcon, ChevronRightIcon, ChevronLeftIcon, GraduationCapIcon, LayersIcon, SearchIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const { t, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div>
    <section className="relative min-h-screen flex items-center justify-center py-8 overflow-hidden">
      {/* Parallax Background Image with enhanced treatment */}
      <div className="absolute inset-0">
        <motion.div 
          style={{ y: scrollY * 0.2 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" /> {/* Enhanced gradient overlay */}
      </div>
      
      {/* Animated particles for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%", 
              opacity: Math.random() * 0.5 + 0.2 
            }}
            animate={{ 
              x: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              y: [
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%", 
                Math.random() * 100 + "%"
              ],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity,
              ease: "linear" 
            }}
          />
        ))}
      </div>
      
      {/* Curved shapes with enhanced visual treatment */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top curved shape with glow and depth */}
        <div className="absolute -top-24 right-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full">
            <defs>
              <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#e22a32" />
              </linearGradient>
              <filter id="glow1">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              fill="url(#topGradient)" 
              d="M0,96L48,128C96,160,192,224,288,229.3C384,235,480,181,576,170.7C672,160,768,192,864,197.3C960,203,1056,181,1152,186.7C1248,192,1344,224,1392,240L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              filter="url(#glow1)"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
        
        {/* Bottom curved shapes with enhanced styling */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 320" className="w-full">
            <defs>
              <linearGradient id="bottomGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e22a32" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <linearGradient id="bottomGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#e22a32" />
                <stop offset="100%" stopColor="#c41d25" />
              </linearGradient>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
              fill="url(#bottomGradient1)" 
              d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,117.3C672,139,768,213,864,234.7C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              className="drop-shadow-lg"
              filter="url(#glow2)"
            />
          </svg>
          <svg viewBox="0 0 1440 200" className="absolute bottom-0 left-0 w-full">
            <motion.path 
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
              fill="url(#bottomGradient2)" 
              d="M0,128L40,117.3C80,107,160,85,240,90.7C320,96,400,128,480,128C560,128,640,96,720,80C800,64,880,64,960,80C1040,96,1120,128,1200,138.7C1280,149,1360,139,1400,133.3L1440,128L1440,200L1400,200C1360,200,1280,200,1200,200C1120,200,1040,200,960,200C880,200,800,200,720,200C640,200,560,200,480,200C400,200,320,200,240,200C160,200,80,200,40,200L0,200Z"
              className="drop-shadow-md"
            />
          </svg>
        </div>
      </div>
      
      {/* Content with enhanced styling and animations */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center space-y-12 text-center"
        >
          {/* Logo area with subtle animation */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-48 h-48 mb-8 relative"
          >
            <img src='/logo.png' className='absolute z-20' />
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
          </motion.div>
          
          {/* Text content with staggered animations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 max-w-3xl backdrop-blur-sm bg-black/10 p-8 rounded-2xl border border-white/10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white rtl:font-arabic drop-shadow-md"
            >
              {t('bookCatalog')}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto max-w-[700px] text-white/90 md:text-xl rtl:font-arabic drop-shadow"
            >
              {t('description')}
            </motion.p>
            
            {/* Arabic subtitle with elegant styling */}
            <div className="space-y-3">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-arabic text-white text-2xl md:text-3xl font-semibold drop-shadow-md"
              >
                مؤسسة التعليم للتوزيع الإدريسي
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="font-arabic text-white/90 text-xl md:text-2xl drop-shadow"
              >
                متخصصون في الكتب الدراسية لأبناء المهجر
              </motion.p>
            </div>
          </motion.div>
          
          {/* Enhanced Button with animation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/catalog"
              className="inline-flex items-center justify-center rounded-full bg-white text-[#e22a32] px-10 py-4 text-lg font-medium shadow-xl hover:bg-gray-50 transition-all duration-300 group"
            >
              <BookOpenIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
              <span className="relative">
                {t('browseBooks')}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e22a32] group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </motion.div>
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