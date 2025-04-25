import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, XIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { searchBooks, Book } from '../data/books';

const SearchBar: React.FC = () => {
  const { t } = useLanguage();
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

  const handleResultClick = (book: Book) => {
    navigate(`/book/${book.slug || book.id}`);
    setIsOpen(false);
    setQuery('');
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
          {query && (
            <button
              onClick={clearSearch}
              className="p-1 hover:text-gray-700 text-gray-400"
              aria-label="Clear search"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
          <SearchIcon className="w-5 h-5 text-gray-400 ml-1" />
        </div>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((book) => (
            <button
              key={book.id}
              onClick={() => handleResultClick(book)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 border-b last:border-b-0"
            >
              <img
                src={book.image_urls[0] || 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300'}
                alt={book.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h4 className="font-medium line-clamp-1">{book.title}</h4>
                <p className="text-sm text-gray-600">{book.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;