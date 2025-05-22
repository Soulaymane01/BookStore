import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { manahij } from '../data/books';
import { BookOpenIcon, ChevronRightIcon, ChevronLeftIcon, GraduationCapIcon, LayersIcon, SparklesIcon, StarIcon } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import AboutUs from '../components/AboutUs';

const HomePage: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { t, language, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacityHero = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.4], [0, 100]);
  const scaleHero = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);
  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Parallax effect for background elements
  const parallaxY1 = useTransform(springScrollY, [0, 1], [0, 300]);
  const parallaxY2 = useTransform(springScrollY, [0, 1], [0, 200]);
  const parallaxY3 = useTransform(springScrollY, [0, 1], [0, 100]);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Automatic category cycling
    const intervalId = setInterval(() => {
      if (!isHovering) {
        setActiveCategory(prev => (prev + 1) % manahij.length);
      }
    }, 5000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, [isHovering]);

  const animatedGradientStyle = {
    backgroundSize: '400% 400%',
    backgroundImage: 'linear-gradient(-45deg, #e22a32 0%, #f43f5e 25%, #c41d25 50%, #f43f5e 75%, #e22a32 100%)',
    animation: 'gradient 15s ease infinite',
  };
  
  return (
    <div className="relative overflow-x-hidden">
      {/* Custom animation keyframes */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(226, 42, 50, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(226, 42, 50, 0); }
          100% { box-shadow: 0 0 0 0 rgba(226, 42, 50, 0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        .pulse {
          animation: pulse 2s infinite;
        }
        .spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .card-shadow {
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.3);
        }
        .text-shadow {
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Hero Section with enhanced visuals */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center py-8 overflow-hidden"
      >
        {/* Parallax Background with layers for depth */}
        <div className="absolute inset-0">
          <motion.div 
            style={{ y: parallaxY1 }}
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80')] bg-cover bg-center"
          />
          <motion.div 
            style={{ y: parallaxY2 }}
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"
          />
          
          {/* Dynamic particles with glow effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-sm"
                style={{
                  width: Math.random() * 6 + 2 + 'px',
                  height: Math.random() * 6 + 2 + 'px',
                  background: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.random() * 0.5 + 0.2})`,
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.${Math.floor(Math.random() * 8 + 2)})`
                }}
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
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, Math.random() * 1.5 + 0.5, 1]
                }}
                transition={{ 
                  duration: 15 + Math.random() * 20, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              />
            ))}
          </div>
        </div>
      
        {/* Enhanced curved shapes with animated gradients */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top curved shape with animated gradient */}
          <div className="absolute top-[-6rem] sm:-top-24 right-0 w-full overflow-visible z-10">
            <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
              <defs>
                <linearGradient id="topGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e">
                    <animate attributeName="stop-color" values="#f43f5e; #e22a32; #f43f5e" dur="8s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#e22a32">
                    <animate attributeName="stop-color" values="#e22a32; #c41d25; #e22a32" dur="8s" repeatCount="indefinite" />
                  </stop>
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
          
          {/* Bottom curved shapes with enhanced styling and animation */}
          <div className="absolute bottom-0 left-0 w-full overflow-visible z-10">
            <svg viewBox="0 0 1440 320" className="w-full h-auto" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bottomGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e22a32">
                    <animate attributeName="stop-color" values="#e22a32; #f43f5e; #e22a32" dur="10s" repeatCount="indefinite" />
                  </stop>
                  <stop offset="100%" stopColor="#f43f5e">
                    <animate attributeName="stop-color" values="#f43f5e; #e22a32; #f43f5e" dur="10s" repeatCount="indefinite" />
                  </stop>
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
            <svg viewBox="0 0 1440 200" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none">
              <defs>
                <linearGradient id="bottomGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#e22a32" />
                  <stop offset="100%" stopColor="#c41d25" />
                </linearGradient>
              </defs>
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
        
        {/* Hero Content with enhanced styling and animations */}
        <motion.div 
          style={{ opacity: opacityHero, y: yHero, scale: scaleHero }}
          className="container mx-auto px-4 md:px-6 relative z-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center space-y-12 text-center"
          >
            {/* Enhanced Logo area with floating animation and glow */}
            <motion.div 
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="w-48 h-48 mb-8 relative floating"
            >
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <div className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-[#e22a32] to-[#f43f5e] opacity-60 pulse"></div>
                <div className="absolute w-full h-full rounded-full border-2 border-white/20 spin-slow"></div>
                <div className="absolute w-56 h-56 rounded-full border border-white/10 spin-slow" style={{ animationDirection: 'reverse' }}></div>
              </div>
              <img src='/logo.png' className='absolute z-20 w-40 h-40 right-5 top-5' alt="Logo" />
              <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md"></div>
            </motion.div>
            
            {/* Enhanced Text content with glass effect and improved animations */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 max-w-3xl glass-effect p-10 rounded-3xl border border-white/20 shadow-2xl"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white rtl:font-arabic text-shadow"
                style={animatedGradientStyle}
              >
                {t('bookCatalog')}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mx-auto max-w-[700px] text-white/90 md:text-xl rtl:font-arabic text-shadow leading-relaxed"
              >
                {t('description')}
              </motion.p>
              
              {/* Arabic subtitle with elegant styling */}
              <div className="space-y-3">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="font-arabic text-white text-2xl md:text-3xl font-semibold text-shadow"
                >
                  {t('description_2')}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="font-arabic text-white/90 text-xl md:text-2xl text-shadow"
                >
                  {t('description_3')}
                </motion.p>
              </div>
            </motion.div>
            
            {/* Enhanced Button with animation and effects */}
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
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-medium shadow-xl hover:bg-opacity-95 transition-all duration-300 group relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#e22a32] to-[#f43f5e] opacity-90"></span>
                <span className="absolute -inset-px bg-white rounded-full transform scale-[0.98] group-hover:scale-[0.96] transition-transform duration-300"></span>
                <span className="relative flex items-center z-10 text-[#e22a32] font-semibold">
                  <BookOpenIcon className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  {t('browseBooks')}
                  <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">→</span>
                </span>
              </Link>
            </motion.div>

            {/* Decorative elements for visual interest */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-[#e22a32]/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-gradient-to-l from-[#f43f5e]/20 to-transparent rounded-full blur-3xl"></div>
          </motion.div>
        </motion.div>

      </section>

      {/* Enhanced Association Section */}
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
          <div className="inline-block mb-6">
            <div className="h-1 w-24 bg-gradient-to-r from-[#e22a32] to-[#f43f5e] mx-auto"></div>
            <h2 className="text-4xl font-bold mt-6 mb-2 bg-gradient-to-r from-[#e22a32] to-[#f43f5e] bg-clip-text text-transparent">
              {t('associationsOfferTitle') || 'Special Offer for Associations & Organizations'}
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#f43f5e] to-[#e22a32] mx-auto"></div>
          </div>
          
          <p className="text-gray-700 text-lg mb-12">
            {t('associationsOfferText') || 'Associations and organizations can benefit from a dedicated offer tailored to their needs. Just reach out to us to learn more!'}
          </p>
          
          <div className="flex justify-center gap-16 mb-12 flex-wrap">
            <motion.div 
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#e22a32] to-[#f43f5e] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg transform group-hover:rotate-6 transition-all duration-300">
                <LayersIcon className="w-8 h-8" />
              </div>
              <span className="text-base text-gray-800 font-medium">{t('customSolutions') || 'Custom Solutions'}</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#e22a32] to-[#f43f5e] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg transform group-hover:rotate-6 transition-all duration-300">
                <GraduationCapIcon className="w-8 h-8" />
              </div>
              <span className="text-base text-gray-800 font-medium">{t('educationalSupport') || 'Educational Support'}</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#e22a32] to-[#f43f5e] rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg transform group-hover:rotate-6 transition-all duration-300">
                <BookOpenIcon className="w-8 h-8" />
              </div>
              <span className="text-base text-gray-800 font-medium">{t('resourceAccess') || 'Access to Resources'}</span>
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link to="/contact" className="inline-block relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#e22a32] to-[#f43f5e] rounded-full"></span>
              <span className="relative block bg-white text-[#e22a32] font-bold px-8 py-4 rounded-full m-0.5 group-hover:m-1 transition-all duration-300">
                {t('contactUsNow') || 'Contact Us Now'} →
              </span>
            </Link>
          </motion.div>
        </motion.div>
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

  {/* About Us Section - Added the AboutUs component */}
  <AboutUs isHomePage={true} />

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