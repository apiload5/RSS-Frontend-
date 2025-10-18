// src/screens/SignupScreen.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!email || !password || !confirmPassword) {
            setError('Tamam fields zaroori hain.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords match nahi kar rahe hain.');
            return;
        }
        
        // Firebase ko minimum 6 characters ka password chahiye
        if (password.length < 6) {
            setError('Password kam se kam 6 characters ka hona chahiye.');
            return;
        }

        setIsSigningUp(true);
        try {
            await register(email, password);
            // Registration ke baad, user automatically login ho jata hai (AuthContext ki wajah se)
            navigate('/'); 
        } catch (err) {
            // Firebase errors ko handle karna
            if (err.code === 'auth/email-already-in-use') {
                setError('Yeh email pehle hi istemal ho chuka hai.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address.');
            } else {
                setError('Registration mein masla hua. Dobara koshish karen.');
            }
        } finally {
            setIsSigningUp(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Naya Account Banayen
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    
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
                            disabled={isSigningUp}
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
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Naya Password (kam se kam 6 digits)"
                            disabled={isSigningUp}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-indigo-600"
                            disabled={isSigningUp}
                        >
                            {showPassword ? <IoEyeOffOutline className="h-5 w-5" /> : <IoEyeOutline className="h-5 w-5" />}
                        </button>
                    </div>
                    
                    {/* Confirm Password Input */}
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <IoLockClosedOutline className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                            id="confirm-password"
                            name="confirm-password"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="appearance-none rounded-md relative block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Password dubara dalen"
                            disabled={isSigningUp}
                        />
                    </div>

                    {/* Signup Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? 'Registering...' : 'Account Banayen'}
                        </button>
                    </div>

                </form>

                <div className="text-center text-sm">
                    <p className="text-gray-600">
                        Pehle se account hai?{' '}
                        <button 
                            onClick={() => navigate('/login')} 
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            Yahan Login Karen
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupScreen;
