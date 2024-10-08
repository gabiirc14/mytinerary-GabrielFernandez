import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-700 via-gray-400 to-blue-900 ">
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};



export default Layout;