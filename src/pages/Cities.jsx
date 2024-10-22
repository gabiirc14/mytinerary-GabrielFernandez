import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import BannerCity from '../components/BannerCity';

function Cities() {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); 

  // Función para buscar ciudades
  const fetchCities = async (search) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/cities?name=${search}`, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });

      const citiesData = response.data.response; 
      setCities(Array.isArray(citiesData) ? citiesData : []); // Solo se asigna si es un array
    } catch (error) {
      setError(error.message || "Error desconocido"); // Manejo de errores
    } finally {
      setLoading(false);
    }
  };

  // useEffect para recuperar las ciudades al cargar el componente
  useEffect(() => {
    fetchCities(''); // Llamar a la función sin filtro al inicio
  }, []);

  useEffect(() => {
    fetchCities(searchTerm || ''); // Llamar a la función con el término de búsqueda o vacío
  }, [searchTerm]);

  if (error) return <div className="text-red-600 text-center p-4">Error: {error}</div>;

  return (
    <div className="relative">
      <BannerCity />
      <div className="bg-white py-8">
        <h1 className="text-4xl font-bold text-center mb-6">Find your city</h1>

        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 w-full max-w-md mx-auto rounded"
        />

        {loading ? (
          <p className="text-center text-gray-500">Cargando ciudades...</p>
        ) : cities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {cities.map((city) => (
              <div key={city._id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow">
                <img src= {city.photo} alt={city.photo} className="w-16 h-16 rounded-full object-cover"/> 
                <h2 className="text-2xl font-semibold">{city.name}</h2>
                <p className="text-gray-600">Población: {city.population?.toLocaleString() || 'No disponible'}</p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => navigate(`/city/${city._id}`)}
                >
                  Ver detalles
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay ciudades disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Cities;
