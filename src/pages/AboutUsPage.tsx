import React from 'react';
import { motion } from 'framer-motion';
import AboutUs from '../components/HomePage/AboutUs';
import { useLanguage } from '../contexts/LanguageContext';
import BreadcrumbNav from '../components/BreadcrumbNav';

const AboutUsPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white">
      {/* Cinematic Hero Header */}
      <section className="relative pt-40 pb-24 bg-[#0f172a] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 via-transparent to-transparent opacity-50" />
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
            <BreadcrumbNav light />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase">
                 {t('aboutUs')}
              </h1>
              
              <div className="max-w-3xl mx-auto space-y-6">
                 <div className="h-1.5 w-20 bg-red-600 mx-auto rounded-full" />
                 <p className="text-white/60 text-xl font-light leading-relaxed italic">
                    {t('aboutUsHeroText')}
                 </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16"
              >
                <div className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.5em] text-red-500">
                    <div className="w-12 h-px bg-red-600/30" />
                    <span>{t('scrollDown')}</span>
                    <div className="w-12 h-px bg-red-600/30" />
                </div>
              </motion.div>
            </motion.div>
        </div>
      </section>

      {/* Main Content Component */}
      <div className="relative z-10 -mt-10">
        <AboutUs isHomePage={false} />
      </div>
    </div>
  );
};

export default AboutUsPage;