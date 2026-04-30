import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Book } from '../data/books';
import { ShoppingCartIcon, ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { t, language, dir } = useLanguage();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100/50 shadow-sm hover:shadow-2xl transition-all duration-500 relative"
    >
      {/* Perspective Image Container */}
      <div className="relative h-[320px] overflow-hidden bg-[#f8fafc] flex items-center justify-center p-8">
        <Link to={`/book/${book.slug}`} className="relative z-10 w-full h-full perspective-1000">
          <motion.img
            src={book.image_urls[0] || '/placeholder-book.png'}
            alt={book.title}
            className="w-full h-full object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2"
          />
        </Link>
        
        {/* Glow Effect on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 group-hover:from-red-500/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-700" />
      </div>

      {/* Content Area */}
      <div className="p-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
            {book.mostawa || 'General'}
          </span>
        </div>
        
        <Link to={`/book/${book.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem] group-hover:text-red-600 transition-colors">
            {/* Localized Title Logic */}
            {(book as any)[`title_${language}`] || (language === 'ar' ? book.title : ((book as any).title_en || book.title))}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 uppercase tracking-wider">{t('price')}</span>
            <span className="text-2xl font-black text-gray-900">
               {book.price}€
            </span>
          </div>
          
          <Link 
            to={`/book/${book.slug}`}
            className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-red-600"
          >
            <ArrowRightIcon className={`w-5 h-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
      
      {/* Quick Action Overlay */}
      <div className="absolute top-4 right-4 z-20">
         {/* Could add a wishlist feature icon here */}
      </div>
    </motion.div>
  );
};

export default BookCard;