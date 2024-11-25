import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../store/reducers/cityReducer.js'; 
import itineraryReducer from '../store/reducers/itineraryReducer.js';
import carouselReducer from '../store/reducers/citySlice.js';  
import authReducer from '../store/reducers/authReducer.js';
import signUpReducer from '../store/reducers/SignUpReducer.js';

const store = configureStore({
  reducer: {
    cities: cityReducer,
    itineraries: itineraryReducer,
    carousel: carouselReducer  ,
    auth: authReducer,
    signup: signUpReducer

  },
});

export default store;