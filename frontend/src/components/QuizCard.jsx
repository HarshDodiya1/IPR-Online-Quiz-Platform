import React from "react";
import {
  FaClock,
  FaQuestionCircle,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

const QuizCard = ({ quiz, onStart }) => {
  return (
    <div className="bg-white bg-opacity-60 backdrop-blur-md shadow-lg rounded-lg p-4 mb-4 transition-transform transform hover:scale-105 duration-300 ease-in-out border border-orange-200">
      <img
        src={quiz.imageLink}
        alt={quiz.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2 text-orange-700 flex items-center">
        <FaQuestionCircle className="mr-2 text-yellow-500" />
        {quiz.title}
      </h3>
      <p className="text-gray-600 mb-2">{quiz.description}</p>
      <div className="flex flex-wrap text-gray-600 mb-2">
        {quiz.categories.map((category, index) => (
          <span key={index} className="flex items-center mr-2 mb-1">
            <FaTag className="mr-1 text-blue-500" />
            {category}
          </span>
        ))}
      </div>
      <p className="text-gray-600 mb-2">
        <FaQuestionCircle className="mr-1 inline text-green-500" />
        {quiz.isBasic ? "Basic" : "Advanced"}
      </p>
      <div className="text-gray-500 mb-2">
        <p className="flex items-center">
          <FaCalendarAlt className="mr-1 text-red-500" />
          Start: {new Date(quiz.startDate).toLocaleDateString()}
        </p>
        <p className="flex items-center">
          <FaCalendarAlt className="mr-1 text-purple-500" />
          End: {new Date(quiz.endDate).toLocaleDateString()}
        </p>
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
