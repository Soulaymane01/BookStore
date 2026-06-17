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

  const categoryMapping: Record<string, string> = {
    "تعليم اللغة العربية": "cat_arabic_language",
    "الابتدائي": "cat_primary",
    "الاعدادي": "cat_middle_school",
    "محو الامية": "cat_literacy",
    "العربية بين يديك": "cat_arabic_between_hands",
    "العربية بين أيدي أولادنا": "cat_arabic_for_children",
    "الدراسات الإسلامية": "cat_islamic_studies",
    "تعليم الأسلام": "cat_islamic_studies",
    "أدواة التنظيم": "cat_organization",
    "مستويات الحضانة": "cat_kindergarten"
  };

  const translatePath = (path: string, index: number, isLast: boolean) => {
    // 1. Handle Home/Special Root Paths
    if (path === 'catalog') return t('categories');
    if (path === 'book') return t('books');
    if (path === 'about-us') return t('aboutUs');

    // 2. Handle Book Detail Title
    if (isLast && paths[0] === 'book') {
      const book = getBookBySlug(path);
      if (!book) return path;
      return (book as any)[`title_${language}`] || 
             (language !== 'ar' && (book as any).title_en ? (book as any).title_en : book.title);
    }

    // 3. Handle Manhaj ID (typically at index 1 after /catalog/)
    if (index === 1 && paths[0] === 'catalog') {
      const manhaj = manahij.find(m => m.id === path);
      if (manhaj) {
        return (manhaj.translations as any)[language]?.name || manhaj.translations.ar.name;
      }
    }

    // 4. Handle Categories (fiat, subfiat)
    const categoryKey = categoryMapping[path];
    if (categoryKey) {
      return t(categoryKey as any);
    }
    
    // 5. Final Fallback
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
          let url = `/${paths.slice(0, index + 1).join('/')}`;
          
          // Redirect broken /book route to /catalog
          if (path === 'book') url = '/catalog';
          
          const decodedPath = decodeURIComponent(path);
          const label = translatePath(decodedPath, index, isLast);

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