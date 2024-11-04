import React, { useState,useEffect } from 'react'; 
import { ChevronLeft, Loader, DollarSign, Clock, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItinerariesByCity } from '../store/actions/itineraryActions';

function Details() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { cityImage, cityName } = location.state || {};
  const [expandedItems, setExpandedItems] = useState({});
  const { itineraries = [], loading = false } = useSelector(state => state.itineraries || {});

  useEffect(() => {
    if (cityName) {
      dispatch(getItinerariesByCity(cityName));
    }
  }, [dispatch, cityName]);

  const handleCities = () => {
    navigate("/cities");
  };

  const handleViewMore = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderPriceIcons = (price) => {
    return [...Array(5)].map((_, index) => (
      <DollarSign
        key={index}
        className={`w-5 h-5 ${index < price ? 'text-green-500' : 'text-gray-400'}`}
      />
    ));
  };
  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex flex-col items-center px-4 py-8">
      <div className="flex flex-col items-center justify-center text-center space-y-8 mb-12">
        {cityImage && (
          <div className="space-y-6">
            <img
              src={cityImage}
              alt={cityName}
              className="w-[800px] h-[400px] object-cover rounded-xl shadow-2xl"
            />
            <p className="text-white/80 text-lg max-w-2xl">
              Discover the amazing experiences waiting for you in {cityName}. 
              Our local guides have created unique itineraries to help you explore 
              the best this city has to offer.
            </p>
          </div>
        )}

        <h1 className="text-5xl font-extrabold text-white tracking-wide">
          {cityName}
        </h1>

        <button
          onClick={handleCities}
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:scale-105 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
          <span>Back to Cities</span>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center">
          <Loader className="w-10 h-10 text-blue-400 animate-spin" />
        </div>
      ) : itineraries && itineraries.length === 0 ? (
        <div className="text-center text-white text-xl bg-white/10 p-6 rounded-lg">
          No itineraries yet for this city
        </div>
      ) : (
        <div className="grid gap-6 w-full max-w-4xl">
          {itineraries.map((itinerary, index) => (
            <div key={itinerary._id || index} className="bg-white/10 p-6 rounded-lg backdrop-blur-md transition-all hover:bg-white/15">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={itinerary.author.photo || `https://i.pravatar.cc/150?img=${index + 1}`}
                  alt={itinerary.author.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                />
                <h3 className="text-white text-xl font-semibold">{itinerary.author.name}</h3>
              </div>

              <div className="grid grid-cols-3 gap-4 text-white mb-6">
                <div className="flex items-center justify-center p-3 bg-white/5 rounded-lg">
                  <div className="flex">{renderPriceIcons(itinerary.price)}</div>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-lg">
                  <Clock className="w-6 h-6 text-blue-400" />
                  <span className="text-lg">{itinerary.duration}h</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-white/5 rounded-lg">
                  <Heart className="w-6 h-6 text-rose-400" />
                  <span className="text-lg">{itinerary.likes}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {itinerary.hashtags?.map((tag, idx) => (
                  <span key={idx} className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              <button 
                onClick={() => handleViewMore(itinerary._id)}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
              >
                <span>{expandedItems[itinerary._id] ? 'View Less' : 'View More'}</span>
                {expandedItems[itinerary._id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>

              {expandedItems[itinerary._id] && (
                <div className="mt-4 p-4 bg-blue-500/10 rounded-lg text-white text-center animate-fadeIn">
                  Coming soon: You'll be able to see all the exciting activities available!
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;