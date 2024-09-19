import React, { useState, useEffect } from "react";
import QuizCard from "../components/QuizCard";
import QuizPopup from "../components/QuizPopup";
import axios from "axios";

const Home = () => {
  const [ongoingQuizzes, setOngoingQuizzes] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [pastQuizzes, setPastQuizzes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

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
    const upcoming = [];
    const past = [];

    quizzes.forEach((quiz) => {
      const startDate = new Date(quiz.startDate);
      const endDate = new Date(quiz.endDate);
      if (now >= startDate && now <= endDate) {
        ongoing.push(quiz);
      } else if (now < startDate) {
        upcoming.push(quiz);
      } else {
        past.push(quiz);
      }
    });

    setOngoingQuizzes(ongoing);
    setUpcomingQuizzes(upcoming);
    setPastQuizzes(past);
  };
  const handleStartQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    setShowPopup(true);
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
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                onStart={() => handleStartQuiz(quiz.id)}
              />
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
              <QuizCard key={quiz.id} quiz={quiz} />
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
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>
        </section>
      </div>

      <QuizPopup
        show={showPopup}
        onClose={() => setShowPopup(false)}
        quizId={selectedQuizId}
      />
    </div>
  );
};

export default Home;
