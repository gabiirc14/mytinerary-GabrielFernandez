import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col text-white min-h-screen bg-gray-900 ">
      <Header />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </div>
  );
};



export default Layout;