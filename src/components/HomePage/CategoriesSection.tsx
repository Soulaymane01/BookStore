import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { manahij } from '../../data/books';
import { ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoriesSection: React.FC = () => {
  const { t, language, dir } = useLanguage();

  return (
    <section id="categories" className="py-32 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50 -ml-48 -mb-48" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-red-600 font-bold mb-4">
              {t('curatedCollections')}
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              {t('categoriesTitle')}
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-500 text-lg max-w-sm mb-0">
              {t('categoriesDescriptionLong')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {manahij.map((manhaj, index) => (
            <motion.div
              key={manhaj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <Link
                to={`/catalog/${manhaj.id}`}
                className="group block relative h-[500px] rounded-[2.5rem] overflow-hidden bg-gray-100 shadow-2xl transition-all duration-700 hover:shadow-red-900/10"
              >
                {/* Background Image with Hover Scaling */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                   <img
                    src={manhaj.image_url}
                    alt={manhaj.id}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end text-white">
                  <motion.div 
                    initial={false}
                    animate={{ y: 0 }}
                    className="transform transition-transform duration-500 group-hover:-translate-y-4"
                  >
                    <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs uppercase tracking-widest mb-6 px-10">
                      {(manhaj.translations as any)[language]?.type || 'Curriculum'}
                    </span>
                    <h4 className="text-4xl md:text-5xl font-bold mb-6">
                      {(manhaj.translations as any)[language]?.name}
                    </h4>
                    <p className="text-white/70 max-w-sm line-clamp-2 md:text-lg mb-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {(manhaj.translations as any)[language]?.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transition-all duration-500 group-hover:w-32 group-hover:rounded-2xl overflow-hidden">
                            <span className="absolute whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-200 font-bold uppercase tracking-widest text-xs ml-[-1rem]">
                                {t('explore')}
                            </span>
                            <ArrowRightIcon className={`w-5 h-5 transition-all duration-500 ${dir === 'rtl' ? 'rotate-180' : ''} group-hover:ml-12`} />
                        </div>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;