import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { languages } from '../i18n/translations';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';
import WhatsAppButton from './WhatsAppButton';
import { HomeIcon, MenuIcon, XIcon } from 'lucide-react';

const Layout: React.FC = () => {
  const { t, dir } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'font-[Noto Sans Arabic]' : 'font-[Noto Sans]'}`} dir={dir}>
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img  src="/logo.png" className="left-0 h-10 w-14 text-blue-900" />
              <span className="text-[25px] font-bold text-blue-900">{t('bookCatalog')}</span>
            </Link>
            
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <XIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <MenuIcon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/" className="flex items-center space-x-1 text-gray-700 hover:text-blue-900">
                <HomeIcon className="h-5 w-5" />
                <span className="ml-1">{t('home')}</span>
              </Link>
              <Link to="/catalog" className="text-gray-700 hover:text-blue-900">
                {t('categories')}
              </Link>
              <div className="w-64">
                <SearchBar />
              </div>
              <LanguageSwitcher />
            </nav>
          </div>
          
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t">
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HomeIcon className="h-5 w-5" />
                    <span className="ml-1">{t('home')}</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/catalog" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-900"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{t('categories')}</span>
                  </Link>
                </li>
                <li className="pt-2">
                  <SearchBar />
                </li>
                <li className="pt-2">
                  <LanguageSwitcher />
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-2">
              {t('bookCatalog')}
            </div>
            <div className="mb-2">
              © {new Date().getFullYear()} {t('allRights')}
            </div>
            <div>
              <a href="mailto:Elidrissinouraddin@gmail.com" className="text-gray-300 hover:text-white">
                Elidrissinouraddin@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton/>
    </div>
  );
};

export default Layout;