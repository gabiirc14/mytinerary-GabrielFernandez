
import { createReducer } from "@reduxjs/toolkit";
import { GET_ITINERARIES_BY_CITY, SET_LOADING } from '../actions/itineraryActions';

const initialState = {
    itineraries: [],
    loading: false
};

const itineraryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(GET_ITINERARIES_BY_CITY, (state, action) => {
            state.itineraries = action.payload;
        })
        .addCase(SET_LOADING, (state, action) => {
            state.loading = action.payload;
        });
});

export default itineraryReducer;