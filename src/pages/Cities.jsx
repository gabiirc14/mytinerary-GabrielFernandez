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
      const response = await axios.get(`http://localhost:8080/api/cities?name=${search}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
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

  const CityCard = ({ city }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
      <div className="relative h-64 overflow-hidden">
        <img
          src={city.photo}
          alt={city.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-2xl font-bold text-white">{city.name}</h2>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600">
            <span className="font-semibold">Population:</span>{' '}
            {city.population?.toLocaleString() || 'No disponible'}
          </p>
        </div>

        <button
          onClick={() => navigate(`/city/${city._id}`)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-gray-400 to-blue-900">
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
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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