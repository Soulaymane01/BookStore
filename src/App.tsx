import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="catalog" element={<CatalogPage />} />
            <Route path="catalog/:manhaj" element={<CatalogPage />} />
            <Route path="catalog/:manhaj/:fiat" element={<CatalogPage />} />
            <Route path="catalog/:manhaj/:fiat/:mostawa" element={<CatalogPage />} />
            <Route path="book/:slug" element={<BookDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;