import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/api/placeholder/50/50" alt="Logo" className="w-8 h-8 mr-2" />
            <span className="text-xl font-bold">MyTinerary</span>
          </div>

          {/* Botón de menú */}
          <div className="flex items-center">
            <button onClick={toggleMenu} className="text-white mr-4">
              <Menu size={24} />
            </button>
            <User size={24} />
          </div>
        </div>
      </div>

      {/* Menú deslizable para todas las pantallas */}
      <div className={`fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <button onClick={toggleMenu} className="text-white float-right">
            <X size={24} />
          </button>
          <nav className="mt-8">
            <ul className="space-y-4">
              <li><Link to="/" className="block hover:text-gray-300 text-lg" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/cities" className="block hover:text-gray-300 text-lg" onClick={toggleMenu}>Cities</Link></li>
              <li><Link to="#" className="block hover:text-gray-300 text-lg" onClick={toggleMenu}>About</Link></li>
              <li><Link to="#" className="block hover:text-gray-300 text-lg" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;