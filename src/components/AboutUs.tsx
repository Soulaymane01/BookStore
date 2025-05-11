import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

// AboutUs component that can be used independently or embedded in other pages
const AboutUs: React.FC<{ isHomePage?: boolean }> = ({ isHomePage = false }) => {
  const { t, language, dir } = useLanguage();
  
  // Container variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  // Item variants for child animations
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="about-us" 
      className={`${isHomePage ? 'py-16' : 'py-24'} bg-gradient-to-b from-white to-gray-50`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#e22a32]/80 via-[#e22a32]/70 to-[#e22a32]/90 bg-clip-text text-transparent">
              {t('aboutUs')}
            </h2>
            {!isHomePage && (
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                {t('aboutUsSubtitle')}
              </p>
            )}
          </motion.div>
          
          {/* Main About Content */}
          <motion.div
            variants={itemVariants}
            className="mb-16 bg-white rounded-2xl shadow-lg p-8 md:p-10"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              {t('whoWeAre')}
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed rtl:font-arabic" 
              dangerouslySetInnerHTML={{ __html: t('aboutUsDescription') }}
            />
            
            <div className="mt-8 flex justify-end">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-24 h-24 opacity-30" 
              />
            </div>
          </motion.div>
          
          {/* Why Trust Us */}
          <motion.div
            variants={itemVariants}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {t('whyTrustUs')}
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <p className="text-lg text-gray-700 leading-relaxed mb-6 rtl:font-arabic">
                {t('whyTrustUsReason1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed rtl:font-arabic">
                {t('whyTrustUsReason2')}
              </p>
            </div>
          </motion.div>
          
          {/* Our Curricula */}
          <motion.div
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
              {t('ourCurricula')}
            </h3>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <h4 className="text-xl font-semibold mb-4 text-[#e22a32] rtl:font-arabic">
                {t('experienceExcellence')}
              </h4>
              <p className="text-lg text-gray-700 leading-relaxed mb-6 rtl:font-arabic">
                {t('curriculaDetail1')}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed rtl:font-arabic">
                {t('curriculaDetail2')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;