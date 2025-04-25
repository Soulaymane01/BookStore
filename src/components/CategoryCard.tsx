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
        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 block h-[550px] w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-20">
          <h3 className="text-3xl font-bold mb-4 transform group-hover:translate-x-2 transition-transform duration-300">
            {title}
          </h3>
          {description && (
            <p className="text-gray-200 mb-6 transform group-hover:translate-x-2 transition-transform duration-300 delay-75">
              {description}
            </p>
          )}
          <div className="flex items-center text-white transform group-hover:translate-x-4 transition-transform duration-300">
            <span className="font-medium">Explore More</span>
            <ChevronIcon className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
          </div>
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