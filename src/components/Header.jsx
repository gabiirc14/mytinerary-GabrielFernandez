import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogIn, UserPlus, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/authActions";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserMenuOpen(false);
  };

  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    // Si no hay nombre, usa el email
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Guest';
  };

  return (
    <header className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl text-white font-bold cursor-pointer" onClick={() => navigate('/')}>
              MyTinerary
            </span>
          </div>

          {/* Menu y Login */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleMenu} className="text-white">
              <Menu size={24} />
            </button>

            {/* Dropdown de Usuario */}
            <div className="relative">
              <div
                className="flex items-center cursor-pointer text-white"
                onClick={toggleUserMenu}
              >
                {isAuthenticated && user?.photo ? (
                  <img
                    src={user.photo}
                    alt="Profile"
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <User size={24} className="mr-2" />
                )}
                <span className="max-w-[150px] truncate">
                  {isAuthenticated ? getUserDisplayName() : 'Login'}
                </span>
              </div>

              {/* Menú desplegable */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {isAuthenticated ? (
                    <>
                      {/* Información del usuario */}
                      <div className="px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center space-x-2">
                          {user?.photo ? (
                            <img
                              src={user.photo}
                              alt="Profile"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <User size={24} />
                          )}
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">
                              {getUserDisplayName()}
                            </span>
                            <span className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* Botón de logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100 mt-1"
                      >
                        <LogOut className="mr-2" size={20} />
                        Logout
                      </button>
                    </>
                  ) : (
                    //  usuario no autenticado
                    <>
                      <Link
                        to="/signin"
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <LogIn className="mr-2" size={20} />
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center px-4 py-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <UserPlus className="mr-2" size={20} />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú deslizable */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
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

      {/* Overlay para cerrar menús */}
      {(isMenuOpen || isUserMenuOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsUserMenuOpen(false);
          }}
        ></div>
      )}
    </header>
  );
};

export default Header;