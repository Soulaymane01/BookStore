// src/pages/HomePage/HomePage.tsx
import React from 'react';
import HeroSection from '../components/HomePage/HeroSection';
import AssociationSection from '../components/HomePage/AssociationSection';
import CategoriesSection from '../components/HomePage/CategoriesSection';
import FeaturesSection from '../components/HomePage/FeaturesSection';
import AboutUs from '../components/HomePage/AboutUs'; // Adjust path as needed
import ShippingBanner from '../components/HomePage/ShippingBanner';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AssociationSection />
      <ShippingBanner/>
      <CategoriesSection />
      <AboutUs isHomePage={true} />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;