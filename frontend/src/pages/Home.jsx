import React, { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard";
import Popup from "../components/QuizPopup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [pastQuizzes, setPastQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/quiz/get-all");
      categorizeQuizzes(response.data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };
  const navigate = useNavigate();

  const handleStartQuiz = (quizId) => {
    setPopupVisible(false);
    navigate(`/quiz/${quizId}`);
  };

  const categorizeQuizzes = (quizzes) => {
    const now = new Date();
    const ongoing = [];
    const upcoming = [];
    const past = [];

    quizzes.forEach((quiz) => {
      const startDate = new Date(quiz.startDate);
      const endDate = new Date(quiz.endDate);
      if (endDate < now) {
        past.push(quiz);
      } else if (startDate > now) {
        upcoming.push(quiz);
      } else {
        ongoing.push(quiz);
      }
    });

    setOngoingQuizzes(ongoing);
    setUpcomingQuizzes(upcoming);
    setPastQuizzes(past);
  };

  const handleStart = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="bg-orange-50 min-h-screen">
      <div className="container mx-auto p-4">
        {/* Ongoing Quizzes Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
            Ongoing Quizzes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ongoingQuizzes.map((quiz) => (
              <div key={quiz.id}>
                <QuizCard quiz={quiz} onStart={() => handleStart(quiz.id)} />
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Quizzes Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
            Upcoming Quizzes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingQuizzes.map((quiz) => (
              <div key={quiz.id}>
                <QuizCard quiz={quiz} onStart={handleStart} />
              </div>
            ))}
          </div>
        </section>

        {/* Past Quizzes Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">
            Past Quizzes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pastQuizzes.map((quiz) => (
              <div key={quiz.id}>
                <QuizCard quiz={quiz} onStart={handleStart} />
              </div>
            ))}
          </div>
        </section>
      </div>
      <Popup
        show={isPopupVisible}
        onClose={handleClosePopup}
        onStart={handleStartQuiz}
      />
    </div>
  );
};

export default Home;
