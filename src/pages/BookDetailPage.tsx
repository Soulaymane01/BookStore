import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getBookBySlug, getBooksByManhajFiatSubfiatMostawa, getManhajById } from '../data/books';
import BreadcrumbNav from '../components/BreadcrumbNav';
import BookCard from '../components/BookCard';
import { ShoppingCartIcon, Share2Icon, ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, language, dir } = useLanguage();
  
  const book = slug ? getBookBySlug(slug) : null;
  const manhaj = book ? getManhajById(book.manhaj) : null;
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const relatedBooks = book ? 
    getBooksByManhajFiatSubfiatMostawa(book.manhaj, book.fiae, book.subfiat || "", book.mostawa)
      .filter(b => b.id !== book.id)
      .slice(0, 4) : 
    [];
  
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white font-english">
         <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{t('noBooks')}</h1>
            <Link to="/catalog" className="px-8 py-3 bg-gray-900 text-white rounded-full font-bold uppercase tracking-widest text-xs">
                {t('backToHome')}
            </Link>
         </div>
      </div>
    );
  }

  const images = book.image_urls && book.image_urls.length > 0 ? book.image_urls : ['/placeholder-book.png'];
  
  const getLocalizedTitle = () => {
    return (book as any)[`title_${language}`] || (language === 'ar' ? book.title : ((book as any).title_en || book.title));
  };

  const getLocalizedDescription = () => {
    return (book as any)[`description_${language}`] || 
           (book as any)[`descreption_${language}`] || 
           (language === 'ar' ? book.description : ((book as any).description_en || (book as any).descreption_en || book.description));
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] opacity-30 -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-50 rounded-full blur-[100px] opacity-30 -ml-40 -mb-40" />
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-40 pb-32 relative z-10">
        <BreadcrumbNav />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 mb-32">
          
          {/* Left: Gallery (Col 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-40">
              <motion.div 
                layoutId={`book-img-${book.id}`}
                className="relative aspect-[3/4] rounded-[2.5rem] bg-[#f8fafc] overflow-hidden flex items-center justify-center p-12 shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedImageIndex}
                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    src={images[selectedImageIndex]} 
                    alt={getLocalizedTitle()}
                    className="w-full h-full object-contain drop-shadow-[0_40px_50px_rgba(0,0,0,0.15)]"
                  />
                </AnimatePresence>
                
                {/* Floating Navigation Controls */}
                {images.length > 1 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-20">
                     <button 
                        onClick={() => setSelectedImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-all"
                     >
                        <ArrowLeftIcon className="w-4 h-4" />
                     </button>
                     <button 
                        onClick={() => setSelectedImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg flex items-center justify-center hover:bg-white transition-all"
                     >
                        <ArrowRightIcon className="w-4 h-4" />
                     </button>
                  </div>
                )}
              </motion.div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-4 mt-8 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImageIndex(i)}
                      className={`relative min-w-[80px] h-[100px] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === i ? 'border-red-600 scale-105 shadow-lg' : 'border-transparent opacity-60'
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="Thumb" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Info (Col 7) */}
          <div className="lg:col-span-7 pt-4">
            <motion.div
               initial={{ opacity: 0, x: 30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-1 rounded-full bg-red-50 text-red-600 text-[10px] uppercase tracking-widest font-bold">
                  {(manhaj?.translations as any)?.[language]?.name}
                </span>
                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                  {book.fiae}
                </span>
                {book.mostawa && (
                  <span className="px-4 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] uppercase tracking-widest font-bold">
                    {book.mostawa}
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-[1.1] tracking-tighter">
                {getLocalizedTitle()}
              </h1>

              <div className="flex items-baseline gap-4 mb-12">
                 <span className="text-5xl font-black text-gray-900">{book.price}€</span>
                 <span className="text-gray-400 text-sm font-bold uppercase tracking-widest italic">{t('incTax')}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-16">
                  <a 
                    href="https://wa.me/34632694983"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-10 py-5 rounded-full bg-gray-900 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-600 transition-all premium-shadow"
                  >
                    <ShoppingCartIcon className="w-5 h-5" />
                    {t('orderViaWhatsApp')}
                  </a>
                  <button className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-all">
                    <Share2Icon className="w-5 h-5 text-gray-600" />
                  </button>
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-0.5 w-12 bg-gray-200" />
                  <h2 className="text-xs uppercase tracking-[0.3em] font-black text-gray-400">{t('overview')}</h2>
                </div>
                <div 
                  className="text-xl text-gray-500 leading-relaxed font-light italic"
                  dangerouslySetInnerHTML={{ __html: getLocalizedDescription() }}
                />
              </div>

              {/* Extra Details Grid */}
              <div className="grid grid-cols-2 gap-8 mt-16 pt-16 border-t border-gray-100">
                 <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2">{t('language')}</h4>
                    <p className="font-bold text-gray-900">{t(`lang-${language}`)}</p>
                 </div>
                 <div>
                    <h4 className="text-[10px] uppercase tracking-widest font-black text-gray-400 mb-2">{t('availability')}</h4>
                    <p className="font-bold text-emerald-600">{t('inStock')}</p>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-32 border-t border-gray-100"
          >
            <div className="flex items-center justify-between mb-16">
              <h2 className="text-4xl font-bold tracking-tighter">{t('relatedBooks')}</h2>
              <Link to="/catalog" className="text-sm font-bold uppercase tracking-widest text-red-600 hover:text-red-700">
                {t('viewAll')}
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {relatedBooks.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;