import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    // Aquí puedes agregar lógica adicional para manejar el "like"
  };

  const goToHome = () => {
    navigate('/');
    if (isMenuOpen) toggleMenu();
  };

  return (
    <header className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl text-white font-bold cursor-pointer" onClick={goToHome}>
              MyTinerary
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button onClick={toggleMenu} className="text-white">
              <Menu size={24} />
            </button>
            <div className="flex bg- items-center cursor-pointer" >
              <User size={24} className="mr-2 "/>
              <p className="text-white font-bold">Login</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menú deslizable */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4">
          <button onClick={toggleMenu} className="text-white float-right">
            <X size={24} />
          </button>
          <nav className="mt-8 text-white">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block hover:text-blue-500 text-lg transition-colors"
                  onClick={toggleMenu}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/cities"
                  className="block hover:text-blue-500 text-lg transition-colors"
                  onClick={toggleMenu}
                >
                  Cities
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay */}
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