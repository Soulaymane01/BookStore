import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from '../components/AboutUs';
import { useLanguage } from '../contexts/LanguageContext';

const AboutUsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section for About Us Page */}
      <section className="relative py-24 md:py-36 bg-gradient-to-r from-[#c62828] via-[#e22a32] to-[#f43f5e] overflow-hidden">
        {/* Background wave pattern with enhanced animation */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.svg 
            initial={{ y: 20, opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-0 w-full text-gray-50" 
            viewBox="0 0 1440 320" 
            preserveAspectRatio="none"
          >
            <path
              fill="currentColor"
              d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </motion.svg>
        </div>
        
        {/* Enhanced Decorative Elements with Animation */}
        <div className="absolute top-0 left-0 w-full h-full">
          <motion.div 
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-10 right-10 bg-gradient-to-br from-[#ff8a80] to-[#ff1744] rounded-full w-32 h-32"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
            className="absolute bottom-40 left-10 bg-gradient-to-tr from-[#ff867c] to-[#ff5252] rounded-full w-56 h-56"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.08 }}
            transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
            className="absolute top-40 left-1/4 bg-gradient-to-bl from-[#ff8a65] to-[#ff3d00] rounded-full w-40 h-40"
          ></motion.div>
        </div>
        
        {/* Content with enhanced animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-block mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg bg-red-600/30 px-6 py-3 rounded-xl backdrop-blur-sm border border-red-400/20 shadow-lg">
              {t('aboutUs')}
            </h1>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-32 h-1 bg-gradient-to-r from-[#ffcdd2] to-[#ff8a80] mx-auto mb-10 rounded-full shadow-sm"
          ></motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-xl"
          >
            <div className="px-8 py-6 bg-gradient-to-br from-[#e53935]/90 via-[#d32f2f]/90 to-[#c62828]/90 backdrop-blur-sm border border-red-400/20">
              <p className="text-white text-lg md:text-xl font-light leading-relaxed">
                {t('aboutUsHeroText')}
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8"
          >
            <a 
              href="#learn-more" 
              className="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {t('learnMore')} 
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Main About Us Content */}
      <div id="learn-more">
        <AboutUs isHomePage={false} />
      </div>
    </div>
  );
};

export default AboutUsPage;