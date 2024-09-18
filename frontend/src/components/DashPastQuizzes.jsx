import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

const DashPastQuizzes = () => {
  const { t } = useTranslation();
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Math Quiz 1', startDate: '2024-09-01', endDate: '2024-09-10', category: 'math', participants: 45, image: '/api/placeholder/300/200' },
    { id: 2, title: 'Science Quiz 1', startDate: '2024-09-05', endDate: '2024-09-15', category: 'science', participants: 38, image: '/api/placeholder/300/200' },
    { id: 3, title: 'History Quiz 1', startDate: '2024-09-10', endDate: '2024-09-20', category: 'history', participants: 52, image: '/api/placeholder/300/200' },
  ]);
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filtered = quizzes.filter(quiz => 
      (filterCategory === '' || quiz.category === filterCategory) &&
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [filterCategory, searchTerm, quizzes]);

  return (
    <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-600">{t("pastQuizzes")}</h2>
      <div className="mb-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">{t("allCategories")}</option>
            <option value="math">{t("math")}</option>
            <option value="science">{t("science")}</option>
            <option value="history">{t("history")}</option>
            <option value="literature">{t("literature")}</option>
          </select>
          <div className="relative">
            <input
              type="text"
              placeholder={t("searchQuizzes")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md p-2 pl-10"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div key={quiz.id} className="bg-white shadow rounded-lg overflow-hidden">
            <img src={quiz.image} alt={quiz.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{quiz.startDate} - {quiz.endDate}</p>
              <p className="text-sm text-gray-600 mb-2">{t("category")}: {quiz.category}</p>
              <p className="text-sm font-medium text-orange-500">
                {quiz.participants} {t("studentsParticipated", { count: quiz.participants })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashPastQuizzes;