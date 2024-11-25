import React, { useState, useEffect } from 'react';
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
          <div className="space-y-6 w-full max-w-[800px] mx-auto">
            <div className="relative w-full">
              <img
                src={cityImage}
                alt={cityName}
                className="w-full h-[400px] object-cover rounded-xl shadow-2xl"
              />
            </div>
            <div className="flex flex-col items-center space-y-6 px-4">
              <div className="relative">
                <div className="absolute -left-2 -top-2">
                  <svg
                    className="w-8 h-8 text-blue-400 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.9999 2.7178C12.9059 1.6698 14.5279 1.5098 15.6579 2.2698L15.8919 2.4398C17.0219 3.1998 17.4239 4.7418 16.6639 5.9838L10.9999 15.0018L5.33591 5.9838C4.57591 4.7418 4.97791 3.1998 6.10791 2.4398L6.34191 2.2698C7.47191 1.5098 9.09391 1.6698 9.99991 2.7178L11.9999 4.7178L13.9999 2.7178Z" />
                  </svg>
                </div>
                <div className="absolute -right-2 -top-2 transform rotate-45">
                  <svg
                    className="w-8 h-8 text-purple-400 opacity-50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11.9999 2.7178C12.9059 1.6698 14.5279 1.5098 15.6579 2.2698L15.8919 2.4398C17.0219 3.1998 17.4239 4.7418 16.6639 5.9838L10.9999 15.0018L5.33591 5.9838C4.57591 4.7418 4.97791 3.1998 6.10791 2.4398L6.34191 2.2698C7.47191 1.5098 9.09391 1.6698 9.99991 2.7178L11.9999 4.7178L13.9999 2.7178Z" />
                  </svg>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 p-6 rounded-lg backdrop-blur-sm border border-white/10 max-w-2xl">
                <h2 className="text-2xl font-bold text-center text-white mb-4">
                  Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{cityName}</span>
                </h2>

                <div className="space-y-4">
                  <p className="text-white/90 text-lg text-center leading-relaxed">
                    Discover breathtaking experiences in this magnificent destination.
                    Our expert local guides have carefully crafted unique journeys that
                    showcase the very best of what {cityName} has to offer.
                  </p>

                  <div className="flex justify-center gap-6 pt-4 text-sm text-white/70">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Curated Experiences
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Local Guides
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                      Unique Adventures
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
        <div className="text-center p-8 rounded-lg bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="inline-block p-4 rounded-full bg-blue-500/10">
              <svg
                className="w-12 h-12 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">
                Adventures Coming Soon to {cityName}
              </h3>
              <p className="text-white/80">
                Our local guides are crafting incredible experiences for this destination.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-blue-400">
                Stay tuned for upcoming itineraries and be among the first to explore!
              </p>
            </div>
          </div>
        </div>
      ): (
        <div className="grid gap-6 w-full max-w-4xl">
          {itineraries.map((itinerary, index) => (
            <div key={itinerary._id || index} className="bg-white/10 p-6 rounded-lg backdrop-blur-md transition-all hover:bg-white/15">
              <div className="flex flex-col gap-4">
                {/* Información del autor y título */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={itinerary.author.photo || `https://i.pravatar.cc/150?img=${index + 1}`}
                      alt={itinerary.author.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-400"
                    />
                    <div className="flex flex-col">
                      <span className="text-white/70 text-sm">Created by:</span>
                      <h3 className="text-white text-xl font-semibold">{itinerary.author.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-blue-400 text-lg font-medium">{itinerary.author.title}</p>
                </div>
                <div className="w-full">
                  <img
                    src={itinerary.image}
                    alt="Place"
                    className="w-full h-[300px] object-cover rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-white">
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

                {/* Hashtags */}
                <div className="flex flex-wrap gap-2">
                  {itinerary.hashtags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* View More button */}
                <button
                  onClick={() => handleViewMore(itinerary._id)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-white/20 rounded-lg text-white hover:bg-white/30 transition-colors"
                >
                  <span>{expandedItems[itinerary._id] ? 'View Less' : 'View More'}</span>
                  {expandedItems[itinerary._id] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>

                {expandedItems[itinerary._id] && (
                  <div className="mt-4 p-6 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-blue-500/10 rounded-lg text-white border border-white/10 backdrop-blur-sm animate-fadeIn">
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-blue-500/20 p-3 rounded-full">
                          <svg
                            className="w-8 h-8 text-blue-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="text-center space-y-2">
                        <h4 className="text-xl font-semibold text-blue-300">
                          Exciting Activities Coming Soon!
                        </h4>
                        <p className="text-white/80">
                          We're preparing an amazing collection of activities for this itinerary.
                        </p>
                      </div>

                      <div className="flex justify-center gap-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Coming Soon
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Stay Tuned
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
                        <div className="bg-blue-500 h-1.5 rounded-full w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;