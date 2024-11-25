import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Loader } from 'lucide-react';
import { loginUser, googleLogin, handleGoogleResponse } from '../store/actions/authActions';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { loading, error } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        const processGoogleLogin = async () => {
            const success = await dispatch(handleGoogleResponse());
            if (success) {
                navigate('/cities');
            }
        };

        processGoogleLogin();
    }, [dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser(formData));
            if (result.success) {
                navigate('/cities');
            }
        } catch (error) {
            console.error('Error en login:', error);
        }
    };

    const handleGoogleSignIn = () => {
        dispatch(googleLogin());
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 py-12 px-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-6">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500">
                        Sign in to continue your journey
                    </p>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                    <img
                        src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                        alt="Google logo"
                        className="w-6 h-6"
                    />
                    <span className="text-gray-600 font-medium">Continue with Google</span>
                </button>

                <div className="relative flex items-center justify-center">
                    <div className="border-t border-gray-200 flex-grow"></div>
                    <span className="px-4 text-sm text-gray-500 bg-white">or continue with email</span>
                    <div className="border-t border-gray-200 flex-grow"></div>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center text-sm">
                        Invalid credentials. Please check your email and password.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Mail size={18} />
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Lock size={18} />
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white p-3 rounded-lg font-medium transition duration-200
                            ${loading ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                <span>Signing in...</span>
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                        Create one here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;