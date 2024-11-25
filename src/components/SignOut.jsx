// components/SignOut.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';

const SignOut = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <button 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
        >
            Sign Out
        </button>
    );
};

export default SignOut;