import React from 'react';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';






function Cities() {
  const navigate = useNavigate();
const handleHome = () => {
  navigate("/");
};
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
       <button
            onClick={handleHome}
            className="bg-white text-blue-600 font-bold py-2 px-6 rounded-full hover:bg-blue-100 transition duration-300"
          >
            Return to home
          </button>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-center">Cities</h1>
        
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-8" role="alert">
          <p className="font-bold">Page Under Construction</p>
          <p>We're working hard to bring you an amazing experience. Check back soon!</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <Loader className="animate-spin text-blue-500" size={48} />
        </div>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex items-center justify-center h-64 bg-gray-200">
            <p className="text-2xl text-gray-500 font-bold text-center px-4">
              More Cities Coming Soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cities;