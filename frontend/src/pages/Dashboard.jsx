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
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }

    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.search]);

  return (
    <div className="flex min-h-screen">
      <DashSidebar />
      <div className={`flex-1 md:ml-72 transition-all duration-300 ${scrollPosition > 100 ? 'mt-0' : 'mt-28'}`}>
        {tab === "profile" && <DashProfile />}
        {tab === "upload-excel" && <DashUploadExcel />}
        {tab === "create-quiz" && <DashCreateQuiz />}
        {tab === "past-quizzes" && <DashPastQuizzes />}
        {tab === "analyitics" && <DashboardAnalytics />}
      </div>
    </div>
  );
};

export default Dashboard;
