import React from 'react';

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = () => {
    // Redirect the user to the FastAPI login endpoint
    window.location.href = 'http://localhost:8001/login';
  };

  return (
    <button onClick={handleGoogleLogin}>
      Login with Google
    </button>
  );
};

export default GoogleLoginButton;