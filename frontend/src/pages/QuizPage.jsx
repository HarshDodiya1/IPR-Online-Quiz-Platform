import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [answers, setAnswers] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    document.querySelector("nav").style.display = "none";
    fetchQuizQuestions();

    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", handlePopState);

    return () => {
      clearInterval(timer);
      window.removeEventListener("popstate", handlePopState);
      document.querySelector("nav").style.display = "block";
    };
  }, []);

  const fetchQuizQuestions = async () => {
    try {
      const response = await axios.get(`/api/quiz/get-quiz-questions/${id}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setQuestions(response.data.quizQuestions);
      } else {
        toast.error("Failed to fetch quiz questions");
      }
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      toast.error("An error occurred while fetching quiz questions");
    }
  };

  const handlePopState = (event) => {
    event.preventDefault();
    const confirmExit = window.confirm(
      "If you go back, the quiz will be submitted automatically. Are you sure?"
    );
    if (confirmExit) {
      submitQuiz();
    } else {
      window.history.pushState(null, null, window.location.pathname);
    }
  };

  const handleAnswerChange = useCallback((questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  }, []);

  const submitQuiz = async () => {
    const timeTaken = 15 * 60 - timeRemaining;
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    const quizData = {
      userId: currentUser.user.id,
      quizId: id,
      timeTaken: `${minutes}:${seconds.toString().padStart(2, "0")}`,
      answers,
    };

    try {
      const response = await axios.post('/api/quiz/submit', quizData, {
        withCredentials: true,
      });
      if (response.data.success) {
        localStorage.setItem("quizResults", JSON.stringify(response.data.data));
        localStorage.setItem("submittedAnswers", JSON.stringify(answers));
        localStorage.setItem("quizQuestions", JSON.stringify(questions));
        navigate(`/result/${id}`, { replace: true });
      } else {
        toast.error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz");
    }
  };

  const getFormattedTime = useCallback(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [timeRemaining]);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-200 p-4 sm:p-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="fixed top-4 right-4 bg-white p-5 rounded-lg shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xl font-semibold text-orange-600">
          Time Left:
        </span>
        <div className="text-2xl font-bold text-red-600">
          {getFormattedTime()}
        </div>
      </motion.div>

      <h1 className="text-4xl font-bold text-center text-purple-700 mb-12 animate-pulse">
        Quiz Time!
      </h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {questions.map((question, index) => (
          <motion.div 
            key={question.id} 
            className="bg-white p-8 rounded-xl shadow-xl border border-purple-200 relative overflow-hidden"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-500 w-2 h-full"></div>
            <h2 className="text-2xl font-bold text-purple-800 mb-4 relative z-10">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-lg font-semibold mr-2">
                {index + 1}
              </span>
              {question.question}
            </h2>
            {question.imageLink && (
              <img src={question.imageLink} alt="Question" className="w-full h-[30rem] object-cover rounded-lg shadow-md mb-4" />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {question.options.map((option, optionIndex) => (
                <motion.button
                  key={`${question.id}-${optionIndex}`}
                  className={`flex items-center p-4 border-2 border-purple-300 rounded-lg transition-all duration-300 ease-in-out ${
                    answers[question.id] === option
                      ? "bg-purple-100 border-purple-500"
                      : "bg-white hover:bg-purple-50"
                  }`}
                  onClick={() => handleAnswerChange(question.id, option)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="font-bold text-lg text-orange-600 mr-3">
                    {optionLabels[optionIndex]}
                  </span>
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 sm:mt-12 text-center">
        <motion.button
          onClick={() => setShowConfirmation(true)}
          className="px-8 py-4 bg-orange-500 text-white text-xl font-bold rounded-full hover:bg-orange-600 transition duration-300 ease-in-out shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Submit Quiz
        </motion.button>
      </div>

      {showConfirmation && (
        <motion.div 
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div 
            className="bg-white p-10 rounded-lg shadow-lg text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-purple-700">
              Are you sure you want to submit the quiz?
            </h3>
            <div className="space-x-6">
              <motion.button
                className="px-6 py-3 bg-orange-500 text-white text-lg rounded-full hover:bg-orange-600 transition"
                onClick={submitQuiz}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Yes, Submit
              </motion.button>
              <motion.button
                className="px-6 py-3 bg-gray-300 text-lg rounded-full hover:bg-gray-400 transition"
                onClick={() => setShowConfirmation(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default QuizPage;
