import React, { useState, useEffect } from 'react';

const quizQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
    correctAnswer: 'Paris',
    image: 'https://img.freepik.com/free-photo/eiffel-tower-paris-with-gorgeous-colors-autumn_268835-828.jpg',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0sfBghhyvJ0mC6ONbnM7wi1o_H484LZ9PA&s',
  },
  {
    question: 'Who wrote "Hamlet"?',
    options: ['Shakespeare', 'Chaucer', 'Milton', 'Austen'],
    correctAnswer: 'Shakespeare',
    image: null,
  },
];

const optionLabels = ['A', 'B', 'C', 'D'];

const QuizPage = () => {
  const [answers, setAnswers] = useState(new Array(quizQuestions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timer, setTimer] = useState(1200);
  const [reviewMode, setReviewMode] = useState(false);

  useEffect(() => {
    if (timer <= 0 && !submitted) {
      handleSubmitQuiz();
    }

    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer, submitted]);

  const cancelSubmission = () => {
    setShowConfirmation(false);
  };

  const handleSubmitQuiz = () => {
    setShowConfirmation(true);
  };

  const confirmSubmission = () => {
    setShowConfirmation(false);
    setSubmitted(true);
    setShowResults(true);

    setTimeout(() => {
      setShowCelebration(true);
    }, 2000);
  };

  const handleSelectAnswer = (index, answer) => {
    if (!submitted) {
      const updatedAnswers = [...answers];
      updatedAnswers[index] = answer;
      setAnswers(updatedAnswers);
    }
  };

  const getFormattedTime = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculateResult = (question, answer) => {
    return answer === question.correctAnswer;
  };

  const calculateScore = () => {
    return quizQuestions.reduce((score, question, index) => (
      calculateResult(question, answers[index]) ? score + 1 : score
    ), 0);
  };

  const score = calculateScore();

  return (
    <div className="min-h-screen pt-16 sm:pt-20 md:pt-28 bg-[#fffaf7] px-4 sm:px-6 md:px-8 pb-8 relative">
      <div className="fixed top-20 sm:top-24 md:top-40 right-4 bg-white p-3 sm:p-4 rounded-lg shadow-lg">
        <span className="text-sm sm:text-base md:text-xl font-semibold text-orange-600">Time Left:</span>
        <div className="text-lg sm:text-xl md:text-2xl font-bold text-red-600">{getFormattedTime()}</div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-700 mb-6 sm:mb-8 md:mb-12">Quiz Platform</h1>

      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {submitted && !reviewMode && (
          <div className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl font-bold text-green-600">
            Your Score: {score} / {quizQuestions.length}
          </div>
        )}
        {quizQuestions.map((question, index) => (
          <div
            key={index}
            className={`bg-${submitted || reviewMode ? (
              answers[index] === question.correctAnswer ? 'green-100' : 'red-100'
            ) : 'white'} p-4 sm:p-6 rounded-xl shadow-xl border border-gray-200 relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 bg-gradient-to-r from-orange-500 to-yellow-500 w-2 h-full rounded-br-lg"></div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 relative z-10">
              <span className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-sm sm:text-base font-semibold mr-2">
                {index + 1}
              </span>
              {question.question}
            </h2>
            {question.image && (
              <img
                src={question.image}
                alt="Question Illustration"
                className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-lg shadow-md mb-3 sm:mb-4"
              />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {question.options.map((option, optIndex) => (
                <button
                  key={option}
                  className={`flex items-center p-3 sm:p-4 border border-gray-300 rounded-lg transition-transform duration-300 ease-in-out ${
                    submitted || reviewMode ? (
                      calculateResult(question, option)
                        ? 'bg-green-200 border-green-500'
                        : (answers[index] === option
                          ? 'bg-red-300 border-red-500'
                          : 'bg-gray-100')
                    ) : (answers[index] === option ? 'bg-orange-100 border-orange-500' : 'bg-gray-100 hover:bg-gray-200')
                  }`}
                  onClick={() => handleSelectAnswer(index, option)}
                  disabled={submitted || reviewMode}
                >
                  <span className="font-bold text-sm sm:text-base text-orange-600 mr-2 sm:mr-3">{optionLabels[optIndex]}</span>
                  <span className="text-sm sm:text-base">{option}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!submitted && (
        <div className="mt-8 sm:mt-10 text-center">
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white text-base sm:text-lg rounded-lg hover:bg-orange-600 transition duration-200 ease-in-out shadow-md"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg text-center">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Are you sure you want to submit the quiz?</h3>
            <div className="space-x-4">
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white text-sm sm:text-base rounded-lg hover:bg-red-600 transition"
                onClick={confirmSubmission}
              >
                Yes, Submit
              </button>
              <button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-300 text-sm sm:text-base rounded-lg hover:bg-gray-400 transition"
                onClick={cancelSubmission}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {submitted && showResults && (
        <div className="text-center mt-8 sm:mt-10 space-x-4">
          <button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 text-white text-base sm:text-lg rounded-lg hover:bg-orange-600 transition duration-200 ease-in-out shadow-md"
            onClick={() => {}}
          >
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
