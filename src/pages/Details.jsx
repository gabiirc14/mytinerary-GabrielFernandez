import React from 'react';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BannerCity from '../components/BannerCity';

function Details() {
  const navigate = useNavigate();

  const handleCities = () => {
    navigate("/cities");
  };

  return (
    <div className="relative">
      <BannerCity />
      {/* Contenedor principal */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-2xl text-center"> {/* Agregué text-center para centrar */}
        <h1 className="text-4xl font-bold mb-4 text-white">Cities</h1>
        <div className="flex justify-center"> {/* Aseguramos que el botón esté centrado */}
          <button
            onClick={handleCities}
            className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition 
            duration-300"
          >
            Return to Cities
          </button>
        </div>

        {/* Mensaje de alerta */}
        <div
          className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8 mt-8"
          role="alert"
        >
          <p className="font-bold">Page Under Construction</p>
          <p>We're working hard to bring you an amazing experience. Check back soon!</p>
        </div>

        {/* Loader de carga */}
        <div className="flex justify-center mb-8">
          <Loader className="animate-spin text-blue-500" size={48} />
        </div>
      </div>
    </div>
  );
}

export default Details;
