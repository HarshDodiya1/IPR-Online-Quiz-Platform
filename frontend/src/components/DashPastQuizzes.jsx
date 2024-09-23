import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaClock, FaCalendarAlt, FaPercent, FaTrophy } from "react-icons/fa";

const DashPastQuizzes = () => {
  const [pastQuizzes, setPastQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPastQuizzes = async () => {
      try {
        const response = await axios.get("/api/user/past-quizzes", {
          withCredentials: true,
        });
        setPastQuizzes(response.data.pastQuizzes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching past quizzes:", error);
        setLoading(false);
      }
    };

    fetchPastQuizzes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center min-h-[calc(88vh)] items-center bg-white p-8">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-[98rem] min-h-[80vh] w-full border-2">
        <h2 className="text-4xl font-semibold mb-8 text-blue-600">
          Past Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Quiz Name: {quiz.quizName}
              </h3>
              <div className="flex flex-wrap mb-3">
                {quiz.categories.map((category, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 mb-2 px-2.5 py-0.5 rounded"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <FaPercent className="mr-2 text-purple-500" />
                  Result: {quiz.percentage.toFixed(2)}%
                </p>
                <p className="flex items-center">
                  <FaCalendarAlt className="mr-2 text-green-500" />
                  Submitted: {new Date(quiz.submittedAt).toLocaleDateString()}
                </p>
                <p className="flex items-center">
                  <FaClock className="mr-2 text-red-500" />
                  Time Taken: {quiz.timeTaken}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashPastQuizzes;
