import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSlide, nextSlide, prevSlide } from '../store/reducers/citySlice';
import Cities from '/public/Images';

const Carousel = () => {
  const dispatch = useDispatch();
  const { currentSlide, totalSlides } = useSelector(state => state.carousel);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(nextSlide());
    }, 8000);

    return () => clearInterval(timer);
  }, [dispatch]);

  if (!Cities || Cities.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-12 container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Popular MyTineraries
      </h2>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {[...Array(totalSlides)].map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {Cities
                .slice(slideIndex * 4, (slideIndex + 1) * 4)
                .map((city) => (
                  <div key={city.name} className="relative group">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="text-center">
                        <p className="text-white text-lg font-semibold">
                          {city.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
        
        <button
          onClick={() => dispatch(prevSlide())}
          className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => dispatch(nextSlide())}
          className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all z-10"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex justify-center mt-4">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => dispatch(setCurrentSlide(index))}
            className={`h-2 w-2 rounded-full mx-1 ${
              currentSlide === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;