import React from "react";
import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
          <div className="md:w-1/2">
            <img
              src="/api/placeholder/600/400"
              alt="City Skyline"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <MapPin className="mr-2 text-blue-500" />
              Discover Amazing Cities
            </h2>
            <p className="text-gray-600 mb-6">
              Explore unique itineraries crafted by locals who know their cities
              inside out. Start your journey today!
            </p>
            <Link
              to="/cities"
              className="inline-flex items-center justify-center bg-blue-500 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 group"
            >
              Explore Cities
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
