import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import SearchBar from './SearchBar';
import WhatsAppButton from './WhatsAppButton';
import { MenuIcon, XIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout: React.FC = () => {
  const { t, dir } = useLanguage();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isRtl = dir === 'rtl';
  const isHomePage = location.pathname === '/';
  // Use background if scrolled OR on any page that is NOT the home page
  const showBackground = isScrolled || !isHomePage;

  return (
    <div className={`min-h-screen flex flex-col ${isRtl ? 'font-arabic' : 'font-english'} selection:bg-red-100 selection:text-red-900`} dir={dir}>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showBackground ? 'py-2' : 'py-6'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <nav className={`transition-all duration-500 rounded-3xl ${showBackground ? 'bg-[#0f172a]/90 backdrop-blur-xl border border-red-900/30 shadow-2xl translate-y-0 px-6 py-3' : 'bg-transparent translate-y-2'}`}>
            <div className="flex justify-between items-center">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: isScrolled ? 0 : [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="h-12 w-16 overflow-hidden flex items-center justify-center p-1"
                  >
                    <img src="/logo.png" className="h-full w-full object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all" alt="Logo" />
                  </motion.div>
                </div>
                <div className="flex flex-col">
                  <span className={`text-xl font-bold tracking-tight transition-colors text-white`}>
                    {t('bookCatalog')}
                  </span>
                  <span className={`text-[10px] uppercase tracking-[0.3em] font-medium transition-colors ${showBackground ? 'text-amber-400/80' : 'text-white/70'}`}>
                    {t('premiereDistribution')}
                  </span>
                </div>
              </Link>
              
              <div className="hidden lg:flex items-center gap-10">
                <Link to="/" className={`text-xs uppercase tracking-widest font-bold transition-all hover:text-amber-400 ${showBackground ? 'text-white/80' : 'text-white'}`}>
                  {t('home')}
                </Link>
                <Link to="/catalog" className={`text-xs uppercase tracking-widest font-bold transition-all hover:text-amber-400 ${showBackground ? 'text-white/80' : 'text-white'}`}>
                  {t('categories')}
                </Link>
                <Link to="/about-us" className={`text-xs uppercase tracking-widest font-bold transition-all hover:text-amber-400 ${showBackground ? 'text-white/80' : 'text-white'}`}>
                  {t('aboutUs')}
                </Link>
                <div className="h-5 w-px bg-white/20 mx-2"></div>
                <div className="w-64">
                  <SearchBar />
                </div>
                <LanguageSwitcher />
              </div>

              <button 
                className={`lg:hidden p-2 rounded-xl transition-colors ${isScrolled ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white backdrop-blur-md'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
              >
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              className="lg:hidden mx-4 mt-2 overflow-visible z-[60]"
            >
              <div className="bg-[#0f172a]/95 backdrop-blur-3xl rounded-[2rem] p-8 shadow-2xl border border-red-900/30 flex flex-col gap-8 relative overflow-visible">
                <div className="space-y-4">
                  <Link to="/" className="block text-lg font-bold text-white hover:text-amber-400 transition-colors border-b border-white/5 pb-4" onClick={() => setIsMenuOpen(false)}>
                    {t('home')}
                  </Link>
                  <Link to="/catalog" className="block text-lg font-bold text-white hover:text-amber-400 transition-colors border-b border-white/5 pb-4" onClick={() => setIsMenuOpen(false)}>
                    {t('categories')}
                  </Link>
                  <Link to="/about-us" className="block text-lg font-bold text-white hover:text-amber-400 transition-colors border-b border-white/5 pb-4" onClick={() => setIsMenuOpen(false)}>
                    {t('aboutUs')}
                  </Link>
                </div>
                
                <div className="space-y-6 relative">
                  <div className="px-2">
                    <SearchBar />
                  </div>
                  <div className="flex justify-center">
                    <LanguageSwitcher />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      <main className="flex-grow pt-0">
        <Outlet />
      </main>
      
      <footer className="bg-[#0f172a] text-white pt-20 pb-10 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-3 mb-6">
                <img src="/logo.png" className="h-10 w-14" alt="Logo" />
                <span className="text-2xl font-bold tracking-tight text-white">{t('bookCatalog')}</span>
              </Link>
              <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
                Premium distributor of specialized Arabic educational resources and classical Islamic literature. Curating the best for students and teachers worldwide.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">{t('quickLinks')}</h4>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">{t('home')}</Link></li>
                <li><Link to="/catalog" className="text-gray-400 hover:text-white transition-colors">{t('categories')}</Link></li>
                <li><Link to="/about-us" className="text-gray-400 hover:text-white transition-colors">{t('aboutUs')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">{t('contact')}</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <span className="text-gray-400">Email:</span>
                  <a href="mailto:Elidrissinouraddin@gmail.com" className="text-white hover:text-red-400 transition-colors truncate">
                    Elidrissinouraddin@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} دار الادريسي للتوزيع. {t('allRights')}
            </div>
            <div className="flex gap-6">
               {/* Could add social icons here later */}
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppButton/>
    </div>
  );
};

export default Layout;