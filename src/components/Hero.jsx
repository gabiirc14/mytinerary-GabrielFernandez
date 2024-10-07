import React, { useState } from 'react';
import { MapPin, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [likedCities, setLikedCities] = useState({});
  const navigate = useNavigate();

  const cities = [
    "Buenos Aires",
    "Bogotá",
    "Tokyo",
    "London",
  ];

  const handleLike = (city) => {
    setLikedCities(prev => ({
      ...prev,
      [city]: !prev[city]
    }));
  };

  const handleExplore = () => {
    navigate('/cities');
  };

  return (
    <div className="relative text-white">
      <div className="absolute inset-0">
        <img 
          src="https://wallpaperaccess.com/full/1392569.jpg" 
          alt="Buenos Aires" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
            MyTinerary
          </h1>
          <div className="flex justify-center items-center mb-8">
            <MapPin size={24} className="mr-2" />
            <p className="text-xl md:text-2xl font-light italic">
              Find your perfect trip
            </p>
          </div>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
            Designed by insiders who know and love their cities!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {cities.map((city) => (
              <div key={city} className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 flex flex-col items-center">
                <p className="font-bold mb-2">{city}</p>
                <button 
                  onClick={() => handleLike(city)}
                  className="flex items-center"
                >
                  <Heart 
                    size={20} 
                    className={`mr-1 ${likedCities[city] ? 'fill-red-500 text-red-500' : 'text-gray-200'}`}
                  />
                  {likedCities[city] ? 'Liked' : 'Like'}
                </button>
              </div>
            ))}
          </div>
          <button 
            onClick={handleExplore}
            className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;