import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';
import { getManhajById } from '../data/books';

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const { t, dir, language } = useLanguage();
  
  const paths = location.pathname.split('/').filter(Boolean);
  const ChevronIcon = dir === 'rtl' ? ChevronLeftIcon : ChevronRightIcon;

  if (paths.length === 0) return null;

  const translatePath = (path: string, type: string) => {
    if (type === 'manhaj') {
      const manhaj = getManhajById(path);
      return manhaj ? manhaj.name : path;
    }
    if (path === 'catalog') return t('categories');
    if (path === 'book') return t('bookDetails');
    if (path.startsWith('Level')) {
      return language === 'ar' ? `المستوى ${path.split(' ')[1]}` : path;
    }
    return path;
  };

  return (
    <nav className="text-sm my-6 bg-white shadow-sm rounded-lg p-4">
      <ol className="flex flex-wrap items-center">
        <li>
          <Link 
            to="/" 
            className="text-gray-500 hover:text-blue-900 flex items-center"
          >
            {t('home')}
          </Link>
        </li>
        
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          const url = `/${paths.slice(0, index + 1).join('/')}`;
          
          let type = '';
          if (index === 1) type = 'manhaj';
          
          const label = translatePath(path, type);
          
          return (
            <React.Fragment key={index}>
              <li className="mx-2 text-gray-400">
                <ChevronIcon className="h-4 w-4" />
              </li>
              <li>
                {isLast ? (
                  <span className="text-blue-900 font-medium">{label}</span>
                ) : (
                  <Link 
                    to={url} 
                    className="text-gray-500 hover:text-blue-900 flex items-center"
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

export default BreadcrumbNav