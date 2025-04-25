import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  getUniqueManahige, 
  getFiatByManhaj,
  getBooksByManhajFiatMostawa,
  getManhajById,
  manahij
} from '../data/books';
import CategoryCard from '../components/CategoryCard';
import BookCard from '../components/BookCard';
import BreadcrumbNav from '../components/BreadcrumbNav';
import { motion } from 'framer-motion';

const CatalogPage: React.FC = () => {
  const { manhaj, fiat } = useParams<{
    manhaj?: string;
    fiat?: string;
  }>();
  const { t } = useLanguage();
  
    // Display all Manahige (curricula) if no manhaj selected
    if (!manhaj) {
      return (
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
              {t('manahige')}
            </h1>
            
            {/* Using grid with 2 columns for manahij to better display the new card design */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {manahij.map((m, index) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CategoryCard 
                    title={m.name} 
                    type="manhaj" 
                    url={`/catalog/${m.id}`}
                    description={m.description}
                    imageUrl={m.image_url}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      );
    }
  
  // Display books for selected manhaj and fiat
  const currentManhaj = getManhajById(manhaj);
  const books = fiat 
    ? getBooksByManhajFiatMostawa(manhaj, fiat)
    : getBooksByManhajFiatMostawa(manhaj);
  
  // If no fiat selected, show fiat categories
  if (!fiat) {
    const fiatCategories = getFiatByManhaj(manhaj);
    
    // If no fiat categories exist, display books directly
    if (fiatCategories.length === 0) {
      return (
        <div className="container mx-auto px-4 py-8">
          <BreadcrumbNav />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
              {currentManhaj?.name || manhaj}
            </h1>
            <p className="text-gray-600 mb-8 text-lg">{t('books')}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <BreadcrumbNav />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
            {currentManhaj?.name || manhaj}
          </h1>
          <p className="text-gray-600 mb-8 text-lg">{t('fiat')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fiatCategories.map((f, index) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CategoryCard 
                  title={f} 
                  type="fiat" 
                  url={`/catalog/${manhaj}/${f}`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Display books for selected fiat
  return (
    <div className="container mx-auto px-4 py-8">
      <BreadcrumbNav />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
          {fiat}
        </h1>
        <p className="text-gray-600 mb-8 text-lg">{t('books')}</p>
        
        {books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {books.map((book, index) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t('noBooks')}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CatalogPage;