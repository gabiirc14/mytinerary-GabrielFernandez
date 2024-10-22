import { useNavigate } from "react-router-dom";
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
          src="https://images.unsplash.com/photo-1589313002332-92e851e4bcb6?q=80&w=2159&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
