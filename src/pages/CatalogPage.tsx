import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  getFiatByManhaj,
  getSubfiatsByManhajAndFiat,
  getBooksByManhajFiatSubfiatMostawa,
  getManhajById,
  searchBooks,
  manahij
} from '../data/books';
import CategoryCard from '../components/CategoryCard';
import BookCard from '../components/BookCard';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { motion, AnimatePresence } from 'framer-motion';

const CatalogPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();
  const { manhaj, fiat, subfiat } = useParams<{
    manhaj?: string;
    fiat?: string;
    subfiat?: string;
  }>();

  const searchQuery = searchParams.get('q');

  const getLocalizedName = (manhajId: string) => {
    const m = manahij.find(item => item.id === manhajId);
    return (m?.translations as any)?.[language]?.name || manhajId;
  };

  const getLocalizedCategoryName = (name: string) => {
    const mapping: Record<string, string> = {
      "تعليم اللغة العربية": "cat_arabic_language",
      "الابتدائي": "cat_primary",
      "الاعدادي": "cat_middle_school",
      "محو الامية": "cat_literacy",
      "العربية بين يديك": "cat_arabic_between_hands",
      "العربية بين أيدي أولادنا": "cat_arabic_for_children",
      "الدراسات الإسلامية": "cat_islamic_studies",
      "تعليم الأسلام": "cat_islamic_studies",
      "أدواة التنظيم": "cat_organization",
      "مستويات الحضانة": "cat_kindergarten"
    };

    const key = mapping[name];
    if (key) return t(key as any);
    return name;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // 1. Search Results View
  if (searchQuery) {
    const foundBooks = searchBooks(searchQuery);
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#0f172a] pt-40 pb-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-tr from-red-900/30 to-transparent opacity-40 z-0" />
             <div className="container mx-auto px-4 relative z-10">
                <BreadcrumbNav light />
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <span className="text-red-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">{t('searchResults')}</span>
                  <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter italic">
                    "{searchQuery}"
                  </h1>
                  <p className="text-white/60 text-lg font-light">{foundBooks.length} {t('booksFound')}</p>
                </motion.div>
             </div>
        </div>
        
        <div className="container mx-auto px-4 py-20 mb-32">
          {foundBooks.length > 0 ? (
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {foundBooks.map((book) => (
                <motion.div key={book.id} variants={itemVariants}>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 bg-gray-50 rounded-[3rem] border border-dashed border-gray-200">
               <p className="text-gray-400 text-xl font-light italic">{t('noResultsFound')}</p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // 2. Root Catalog View (Show Manahij)
  if (!manhaj) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#0f172a] pt-40 pb-20 relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
             <div className="container mx-auto px-4 relative z-10">
                <BreadcrumbNav light />
                <motion.h1 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter"
                >
                  {t('manahige')}
                </motion.h1>
                <p className="text-white/60 text-xl font-light max-w-2xl">{t('catalogDescription')}</p>
             </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-10 mb-32 relative z-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {manahij.map((m) => (
              <motion.div key={m.id} variants={itemVariants}>
                <CategoryCard 
                  title={(m.translations as any)[language]?.name || t('translationMissing')}
                  type="manhaj" 
                  url={`/catalog/${m.id}`}
                  description={(m.translations as any)[language]?.description || t('descriptionMissing')} 
                  imageUrl={m.image_url}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  // 3. Filtered View Logic
  const fiatCategories = getFiatByManhaj(manhaj);
  const subfiats = fiat ? getSubfiatsByManhajAndFiat(manhaj, fiat) : [];
  const books = getBooksByManhajFiatSubfiatMostawa(manhaj, fiat || "", subfiat || "");
  const titleText = subfiat ? getLocalizedCategoryName(subfiat) : (fiat ? getLocalizedCategoryName(fiat) : getLocalizedName(manhaj));

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#0f172a] pt-40 pb-20 relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent z-0" />
           <div className="container mx-auto px-4 relative z-10">
              <BreadcrumbNav light />
              <motion.h1 
                key={titleText}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tighter"
              >
                {titleText}
              </motion.h1>
              <div className="flex items-center gap-4 text-white/50 text-sm uppercase tracking-widest font-bold">
                 <span>{books.length} {t('booksFound')}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                 <span>{getLocalizedName(manhaj)}</span>
              </div>
           </div>
      </div>

      <div className="container mx-auto px-4 py-20 mb-32">
        <AnimatePresence mode="wait">
          {(!fiat && fiatCategories.length > 0) || (fiat && !subfiat && subfiats.length > 0) ? (
            <motion.div
              key={fiat ? 'subfiats' : 'fiats'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {(fiat ? subfiats : fiatCategories).map((f) => (
                <motion.div key={f} variants={itemVariants}>
                  <CategoryCard 
                    title={getLocalizedCategoryName(f)} 
                    type={fiat ? "subfiat" : "fiat"} 
                    url={`/catalog/${manhaj}${fiat ? `/${fiat}` : ''}/${f}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="books"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
            >
              {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {books.map((book) => (
                    <motion.div key={book.id} variants={itemVariants}>
                      <BookCard book={book} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-32 glass-effect rounded-[3rem]">
                   <p className="text-gray-400 text-xl font-light italic">{t('noBooks')}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CatalogPage;