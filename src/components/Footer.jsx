import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Map, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Información del sitio */}
          <div>
            <h3 className="text-2xl font-bold mb-4">MyTinerary</h3>
            <p className="mb-4">
              Find your perfect trip, designed by insiders who know and love
              their cities!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Menú de navegación adicional */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/cities" className="hover:text-blue-400">
                  Cities
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-blue-400">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Información de contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Map size={16} className="mr-2" />
                123 Travel Street, City, Country
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                info@mytinerary.com
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                +1 (123) 456-7890
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="mb-4">Stay updated with our latest offers and news</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-700 text-white px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} MyTinerary. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
