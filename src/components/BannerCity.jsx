import { useNavigate } from 'react-router-dom';
import "../../src/App.css";

function BannerCity() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 h-[400px] lg:h-[500px]">
        <img
          src="https://wallpaperaccess.com/full/1392569.jpg"
          alt="Buenos Aires"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-[400px] lg:h-[500px] text-white">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Discover the Beauty of Cities
        </h1>
        <button
          onClick={handleHome}
          className="bg-blue-600 text-white font-bold py-2 px-8 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default BannerCity;
