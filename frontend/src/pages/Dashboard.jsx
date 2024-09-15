import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashUploadExcel from "../components/DashUploadExcel";
import DashCreateQuiz from "../components/DashCreateQuiz";
import DashPastQuizzes from "../components/DashPastQuizzes";
import DashboardAnalytics from "../components/DashboardAnalytics";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      console.log("Tab from URL", tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === "profile" && <DashProfile />}
      {/* upload-excel... */}
      {tab === "upload-excel" && <DashUploadExcel />}
      {/* create-quiz*/}
      {tab === "create-quiz" && <DashCreateQuiz />}
      {/* past-quizzes by students  */}
      {tab === "past-quizzes" && <DashPastQuizzes />}
      {/* analyitics */}
      {tab === "analyitics" && <DashboardAnalytics />}
      
    </div>
  );
};

export default Dashboard;
