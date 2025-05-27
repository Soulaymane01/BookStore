// src/components/AboutUs.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';

const AboutUs: React.FC<{ isHomePage?: boolean }> = ({ isHomePage = false }) => {
  const { t, language, dir } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-100 py-20 relative overflow-hidden"> {/* Stronger Background */}
      <div className="absolute inset-0 opacity-20"> {/* Subtle Pattern Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cg fill=%22%23f97316%22 fill-opacity=%220.2%22%3E%3Cpath d=%22M0 0h20v20H0V0zm20 20h20v20H20V20%22/%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <section
        id="about-us"
        className={`${isHomePage ? 'py-16' : 'py-24'} relative z-10`}
      >
        {/* Animated Background (Inner) */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23e22a32%22%20fill-opacity=%220.03%22%3E%3Cpath%20d=%22m36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#e22a32]/10 to-transparent rounded-full blur-xl"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-blue-200/20 to-transparent rounded-full blur-lg"
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-purple-200/15 to-transparent rounded-full blur-md"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-5xl mx-auto"
          >
            {/* Section Title */}
            <motion.div
              variants={itemVariants}
              className="text-center mb-20"
            >
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#e22a32] via-[#ff4757] to-[#e22a32] bg-clip-text text-transparent relative">
                  {t('aboutUs')}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#e22a32] to-[#ff4757] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </h2>
              </motion.div>
              {!isHomePage && (
                <motion.p
                  className="text-gray-600 max-w-3xl mx-auto text-xl leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {t('aboutUsSubtitle')}
                </motion.p>
              )}
            </motion.div>

            {/* Main About Content */}
            <motion.div
              variants={itemVariants}
              className="mb-20"
            >
              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 md:p-12 relative overflow-hidden"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                {/* Card Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#e22a32]/5 to-transparent rounded-full -translate-y-8 translate-x-8"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full translate-y-6 -translate-x-6"></div>

                <div className="relative z-10">
                  <motion.h3
                    className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-4"
                    whileInView={{ x: [20, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    <span className="w-2 h-8 bg-gradient-to-b from-[#e22a32] to-[#ff4757] rounded-full"></span>
                    {t('whoWeAre')}
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <p className="text-xl text-gray-700 leading-relaxed rtl:font-arabic mb-8"
                      dangerouslySetInnerHTML={{ __html: t('aboutUsDescription') }}
                    />
                  </motion.div>

                  <motion.div
                    className="flex justify-end"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#e22a32]/20 to-transparent rounded-2xl blur-lg"></div>
                      <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-28 h-28 opacity-40 relative z-10 rounded-2xl"
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Why Trust Us */}
            <motion.div
              variants={itemVariants}
              className="mb-20"
            >
              <motion.h3
                className="text-3xl font-bold mb-12 text-center text-gray-800 relative"
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                {t('whyTrustUs')}
                <motion.div
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#e22a32] to-[#ff4757] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h3>

              <motion.div
                className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 md:p-12 relative overflow-hidden"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                {/* Card Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 border-2 border-[#e22a32] rounded-full"></div>
                  <div className="absolute bottom-8 right-8 w-6 h-6 bg-[#e22a32]/20 rounded-full"></div>
                  <div className="absolute top-1/2 right-16 w-4 h-4 bg-blue-500/20 rounded-full"></div>
                </div>

                <div className="relative z-10 space-y-8">
                  <motion.p
                    className="text-xl text-gray-700 leading-relaxed rtl:font-arabic relative pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <span className="absolute left-0 top-2 w-2 h-2 bg-[#e22a32] rounded-full"></span>
                    {t('whyTrustUsReason1')}
                  </motion.p>

                  <motion.p
                    className="text-xl text-gray-700 leading-relaxed rtl:font-arabic relative pl-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <span className="absolute left-0 top-2 w-2 h-2 bg-[#ff4757] rounded-full"></span>
                    {t('whyTrustUsReason2')}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>

            {/* Our Curricula */}
            <motion.div
              variants={itemVariants}
            >
              <motion.h3
                className="text-3xl font-bold mb-12 text-center text-gray-800 relative"
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                transition={{ duration: 0.6 }}
              >
                {t('ourCurricula')}
                <motion.div
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#e22a32] to-[#ff4757] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </motion.h3>

              <motion.div
                className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-10 md:p-12 relative overflow-hidden"
                variants={cardHoverVariants}
                initial="rest"
                whileHover="hover"
              >
                {/* Enhanced Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#e22a32] via-[#ff4757] to-[#e22a32] rounded-t-3xl"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-bl from-[#e22a32]/10 to-transparent rounded-full"></div>

                <div className="relative z-10">
                  <motion.h4
                    className="text-2xl font-semibold mb-6 text-[#e22a32] rtl:font-arabic flex items-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.span
                      className="w-3 h-3 bg-[#e22a32] rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    ></motion.span>
                    {t('experienceExcellence')}
                  </motion.h4>

                  <div className="space-y-6">
                    <motion.p
                      className="text-xl text-gray-700 leading-relaxed rtl:font-arabic"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      {t('curriculaDetail1')}
                    </motion.p>

                    <motion.p
                      className="text-xl text-gray-700 leading-relaxed rtl:font-arabic"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      {t('curriculaDetail2')}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;