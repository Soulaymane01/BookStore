import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../data/books';
import { useLanguage } from '../contexts/LanguageContext';
import { ExternalLinkIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { t, dir } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === book.image_urls.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? book.image_urls.length - 1 : prev - 1
    );
  };
  
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-w-3 aspect-h-4">
        <img 
          src={book.image_urls[currentImageIndex] || 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300'} 
          alt={book.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
        {book.image_urls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {book.image_urls.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium mb-2 line-clamp-2">{book.title}</h3>
        <div className="flex justify-between items-center mb-3">
          <span className="text-blue-900 font-bold">{book.price}</span>
          {book.mostawa && (
            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded">
              {book.mostawa}
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <Link 
            to={`/book/${book.slug || book.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            {t('viewMore')}
          </Link>
          <a 
            href={book.product_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center text-sm text-gray-600 hover:text-blue-900"
          >
            <ExternalLinkIcon className="h-4 w-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;