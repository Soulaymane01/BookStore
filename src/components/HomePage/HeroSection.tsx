import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { BookOpenIcon } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const HeroSection: React.FC = () => {
  const { t, language, dir } = useLanguage();
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

  const animatedGradientStyle = {
    backgroundSize: '400% 400%',
    backgroundImage: 'linear-gradient(-45deg, #e22a32 0%, #f43f5e 25%, #c41d25 50%, #f43f5e 75%, #e22a32 100%)',
    animation: 'gradient 15s ease infinite',
  };

  return (
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
  );
};

export default HeroSection;