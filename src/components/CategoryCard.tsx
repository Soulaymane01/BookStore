import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, LayersIcon, FolderIcon, ArrowRightIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface CategoryCardProps {
  title: string;
  type: 'manhaj' | 'fiat' | 'subfiat' | 'mostawa';
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
  const { t, dir } = useLanguage();

  const getIcon = () => {
    switch (type) {
      case 'manhaj':
        return <BookOpenIcon className="h-8 w-8 text-red-600" />;
      case 'fiat':
        return <FolderIcon className="h-8 w-8 text-amber-600" />;
      case 'mostawa':
        return <LayersIcon className="h-8 w-8 text-emerald-600" />;
      default:
        return <BookOpenIcon className="h-8 w-8 text-indigo-600" />;
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'fiat':
        return 'from-amber-500/10 to-amber-500/5';
      case 'mostawa':
        return 'from-emerald-500/10 to-emerald-500/5';
      default:
        return 'from-red-500/10 to-red-500/5';
    }
  };

  if (type === 'manhaj' && imageUrl) {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link
          to={url}
          className="group block relative h-[450px] rounded-[2rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700"
        >
          {/* Image Overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div className="absolute inset-0 z-20 p-10 flex flex-col justify-end text-white">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-widest mb-4 w-fit">
              {t(type)}
            </span>
            <h3 className="text-3xl font-bold mb-4 group-hover:text-red-400 transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-white/70 mb-8 line-clamp-2 text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            )}
            <div className="flex items-center gap-3 font-bold text-sm tracking-widest uppercase">
              <span>{t('explore')}</span>
              <ArrowRightIcon className={`w-4 h-4 transform transition-transform group-hover:translate-x-2 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={url}
        className={`group block relative p-1 rounded-[2rem] overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-100 group-hover:opacity-100 transition-opacity duration-500`} />

        <div className="relative glass-effect p-8 rounded-[1.9rem] flex items-center justify-between border-white/40">
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl bg-white shadow-sm group-hover:shadow-md transition-all`}>
              {getIcon()}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                {title}
              </h3>
              {count > 0 && (
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                  {count} {count === 1 ? t('item') : t('items')}
                </p>
              )}
            </div>
          </div>

          <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-all duration-300">
            <ArrowRightIcon className={`w-4 h-4 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;