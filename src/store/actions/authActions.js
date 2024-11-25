// store/actions/authActions.js
import axios from 'axios';

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const GOOGLE_LOGIN_START = "GOOGLE_LOGIN_START";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";


// URL base
const BASE_URL = 'http://localhost:8080/api/auth';

// Action para login normal
export const loginUser = (formData) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_START });
            
            const response = await axios.post(`${BASE_URL}/signin`, formData);
            console.log('Respuesta del servidor:', response.data); // Para debugging
            
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        user: response.data.user,
                        token: response.data.token
                    }
                });
                return response.data;
            }
        } catch (error) {
            console.error('Error en login:', error);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response?.data?.message || 'Login failed'
            });
            throw error;
        }
    };
};
// Action para Google login
export const googleLogin = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GOOGLE_LOGIN_START });
            window.location.href = `${BASE_URL}/signin/google`;
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Error al iniciar sesión con Google'
            });
        }
    };
};

export const handleGoogleResponse = () => {
    return (dispatch) => {
        try {
            //  parámetros de la URL
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const userDataStr = params.get('userData');

            if (token && userDataStr) {
                const userData = JSON.parse(decodeURIComponent(userDataStr));
                localStorage.setItem('token', token);
                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        user: userData,
                        token: token
                    }
                });

                // Retornamos true para exito
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error procesando login de Google:', error);
            dispatch({
                type: LOGIN_ERROR,
                payload: 'Error procesando la respuesta de Google'
            });
            return false;
        }
    };
};

export const LOGOUT = "LOGOUT";

export const logout = () => {
    return async (dispatch) => {
        try {
            const token = localStorage.getItem('token');
            
            // Llamada al endpoint de logout
            const response = await axios.post(`${BASE_URL}/signout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                // Limpiar localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                // Dispatch del logout
                dispatch({ type: LOGOUT_SUCCESS });
                
                // Redirección
                window.location.href = '/signin';
            }
        } catch (error) {
            console.error('Error en logout:', error);
            dispatch({
                type: LOGOUT_ERROR,
                payload: error.response?.data?.message || 'Logout failed'
            });
            
            // Aún así, limpiamos el localStorage y hacemos logout local
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            dispatch({ type: LOGOUT });
            window.location.href = '/signin';
        }
    };
};