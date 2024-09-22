import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Results = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (!quizCompleted) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Quiz Results</h1>
      {/* Display quiz results here */}
    </div>
  );
};

export default Results;
