import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminQuizCard from "./AdminQuizCard";
import UpdateQuizPopup from "./UpdateQuizPopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DashManageQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/quiz/get-all");
      setQuizzes(response.data.quizzes);
      setFilteredQuizzes(response.data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast.error("Failed to fetch quizzes");
    }
  };

  useEffect(() => {
    const filtered = quizzes.filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filter === "all" || getQuizStatus(quiz) === filter)
    );
    setFilteredQuizzes(filtered);
  }, [searchTerm, filter, quizzes]);

  const getQuizStatus = (quiz) => {
    const now = new Date();
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);
    if (now < startDate) return "upcoming";
    if (now > endDate) return "past";
    return "ongoing";
  };

  const handleEditQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setShowUpdatePopup(true);
  };

  const handleUpdateQuiz = async (updatedQuiz) => {
    try {
      await axios.post(`/api/quiz/update/${updatedQuiz.id}`, updatedQuiz);
      toast.success("Quiz updated successfully");
      setShowUpdatePopup(false);
      fetchQuizzes();
    } catch (error) {
      console.error("Error updating quiz:", error);
      toast.error("Failed to update quiz");
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.post(`/api/quiz/delete/${quizId}`);
      toast.success('Quiz deleted successfully');
      setShowUpdatePopup(false);
      fetchQuizzes();
    } catch (error) {
      console.error('Error deleting quiz:', error);
      toast.error('Failed to delete quiz');
    }
  };

  return (
    <div className="flex justify-center min-h-[calc(88vh)] items-center bg-white py-8">
    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-[98rem] min-h-[80vh] w-full border-2">
    <h1 className="text-4xl font-bold mb-6 text-blue-600">Manage Quizzes</h1>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Search quizzes..."
          className="p-2 border rounded-md w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Quizzes</option>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="past">Past</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <AdminQuizCard
            key={quiz.id}
            quiz={quiz}
            onEdit={() => handleEditQuiz(quiz)}
          />
        ))}
      </div>

      {showUpdatePopup && (
        <UpdateQuizPopup
          quiz={selectedQuiz}
          onClose={() => setShowUpdatePopup(false)}
          onUpdate={handleUpdateQuiz}
          onDelete={handleDeleteQuiz}
        />
      )}
    </div>
    </div>
  );
};

export default DashManageQuiz;