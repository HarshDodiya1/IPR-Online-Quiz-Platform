import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const DashboardAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalQuizzes: 0,
    totalParticipants: 0,
    averageScore: 0,
    quizzesByCategory: {},
    participationTrend: {},
    topPerformingQuizzes: [],
  });

  useEffect(() => {
    // Fetch analytics data from your API
    const mockData = {
      totalQuizzes: 50,
      totalParticipants: 1200,
      averageScore: 75.5,
      quizzesByCategory: { Math: 15, Science: 20, History: 10, Literature: 5 },
      participationTrend: { 'Jan': 100, 'Feb': 150, 'Mar': 200, 'Apr': 180, 'May': 250 },
      topPerformingQuizzes: [
        { name: 'Advanced Math', score: 85 },
        { name: 'World History', score: 82 },
        { name: 'Physics 101', score: 79 },
      ],
    };
    setAnalyticsData(mockData);
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-6 py-4 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Quiz Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Total Quizzes</h3>
          <p className="text-2xl font-bold">{analyticsData.totalQuizzes}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Total Participants</h3>
          <p className="text-2xl font-bold">{analyticsData.totalParticipants}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg">
          <h3 className="text-lg font-semibold mb-1">Average Score</h3>
          <p className="text-2xl font-bold">{analyticsData.averageScore}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <h3 className="text-lg font-semibold mb-2">Quizzes by Category</h3>
          <Pie 
            data={{
              labels: Object.keys(analyticsData.quizzesByCategory),
              datasets: [{
                data: Object.values(analyticsData.quizzesByCategory),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              }],
            }} 
            options={chartOptions}
          />
        </div>
        <div className="h-64">
          <h3 className="text-lg font-semibold mb-2">Participation Trend</h3>
          <Line 
            data={{
              labels: Object.keys(analyticsData.participationTrend),
              datasets: [{
                label: 'Participants',
                data: Object.values(analyticsData.participationTrend),
                borderColor: '#36A2EB',
                tension: 0.1,
              }],
            }} 
            options={chartOptions}
          />
        </div>
      </div>

      <div className="mt-6 h-64">
        <h3 className="text-lg font-semibold mb-2">Top Performing Quizzes</h3>
        <Bar 
          data={{
            labels: analyticsData.topPerformingQuizzes.map(quiz => quiz.name),
            datasets: [{
              label: 'Average Score',
              data: analyticsData.topPerformingQuizzes.map(quiz => quiz.score),
              backgroundColor: '#4BC0C0',
            }],
          }} 
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default DashboardAnalytics;