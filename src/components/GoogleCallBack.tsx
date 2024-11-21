import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleGoogleCallback = async () => {
      const queryParams = new URLSearchParams(location.search);
      const code = queryParams.get('code');

      if (code) {
        try {
          const response = await fetch('http://localhost:8001/auth/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code })
          });
          const data = await response.json() as { accessToken: string; refreshToken: string };

          console.log('Tokens received:', data);
            navigate('/landing'); // Redirect to landing after successful login
        } catch (error) {
          console.error('Error handling Google callback:', error);
        }
      }
    };

    handleGoogleCallback();
  }, [location, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;