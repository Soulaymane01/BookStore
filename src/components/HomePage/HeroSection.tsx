import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpenIcon, SparklesIcon } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { t, dir } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  const springY = useSpring(y1, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={heroRef}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#0f172a]"
    >
      {/* Cinematic Background */}
      <motion.div 
        style={{ y: springY, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0f172a] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 z-10" />
        <img 
          src="/hero-premium.png" 
          className="w-full h-full object-cover object-center"
          alt="Premium Library"
        />
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              opacity: [0.1, 0.5, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 pt-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white md:text-sm text-xs mb-6 px-10">
              <SparklesIcon className="w-4 h-4 text-amber-400" />
              <span className="uppercase tracking-widest font-medium">{t('welcomeTo')} دار الادريسي</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-[1.1] max-w-5xl">
              <span className="block text-gradient animate-gradient">{t('bookCatalog')}</span>
              <span className="block mt-2 italic font-light opacity-90">{t('elevatingKnowledge')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
              {t('description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-6 items-center"
          >
            <Link
              to="/catalog"
              className="group relative px-12 py-5 rounded-full bg-white text-gray-900 font-bold overflow-hidden transition-all hover:pr-14"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
                <BookOpenIcon className="w-5 h-5" />
                {t('browseBooks')}
              </span>
            </Link>
            
            <Link
              to="/about-us"
              className="px-12 py-5 rounded-full border border-white/30 text-white font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              {t('aboutUs')}
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Elegant Bottom Curve */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0f172a] to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20 fill-[#0f172a]">
              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-1.42,1200,41.27V0Z"></path>
          </svg>
      </div>
    </section>
  );
};

export default HeroSection;