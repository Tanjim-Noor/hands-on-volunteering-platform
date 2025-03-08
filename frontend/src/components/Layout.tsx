import React from 'react';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-800">
      <Navbar />
      <div className={`flex-grow w-full ${!isHomePage ? 'container mx-auto px-4 py-4' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;