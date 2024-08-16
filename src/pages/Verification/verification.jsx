import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Verification = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');

      if (token) {
        try {
            const response = await fetch('http://localhost:3001/user/verify', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token }),
              });

          if (response.ok) {
            // If the verification is successful, navigate to the home page
            navigate('/login');
          } else {
            // Handle error response
            console.error('Verification failed');
            // Optionally, navigate to an error page or show an error message
            navigate('/error');
          }
        } catch (error) {
          console.error('Error during verification:', error);
          // Optionally, navigate to an error page or show an error message
          navigate('/error');
        }
      } else {
        // Handle missing token case
        console.error('No token provided');
        navigate('/error');
      }
    };

    verifyUser();
  }, [navigate]);

  return <div>Verifying...</div>;
};

export default Verification;
