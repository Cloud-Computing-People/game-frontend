import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '../../components/link';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is authenticated
        const token = localStorage.getItem('authToken');
        if (!token) {
            // Redirect to login if not authenticated
            navigate('/login');
        }
    }, [navigate]);

    // Logout function to clear token and navigate to login
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3">
                <div>
                    <h1 className="text-xl font-bold">The Microservice Game</h1>
                </div>
                <div className="text-sm">
                    Created by <span className="text-red-500">the CCP</span>{" "}
                    <span className="text-sm text-muted-foreground">
                        (cloud computing people)
                    </span>
                </div>
                <div className="flex justify-between py-3 px-6 bg-slate-100">
                    <Link to={`game`}>Play</Link>
                    <Link to={`shop`}>Shop</Link>
                    <Link to={`profile`}>Customize</Link>
                </div>
                <div className="mt-4">
                    <button 
                        onClick={handleLogout} 
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
