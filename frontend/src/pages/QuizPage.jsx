import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const QuizPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [answers, setAnswers] = useState({});
  const { currentUser } = useSelector((state) => state.user);

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

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

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

    console.log("Quiz submission data:", quizData);

    try {
      // const response = await axios.post('/api/quiz/submit', quizData, {
      //   withCredentials: true,
      // });
      const response = {
        data: {
          success: true,
          message: "Quiz submitted successfully!",
        },
      };
      if (response.data.success) {
        localStorage.setItem("quizCompleted", "true");
        navigate(`/result/${id}`, { replace: true });
      } else {
        toast.error("Failed to submit quiz");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="sticky top-0 right-0 bg-white p-4 shadow-md">
        Time Remaining: {Math.floor(timeRemaining / 60)}:
        {(timeRemaining % 60).toString().padStart(2, "0")}
      </div>
      <h1 className="text-3xl font-bold mb-8">Quiz</h1>
      {questions.map((question, index) => (
        <div key={question.id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Question {index + 1}: {question.question}
          </h2>
          {question.imageLink && (
            <img src={question.imageLink} alt="Question" className="mb-4" />
          )}
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="mb-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  onChange={() => handleAnswerChange(question.id, option)}
                  className="mr-2"
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button
        onClick={submitQuiz}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizPage;
