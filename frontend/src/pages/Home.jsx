import React, { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard";
import Popup from "../components/QuizPopup";
import axios from "axios";

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
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

  const categorizeQuizzes = (quizzes) => {
    const now = new Date();
    const ongoing = [];
    const past = [];

    quizzes.forEach(quiz => {
      const endDate = new Date(quiz.endDate);
      if (endDate < now) {
        past.push(quiz);
      } else {
        ongoing.push(quiz);
      }
    });

    setOngoingQuizzes(ongoing);
    setPastQuizzes(past);
  };

  const handleStart = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleStartQuiz = () => {
    setPopupVisible(false);
    // Add logic to start the quiz here
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
