// store/reducers/authReducer.js
import { LOGIN_START, LOGIN_SUCCESS, LOGIN_ERROR, GOOGLE_LOGIN_START,LOGOUT } from '../actions/authActions.js';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_START:
        case GOOGLE_LOGIN_START:
            return {
                ...state,
                loading: true,
                error: null
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false,
                error: null
            };
        case LOGOUT:
            return {
                ...initialState,
                user: null,
                token: null,
                isAuthenticated: false
            };

        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                isAuthenticated: false,
                user: null,
                token: null
            };

        default:
            return state;
    }
};

export default authReducer;