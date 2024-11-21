import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy Google login button component
const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect the user to the FastAPI login endpoint
    window.location.href = 'http://localhost:8001/login';
  };

    return (
        <button 
            onClick={handleGoogleLogin} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
        >
            Login with Google
        </button>
    );
};

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if a token is present; if so, redirect to home
        const token = localStorage.getItem('authToken');
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="p-6 max-w-sm mx-auto bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Welcome Back!</h2>
                <p className="text-center mb-4">Please log in to continue</p>
                <GoogleLoginButton />
            </div>
        </div>
    );
};

export default LoginPage;
