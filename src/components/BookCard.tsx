import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../data/books';
import { useLanguage } from '../contexts/LanguageContext';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { t, dir } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle image cycling on hover
  useEffect(() => {
    if (isHovering && book.image_urls.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => 
          prev === book.image_urls.length - 1 ? 0 : prev + 1
        );
      }, 1500); // Change image every 1.5 seconds
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    // Cleanup function
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovering, book.image_urls.length]);
  
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Reset to first image when not hovering
    setCurrentImageIndex(0);
  };
  
  return (
    <div 
      className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/book/${book.slug || book.id}`} className="block">
        <div className="relative aspect-w-3 aspect-h-4">
          <img 
            src={book.image_urls[currentImageIndex] || 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=300'} 
            alt={book.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/book/${book.slug || book.id}`} className="block">
          <h3 className="text-lg font-medium mb-2 line-clamp-2 hover:text-blue-700 transition-colors">{book.title}</h3>
        </Link>
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
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            {t('viewMore')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;