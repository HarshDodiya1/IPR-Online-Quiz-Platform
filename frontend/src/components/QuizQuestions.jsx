import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const QuizQuestions = ({ questions, quizId, onSubmit }) => {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem(`answers_${quizId}`);
    return savedAnswers
      ? JSON.parse(savedAnswers)
      : new Array(questions.length).fill(null);
  });
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem(`timer_${quizId}`);
    return savedTimer ? parseInt(savedTimer) : 600;
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const optionLabels = ["A", "B", "C", "D"];

  useEffect(() => {
    if (submitted || timer <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => {
        const newTimer = prev - 1;
        localStorage.setItem(`timer_${quizId}`, newTimer.toString());
        if (newTimer <= 0) {
          handleSubmitQuiz();
          return 0;
        }
        return newTimer;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, submitted, quizId]);

  useEffect(() => {
    localStorage.setItem(`answers_${quizId}`, JSON.stringify(answers));
  }, [answers, quizId]);

  const handleSubmitQuiz = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  const submitQuizToBackend = useCallback(async () => {
    const quizResults = questions.map((question, index) => ({
      questionId: question.id,
      selectedAnswer: answers[index],
    }));

    try {
      // const response = await axios.post(`/api/quiz-result/${quizId}`, {
      //   quizResults,
      // }, {
      //   headers: {
      //     'X-Quiz-Token': sessionStorage.getItem('quizToken')
      //   }
      // });
      const response = {
        data: {
          success: true,
          message: "Quiz submitted successfully!",
        },
      };

      if (response.data.success) {
        toast.success("Quiz submitted successfully!");
        localStorage.removeItem(`answers_${quizId}`);
        localStorage.removeItem(`timer_${quizId}`);
        onSubmit();
      } else {
        toast.error("Failed to submit quiz. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("An error occurred while submitting the quiz.");
    }
  }, [answers, quizId, onSubmit, questions]);

  const confirmSubmission = useCallback(async () => {
    setShowConfirmation(false);
    setSubmitted(true);
    await submitQuizToBackend();
  }, [submitQuizToBackend]);

  const handleSelectAnswer = useCallback(
    (index, answer) => {
      if (!submitted) {
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[index] = answer;
          return updatedAnswers;
        });
      }
    },
    [submitted]
  );

  const getFormattedTime = useCallback(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [timer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        toast.warning("Please do not leave the quiz page!");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="min-h-screen mt-28 bg-[#fffaf7] p-4 sm:p-8 relative">
      {!submitted && (
        <div className="fixed top-40 right-4 bg-white p-5 rounded-lg shadow-lg">
          <span className="text-xl font-semibold text-orange-600">
            Time Left:
          </span>
          <div className="text-2xl font-bold text-red-600">
            {getFormattedTime()}
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center text-gray-700 mb-12">
        Quiz Platform
      </h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {questions.map((question, index) => (
          <QuestionBlock
            key={question.id || `question-${index}`}
            question={question}
            index={index}
            selectedAnswer={answers[index]}
            optionLabels={optionLabels}
            onSelectAnswer={handleSelectAnswer}
            submitted={submitted}
          />
        ))}
      </div>

      {!submitted && (
        <div className="mt-8 sm:mt-12 text-center">
          <button
            className="px-6 py-3 sm:px-8 sm:py-4 bg-orange-500 text-white text-lg sm:text-xl rounded-lg hover:bg-orange-600 transition duration-200 ease-in-out shadow-md"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      )}

      {showConfirmation && (
        <ConfirmationModal
          onConfirm={confirmSubmission}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};
const QuestionBlock = ({
  question,
  index,
  selectedAnswer,
  optionLabels,
  onSelectAnswer,
  submitted,
}) => (
  <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200 relative ">
    <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-500 w-2 h-full rounded-br-lg"></div>
    <h2 className="text-2xl font-bold text-gray-800 mb-4 relative z-10">
      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-lg font-semibold mr-2">
        {index + 1}
      </span>
      {question.question}
    </h2>
    {question.image && (
      <img
        src={question.image}
        alt="Question Illustration"
        className="w-full h-60 object-cover rounded-lg shadow-md mb-4"
      />
    )}
    <div className="grid grid-cols-2 gap-4">
      {question.options.map((option, optIndex) => (
        <button
          key={`${index}-${optIndex}-${option}`}
          className={`flex items-center p-4 border border-gray-300 rounded-lg transition-transform duration-300 ease-in-out ${
            selectedAnswer === option
              ? "bg-orange-100 border-orange-500"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => onSelectAnswer(index, option)}
          disabled={submitted}
        >
          <span className="font-bold text-lg text-orange-600 mr-3">
            {optionLabels[optIndex]}
          </span>
          {option}
        </button>
      ))}
    </div>
  </div>
);

const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
    <div className="bg-white p-10 rounded-lg shadow-lg text-center">
      <h3 className="text-3xl font-semibold mb-6">
        Are you sure you want to submit the quiz?
      </h3>
      <div className="space-x-6">
        <button
          className="px-6 py-3 bg-red-500 text-white text-lg rounded-lg hover:bg-red-600 transition"
          onClick={onConfirm}
        >
          Yes, Submit
        </button>
        <button
          className="px-6 py-3 bg-gray-300 text-lg rounded-lg hover:bg-gray-400 transition"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

export default QuizQuestions;
