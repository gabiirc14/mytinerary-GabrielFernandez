import { createSlice } from '@reduxjs/toolkit';
import Cities from '/public/Images';

const TOTAL_SLIDES = Math.ceil(Cities.length / 4);

const carouselSlice = createSlice({
  name: 'carousel',
  initialState: {
    currentSlide: 0,
    totalSlides: TOTAL_SLIDES
  },
  reducers: {
    nextSlide: (state) => {
      state.currentSlide = (state.currentSlide + 1) % state.totalSlides;
    },
    prevSlide: (state) => {
      state.currentSlide = state.currentSlide === 0 
        ? state.totalSlides - 1 
        : state.currentSlide - 1;
    },
    setCurrentSlide: (state, action) => {
      const newSlide = Number(action.payload);
      state.currentSlide = Math.min(Math.max(0, newSlide), state.totalSlides - 1);
    }
  }
});

export const { nextSlide, prevSlide, setCurrentSlide } = carouselSlice.actions;
export default carouselSlice.reducer;