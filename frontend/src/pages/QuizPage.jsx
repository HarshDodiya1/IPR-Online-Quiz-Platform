import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizQuestions from "../components/QuizQuestions";

const QuizPage = () => {
  const { quizId } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await axios.get(`/api/quiz/${quizId}`);
        setQuizData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load quiz data");
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div>
      <div>
        <h1>{quizData.title}</h1>
        <QuizQuestions quizId={quizId} questions={quizData.questions} />
      </div>
    </div>
  );
};

export default QuizPage;
