import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { searchBooks, Book } from '../data/books';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar: React.FC = () => {
  const { t, language, dir } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length >= 2) {
      const searchResults = searchBooks(value);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && query.trim().length >= 2) {
      navigate(`/catalog?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleResultClick = (book: Book) => {
    navigate(`/book/${book.slug || book.id}`);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-sm" ref={searchRef}>
      <div className="relative group">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('searchPlaceholder')}
          className="w-full bg-white/50 backdrop-blur-md border border-white/40 px-12 py-3 rounded-2xl text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:bg-white transition-all shadow-sm"
        />
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        
        {query && (
          <button
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className={`absolute ${dir === 'rtl' ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors`}
          >
            <XIcon className="w-3 h-3 text-gray-400" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className={`absolute top-full mt-4 w-[320px] md:w-[450px] glass-effect border border-white/40 rounded-[2.5rem] shadow-2xl overflow-hidden z-[100] ${dir === 'rtl' ? 'left-0' : 'right-0'}`}
          >
            {results.length > 0 ? (
              <div className="max-h-[70vh] overflow-y-auto no-scrollbar py-6">
                <div className="px-8 pb-4 mb-4 border-b border-gray-100/50">
                  <h3 className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">{t('searchResults')}</h3>
                </div>
                {results.slice(0, 8).map((book) => (
                  <button
                    key={book.id}
                    onClick={() => handleResultClick(book)}
                    className="w-full flex items-center gap-6 px-8 py-4 hover:bg-white/60 transition-all group text-left"
                    dir={dir}
                  >
                    <div className="w-16 h-20 rounded-xl overflow-hidden bg-gray-50 p-2 flex-shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                      <img src={book.image_urls?.[0] || '/placeholder-book.png'} alt="" className="w-full h-full object-contain drop-shadow-sm" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-bold text-gray-900 truncate text-sm group-hover:text-red-600 transition-colors">
                        {(book as any)[`title_${language}`] || (language === 'ar' ? book.title : ((book as any).title_en || book.title))}
                      </h4>
                      <p className="text-xs text-red-600 font-bold">{book.price}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-6 py-8 text-center">
                 <p className="text-sm text-gray-400 italic">{t('noResultsFound')}</p>
              </div>
            )}
            
            <div className="bg-gray-50/50 p-4 border-t border-white/40 text-center">
                 <button onClick={() => setIsOpen(false)} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
                    {t('close')}
                 </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;