import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import QuizQuestions from "../components/QuizQuestions";

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      const storedQuestions = localStorage.getItem(`quiz_${quizId}`);
      if (storedQuestions) {
        setQuizData(JSON.parse(storedQuestions));
        setLoading(false);
      } else {
        try {
          const response = await axios.get(`/api/quiz/get-quiz-questions/${quizId}`);
          const shuffledQuestions = shuffleQuestions(response.data.quizQuestions);
          const quizDataWithShuffledQuestions = { ...response.data, quizQuestions: shuffledQuestions };
          setQuizData(quizDataWithShuffledQuestions);
          localStorage.setItem(`quiz_${quizId}`, JSON.stringify(quizDataWithShuffledQuestions));
          setLoading(false);
        } catch (err) {
          setError("Failed to load quiz data");
          setLoading(false);
        }
      }
    };

    fetchQuizData();

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [quizId]);

  const shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  };

  const handleQuizSubmission = () => {
    localStorage.removeItem(`quiz_${quizId}`);
    navigate(`/result/${quizId}`, { replace: true });
  };

  useEffect(() => {
    const preventGoingBack = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", preventGoingBack);

    return () => {
      window.removeEventListener("popstate", preventGoingBack);
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{quizData.title}</h1>
      <QuizQuestions 
        questions={quizData.quizQuestions} 
        quizId={quizId} 
        onSubmit={handleQuizSubmission}
      />
    </div>
  );
};

export default QuizPage;
