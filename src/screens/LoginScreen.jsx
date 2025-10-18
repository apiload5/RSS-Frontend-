// src/screens/LoginScreen.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // AuthContext ko import karen
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline, IoMailOutline, IoLogoGoogle } from 'react-icons/io5';

// Tailwind CSS classes ko assume kar ke UI code banaya gaya hai
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const { login, loginWithGoogle } = useAuth(); // Auth functions use karen
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Email aur password dono zaroori hain.');
            return;
        }

        setIsLoggingIn(true);
        try {
            await login(email, password);
            navigate('/'); // Login hone ke baad Dashboard par redirect karen
        } catch (err) {
            // Firebase errors ko handle karna
            if (err.code === 'auth/invalid-email') {
                setError('Invalid email address.');
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError('Email ya password galat hai.');
            } else {
                setError('Login mein masla hua. Dobara koshish karen.');
            }
        } finally {
            setIsLoggingIn(false);
        }
    };
    
    const handleGoogleLogin = async () => {
        setError('');
        setIsLoggingIn(true);
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError('Google login mein masla hua.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Apne Account Mein Login Karen
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-100 text-red-700 p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <IoMailOutline className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-md relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Email address"
                            disabled={isLoggingIn}
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Password"
                            disabled={isLoggingIn}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600"
                            disabled={isLoggingIn}
                        >
                            {showPassword ? <IoEyeOffOutline className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Login Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? 'Logging In...' : 'Login Karen'}
                        </button>
                    </div>

                    {/* Google Login Divider */}
                    <div className="flex items-center justify-center">
                        <div className="w-full border-t border-gray-300"></div>
                        <div className="px-3 text-gray-500 text-sm font-medium">Ya</div>
                        <div className="w-full border-t border-gray-300"></div>
                    </div>

                    {/* Google Login Button */}
                    <div>
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="group relative w-full flex justify-center items-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            disabled={isLoggingIn}
                        >
                            <IoLogoGoogle className="h-5 w-5 mr-2" />
                            Google se Login Karen
                        </button>
                    </div>

                </form>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        Naya account chahiye?{' '}
                        <button 
                            onClick={() => navigate('/signup')} 
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Yahan Register Karen
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
