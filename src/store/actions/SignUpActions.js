import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Acción para el registro con datos del formulario
export const signup = createAsyncThunk(
  'signup/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/register', formData);
      return response.data; //  devuelve { user, token }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error de conexión');
    }
  }
);

// Acción para el registro con Google
export const googleSignup = createAsyncThunk(
  'signup/google',
  async (_, { rejectWithValue }) => {
    try {
      // Redirigir al usuario a la ruta de autenticación con Google
      window.location.href = 'http://localhost:8080/api/auth/signin/google';
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error de conexión');
    }
  }
);