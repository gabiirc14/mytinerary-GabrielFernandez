import React from 'react';
import { MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
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
          <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300">
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;