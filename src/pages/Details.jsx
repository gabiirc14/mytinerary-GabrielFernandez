import React from 'react';
import { ChevronLeft, Loader } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cityImage, cityName } = location.state || {};

  const handleCities = () => {
    navigate("/cities");
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center text-center space-y-8">
        {cityImage && (
          <img
            src={cityImage}
            alt={cityName}
            className="w-80 h-80 object-cover rounded-xl shadow-2xl transition-transform transform hover:scale-105"
          />
        )}

        <h1 className="text-4xl font-extrabold text-white tracking-wide">
          {cityName || 'Your Destination'}
        </h1>

        <button
          onClick={handleCities}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back to Cities</span>
        </button>

        <div className="bg-white/10 p-6 rounded-lg shadow-md backdrop-blur-md border border-white/20 w-full max-w-xl">
          <div className="flex items-center gap-4">
            <Loader className="w-10 h-10 text-blue-400 animate-spin" />
            <div className="text-left">
              <h2 className="text-white text-2xl font-semibold">Page Under Construction</h2>
              <p className="text-white/70 mt-2">
                We are working hard to bring you the best experience. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
