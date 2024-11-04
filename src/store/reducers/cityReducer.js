
import { createReducer, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { fetchCities as fetchCitiesService } from '../../services/cityService.js';

export const fetchCities = createAsyncThunk(
    'cities/fetchCities',
    async (search, { rejectWithValue }) => {
        try {
            return await fetchCitiesService(search); 
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const setSearchTerm = createAction('cities/setSearchTerm');

const initialState = {
    cities: [],
    loading: false,
    error: null,
    searchTerm: '',
};

const cityReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setSearchTerm, (state, action) => {
            state.searchTerm = action.payload;
        })
        .addCase(fetchCities.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCities.fulfilled, (state, action) => {
            state.loading = false;
            state.cities = action.payload;
        })
        .addCase(fetchCities.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
});

export default cityReducer;
