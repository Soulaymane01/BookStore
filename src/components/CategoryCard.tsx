import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, LayersIcon, FolderIcon, ChevronRight as ChevronIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  title: string;
  type: 'manhaj' | 'fiat' | 'mostawa';
  count?: number;
  url: string;
  description?: string;
  imageUrl?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  title, 
  type, 
  count = 0, 
  url, 
  description = '',
  imageUrl = '' 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'manhaj':
        return <BookOpenIcon className="h-10 w-10 text-blue-900 transform group-hover:rotate-12 transition-transform duration-300" />;
      case 'fiat':
        return <FolderIcon className="h-10 w-10 text-amber-600 transform group-hover:rotate-12 transition-transform duration-300" />;
      case 'mostawa':
        return <LayersIcon className="h-10 w-10 text-emerald-600 transform group-hover:rotate-12 transition-transform duration-300" />;
      default:
        return <BookOpenIcon className="h-10 w-10 text-blue-900 transform group-hover:rotate-12 transition-transform duration-300" />;
    }
  };
  
  const getStyle = () => {
    switch (type) {
      case 'fiat':
        return 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-amber-100';
      case 'mostawa':
        return 'bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-emerald-100';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-gray-100';
    }
  };
  
  if (type === 'manhaj' && imageUrl) {
    return (
      <Link
      to={url}
      className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
    >
      {/* Image Section */}
      <div className="w-full max-w-full">  {/* Container to control image width */}
        <div className="aspect-w-16 aspect-h-9"> {/* Maintain aspect ratio (adjust as needed) */}
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"  // Ensure image covers the space
          />
        </div>
      </div>

      {/* Text Section - Below Image */}
      <div className="relative p-6">
        <h3 className="text-2xl font-bold mb-3 text-gray-900">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        )}
        <span className="inline-flex items-center text-blue-900 font-medium">
          Explore More
          <ChevronIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </span>
      </div>
    </Link>

      
    );
  }
  
  
  // Original card design for fiat and mostawa
  return (
    <Link 
      to={url} 
      className={`group block p-6 rounded-2xl border-2 ${getStyle()} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <div className="flex items-center">
        <div className="mr-4">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-1 group-hover:text-blue-900 transition-colors duration-300">
            {title}
          </h3>
          {count > 0 && (
            <p className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;