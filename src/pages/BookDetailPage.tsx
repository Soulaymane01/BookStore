import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getBookBySlug, getBooksByManhajFiatMostawa, getManhajById } from '../data/books';
import BreadcrumbNav from '../components/BreadcrumbNav';
import BookCard from '../components/BookCard';
import { TagIcon, BookOpenIcon, ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language, dir } = useLanguage();
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;
  
  const book = slug ? getBookBySlug(slug) : null;
  const manhaj = book ? getManhajById(book.manhaj) : null;
  
  // State for selected image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const relatedBooks = book ? 
    getBooksByManhajFiatMostawa(book.manhaj, book.fiae, book.mostawa)
      .filter(b => b.id !== book.id)
      .slice(0, 4) : 
    [];
  
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl text-gray-700 mb-4">{t('noBooks')}</h1>
          <Link 
            to="/catalog"
            className="inline-block bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            {t('backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  // Use default image if no images available
  const images = book.image_urls && book.image_urls.length > 0 
    ? book.image_urls 
    : ['https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300'];
  
  // Get the translated title based on the current language
  const getLocalizedTitle = () => {
    if (language === 'ar') {
      return book.title;
    } else if (language === 'en') {
      return book.title_en || book.title;
    } else if (language === 'es') {
      return book.title_es || book.title;
    } else if (language === 'pt') {
      return book.title_pt || book.title;
    } else if (language === 'it') {
      return book.title_it || book.title;
    }
    return book.title;
  };

  // Get the translated description based on the current language
  const getLocalizedDescription = () => {
    if (language === 'ar') {
      return book.description;
    } else if (language === 'en') {
      return book.descreption_en || book.description;
    } else if (language === 'es') {
      return book.descreption_es || book.description;
    } else if (language === 'pt') {
      return book.descreption_pt || book.description;
    } else if (language === 'it') {
      return book.descreption_it || book.description;
    }
    return book.description;
  };


  const formatPrice = (price: string | number | null | undefined) => {
    if (price === null || price === undefined) return t('noPrice'); // or return '' if preferred
    // Convert number to string if needed
    const priceStr = typeof price === 'number' ? price.toFixed(2) : price;
    // Extract numeric value from string (preserving comma or dot for decimals)
    const numericValue = priceStr.replace(/[^\d,.]/g, '');
    // Format based on language
    return language === 'ar' ? `${numericValue} €` : `€${numericValue}`;
  };
  
  
  return (
    <div className="container mx-auto px-4 py-8" dir={dir}>
      <BreadcrumbNav />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden mb-10"
      >
        <div className={`md:flex ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div className="md:w-2/5 p-6">
            {/* Main Image */}
            <div className="aspect-w-3 aspect-h-4 rounded-lg overflow-hidden shadow-lg mb-4">
              <motion.img 
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={images[selectedImageIndex]} 
                alt={getLocalizedTitle()}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-blue-600 scale-105' : 'border-gray-200 opacity-70'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${getLocalizedTitle()} - view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="md:w-3/5 p-8">
            <div className="mb-6">
              {manhaj && (
                <Link 
                  to={`/catalog/${manhaj.id}`}
                  className={`inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}
                >
                  <ChevronIcon className={`h-4 w-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                  <span>{(manhaj.translations as Record<string, any>)[language]?.name || t('translationMissing')}</span>
                </Link>
              )}
              <h1 className="text-3xl font-bold mb-4">{getLocalizedTitle()}</h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                {book.manhaj && manhaj && (
                  <span className={`inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <BookOpenIcon className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    {(manhaj.translations as Record<string, any>)[language]?.name || t('translationMissing')}
                  </span>
                )}
                {book.fiae && (
                  <span className={`inline-flex items-center bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded-full ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <TagIcon className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    {book.fiae}
                  </span>
                )}
                {book.mostawa && (
                  <span className={`inline-flex items-center bg-emerald-100 text-emerald-800 text-sm px-3 py-1 rounded-full ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                    <TagIcon className={`w-4 h-4 ${dir === 'rtl' ? 'ml-1' : 'mr-1'}`} />
                    {language === 'ar' ? `المستوى ${book.mostawa.split(' ')[1]}` : book.mostawa}
                  </span>
                )}
              </div>
              
              <div className="prose max-w-none mb-8">
                <h2 className="text-xl font-semibold mb-2">{t('description')}</h2>
                <p className="text-gray-700">
                  {getLocalizedDescription()}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-xl font-semibold mb-2">{t('price')}</h2>
                  <p className="text-3xl font-bold text-blue-900">{formatPrice(book.price)}</p>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {relatedBooks.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">{t('relatedBooks')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedBooks.map((book) => (
              <motion.div
                key={book.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailPage;