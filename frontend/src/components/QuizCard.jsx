import React from 'react';
import { FaClock, FaQuestionCircle, FaCalendarAlt } from 'react-icons/fa';

const QuizCard = ({ quiz, onStart }) => {
  return (
    <div className="bg-white bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg p-4 mb-4 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-orange-200">
      <img src={quiz.photo} alt={quiz.name} className="w-full h-40 object-cover rounded-lg mb-4" />
      <h3 className="text-lg font-semibold mb-2 text-orange-700 flex items-center">
        <FaQuestionCircle className="mr-2 text-yellow-500" />{quiz.name}
      </h3>
      <div className="flex justify-between text-gray-600 mb-2">
        <p className="flex items-center"><FaClock className="mr-1 text-blue-500" />{quiz.time}</p>
        <p className="flex items-center"><FaQuestionCircle className="mr-1 text-green-500" />{quiz.numberOfQuestions}</p>
      </div>
      <div className="text-gray-500 mb-2">
        <p className="flex items-center"><FaCalendarAlt className="mr-1 text-red-500" />Start Date: {quiz.startDate}</p>
        <p className="flex items-center"><FaCalendarAlt className="mr-1 text-purple-500" />End Date: {quiz.endDate}</p>
      </div>
      <button 
        onClick={onStart}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out"
      >
        Start
      </button>
    </div>
  );
};

export default QuizCard;
