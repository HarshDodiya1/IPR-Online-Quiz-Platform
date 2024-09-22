import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAnalytics = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get("/api/quiz/get-all");
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const handleQuizSelect = async (quizId) => {
    setSelectedQuiz(quizId);
    try {
      const response = await axios.get(`/api/analytics/dashboard/${quizId}`);
      setAnalyticsData(response.data.data);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  const handleExportExcel = async () => {
    if (!selectedQuiz) return;
    try {
      const response = await axios.get(`/api/analytics/export/${selectedQuiz}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `quiz_results_${selectedQuiz}.xlsx`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error exporting to Excel:", error);
    }
  };

  const chartOptions = {    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 20,
          boxHeight: 15,
          color: "#000",
          font: { size: 12, family: "Arial" },
        },
      },
    },
    layout: {
      padding: { top: 10, bottom: 10 },
    },
    scales: {
      x: {
        grid: { color: "#ccc" },
        ticks: { color: "#000" },
      },
      y: {
        grid: { color: "#ccc" },
        ticks: { color: "#000" },
      },
    },
  };

  return (
    <div className="bg-white rounded px-4 sm:px-6 py-4 mb-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-black">Quiz Analytics Dashboard</h2>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <input
          type="text"
          placeholder="Search quizzes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={selectedQuiz || ""}
          onChange={(e) => handleQuizSelect(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a quiz</option>
          {quizzes
            .filter((quiz) => quiz.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
        </select>
        <button
          onClick={handleExportExcel}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Export as Excel
        </button>
      </div>

      {analyticsData && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              { title: "Total Participants", value: analyticsData.totalParticipants },
              { title: "Completion Ratio", value: (analyticsData.completionRatio * 100).toFixed(2) + "%" },
              { title: "Average Score", value: analyticsData.averageScore + "%" },
            ].map((card, index) => (
              <div key={index} className="bg-white bg-opacity-70 backdrop-blur-lg p-3 rounded-lg text-black shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-opacity-80 transform hover:scale-105">
                <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="h-64 sm:h-80 p-5 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-opacity-80 transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 text-black">Participation by Standard</h3>
              <Bar 
                data={{
                  labels: Object.keys(analyticsData.participationByStd),
                  datasets: [{
                    label: "Participants",
                    data: Object.values(analyticsData.participationByStd),
                    backgroundColor: "#ff7043"
                  }]
                }} 
                options={chartOptions} 
              />
            </div>
            <div className="h-64 sm:h-80 p-5 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-opacity-80 transform hover:scale-105">
              <h3 className="text-lg font-semibold mb-2 text-black">Participation by City</h3>
              <Doughnut 
                data={{
                  labels: Object.keys(analyticsData.participationByCity),
                  datasets: [{
                    data: Object.values(analyticsData.participationByCity),
                    backgroundColor: ["#ff7043", "#ffab91", "#ffe0b2", "#ffccbc", "#fbe9e7"]
                  }]
                }} 
                options={chartOptions} 
              />
            </div>
          </div>

          <div className="bg-white bg-opacity-70 backdrop-blur-lg p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-opacity-80">
            <h3 className="text-lg font-semibold mb-4 text-black">Top 5 Performing Students</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">City</th>
                    <th scope="col" className="px-6 py-3">Standard</th>
                    <th scope="col" className="px-6 py-3">Time Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsData.topPerformers.map((performer, index) => (
                    <tr key={index} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{performer.name}</td>
                      <td className="px-6 py-4">{performer.city}</td>
                      <td className="px-6 py-4">{performer.std}</td>
                      <td className="px-6 py-4">{performer.timeTaken}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardAnalytics;
