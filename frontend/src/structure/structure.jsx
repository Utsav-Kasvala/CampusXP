import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Routers from '../routes/Routers';

const Structure = () => {
  const location = useLocation();

  // Check if the current route should hide the header and footer
  const shouldHideHeaderFooter = location.pathname.startsWith('/conferencecall/');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Conditionally render the Header */}
      
      {!shouldHideHeaderFooter && <Header />}
      <main className="flex-grow">
        <Routers />
      </main>
      {/* Conditionally render the Footer */}
      {!shouldHideHeaderFooter && <Footer />}
    </div>
  );
};

export default Structure;
