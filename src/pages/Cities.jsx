import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BannerCity from '../components/BannerCity';
import { Search, Loader2 } from 'lucide-react';

function Cities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCities = async (search) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8080/api/cities?name=${search}`, {});
      const citiesData = response.data.response;
      setCities(Array.isArray(citiesData) ? citiesData : []);
    } catch (error) {
      setError(error.message || "Error al cargar las ciudades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchCities(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const CityCard = ({ city }) => {
    const navigate = useNavigate();

    const handleNavigateToDetails = () => {
      navigate(`/city/${city._id}`, {
        state: {
          cityImage: city.photo,
          cityName: city.name,
        },
      });
    };

    return (
      <div className="relative rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl max-w-md w-full mx-auto">
        <div className="relative h-[500px]">
          <img
            src={city.photo}
            alt={city.name}
            className="absolute inset-0 w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white">{city.name}</h2>
                <h3 className="text-xl font-bold text-white/90">{city.country}</h3>
              </div>
              <button
                onClick={handleNavigateToDetails}
                className="group relative w-full overflow-hidden rounded-lg bg-transparent px-4 py-3 border border-white/30 backdrop-blur-sm transition-all duration-300"
              >
                <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full"></div>
                <div className="relative flex items-center justify-center gap-2">
                  <span className="font-medium text-white text-lg tracking-wider">
                    EXPLORE DETAILS
                  </span>
                  <svg
                    className="w-5 h-5 text-white transform transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <BannerCity />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Discover your ideal city
        </h1>
        <div className="max-w-xl mx-auto mb-8 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar ciudad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-black px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : cities.length > 0 ? (
          <div className={`flex flex-wrap justify-center gap-6`}>
            {cities.map((city) => (
              <CityCard key={city._id} city={city} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg md:text-xl text-white">
              The city
              <strong className="bg-orange-500 text-white px-1 rounded">{searchTerm}</strong>
              was not found. Soon, you'll be able to add your favorite city!
              We are <strong className="text-black">working</strong> hard for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cities;
