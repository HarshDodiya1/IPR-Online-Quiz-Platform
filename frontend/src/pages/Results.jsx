import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Results = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch results using quizId
    // Update the results state
  }, [quizId]);
  
  useEffect(() => {
    const handleBackButton = () => {
      if (location.state?.redirectToHome) {
        navigate('/', { replace: true });
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => window.removeEventListener('popstate', handleBackButton);
  }, [location, navigate]);
  

  if (!results) return <div>Loading results...</div>;

  return (
    <div>
      <h1>Quiz Results</h1>
      {/* Display the results */}
    </div>
  );
};

export default Results;