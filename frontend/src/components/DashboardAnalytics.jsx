import React, { useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalParticipants: 1200,
    completionRatio: 0.85,
    averageScore: 75.5,
    quizzesByCategory: { Math: 15, Science: 20, History: 10, Literature: 5 },
    regionWiseParticipation: { North: 400, South: 300, East: 250, West: 250 },
    participationByCity: { NYC: 300, LA: 200, SF: 150, Chicago: 100 },
    participationByStd: { Std1: 100, Std2: 200, Std3: 150, Std4: 120 },
    participationTrend: { Jan: 100, Feb: 150, Mar: 200, Apr: 180, May: 250 },
    topPerformers: [
      { name: "John Doe", score: 98 },
      { name: "Jane Smith", score: 95 },
      { name: "Alice Johnson", score: 93 },
      { name: "Bob Brown", score: 91 },
      { name: "Chris Lee", score: 90 },
    ],
  });

  const chartOptions = {
    responsive: true,
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
    <div className="bg-white rounded px-6 py-4 mb-6 h-full overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-black">Quiz Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 md:mb-14 p-2">
        {[
          { title: "Quizzes by Category", chart: <Pie data={{ labels: Object.keys(analyticsData.quizzesByCategory), datasets: [{ data: Object.values(analyticsData.quizzesByCategory), backgroundColor: ["#ff7043", "#ffab91", "#ffe0b2", "#ffccbc"] }] }} options={chartOptions} /> },
          { title: "Participation Trend", chart: <Line data={{ labels: Object.keys(analyticsData.participationTrend), datasets: [{ label: "Participants", data: Object.values(analyticsData.participationTrend), borderColor: "#ff7043", backgroundColor: "rgba(255, 112, 67, 0.2)", tension: 0.1 }] }} options={chartOptions} /> },
          { title: "Region-wise Participation", chart: <Bar data={{ labels: Object.keys(analyticsData.regionWiseParticipation), datasets: [{ label: "Participants", data: Object.values(analyticsData.regionWiseParticipation), backgroundColor: "#ff7043" }] }} options={chartOptions} /> },
          { title: "Participation by City", chart: <Doughnut data={{ labels: Object.keys(analyticsData.participationByCity), datasets: [{ data: Object.values(analyticsData.participationByCity), backgroundColor: ["#ff7043", "#ffab91", "#ffe0b2", "#ffccbc"] }] }} options={chartOptions} /> },
          { title: "Participation by Std", chart: <Doughnut data={{ labels: Object.keys(analyticsData.participationByStd), datasets: [{ data: Object.values(analyticsData.participationByStd), backgroundColor: ["#ff7043", "#ffab91", "#ffe0b2", "#ffccbc"] }] }} options={chartOptions} /> },
          { title: "Top 5 Performers", chart: <Bar data={{ labels: analyticsData.topPerformers.map(performer => performer.name), datasets: [{ label: "Score", data: analyticsData.topPerformers.map(performer => performer.score), backgroundColor: "#ff7043" }] }} options={chartOptions} /> },
        ].map((item, index) => (
          <div key={index} className="h-64 md:h-80 p-5 bg-white bg-opacity-70 backdrop-blur-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:bg-opacity-80 transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-2 text-black">{item.title}</h3>
            {item.chart}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
