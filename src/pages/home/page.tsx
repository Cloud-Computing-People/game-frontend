import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import MainContent from './landing';

const HomePage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a saved authentication token in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      // Check for token in the URL
      const queryParams = new URLSearchParams(location.search);
      const urlToken = queryParams.get('token');
      if (urlToken) {
        // Store the token and set as authenticated
        localStorage.setItem('authToken', urlToken);
        setIsAuthenticated(true);

        // Optionally, remove the token from the URL
        window.history.replaceState({}, document.title, '/');
      } else {
        // Navigate to login page if not authenticated
        navigate('/login');
      }
    }
  }, [location, navigate]);

  const handleLogout = async () => {
    try {
        // Call the backend logout endpoint (GET request)
        const response = await fetch('http://localhost:8001/logout', {
            method: 'GET',
            credentials: 'include', // Include cookies if needed for session handling
        });

        if (response.ok) {
            // Clear tokens and navigate to login after successful logout
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            navigate('/login');
        } else {
            console.error('Failed to log out on backend');
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <MainContent />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Welcome! Please log in to continue.</h2>
          <GoogleLoginButton />
        </div>
      )}
    </div>
  );
};

export default HomePage;