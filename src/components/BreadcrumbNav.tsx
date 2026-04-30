import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { manahij, getBookBySlug } from '../data/books';

interface BreadcrumbNavProps {
  light?: boolean;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ light = false }) => {
  const location = useLocation();
  const { t, dir, language } = useLanguage();
  
  const paths = location.pathname.split('/').filter(Boolean);
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;

  if (paths.length === 0) return null;

  const translatePath = (path: string, type: string, isLast: boolean) => {
    if (isLast && paths[0] === 'book') {
      const book = getBookBySlug(path);
      if (!book) return path;
      const getLocalizedTitle = () => {
        if (language === 'ar') return book.title;
        if (language === 'en') return book.title_en || book.title;
        if (language === 'es') return book.title_es || book.title;
        if (language === 'pt') return book.title_pt || book.title;
        if (language === 'it') return book.title_it || book.title;
        return book.title;
      };
      return getLocalizedTitle();
    }

    if (type === 'manhaj') {
      const manhaj = manahij.find(m => m.id === path);
      return manhaj?.translations[language as keyof typeof manhaj.translations]?.name || path;
    }
    
    if (path === 'catalog') return t('categories');
    if (path === 'book') return t('books');
    if (path === 'about-us') return t('aboutUs');
    
    return t(path) || path;
  };

  const textColor = light ? 'text-white/40' : 'text-gray-400';
  const activeColor = light ? 'text-white' : 'text-gray-900';
  const hoverColor = light ? 'hover:text-white/80' : 'hover:text-red-600';

  return (
    <nav className="text-xs uppercase tracking-widest font-bold mb-8">
      <ol className="flex flex-wrap items-center">
        <li>
          <Link 
            to="/" 
            className={`${textColor} ${hoverColor} transition-colors`}
          >
            {t('home')}
          </Link>
        </li>
        
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const url = `/${paths.slice(0, index + 1).join('/')}`;
          
          let type = '';
          if (index === 1) type = 'manhaj';
          
          const decodedPath = decodeURIComponent(path);
          const label = translatePath(decodedPath, type, isLast);

          return (
            <React.Fragment key={index}>
              <li className={`mx-3 ${textColor}`}>
                <ChevronIcon className="h-3 w-3" />
              </li>
              <li>
                {isLast ? (
                  <span className={`${activeColor}`}>{label}</span>
                ) : (
                  <Link 
                    to={url} 
                    className={`${textColor} ${hoverColor} transition-colors`}
                  >
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;