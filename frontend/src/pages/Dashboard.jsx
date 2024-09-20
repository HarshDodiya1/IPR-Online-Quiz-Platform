import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashSidebar from "../components/DashSidebar";
import DashUploadExcel from "../components/DashUploadExcel";
import DashCreateQuiz from "../components/DashCreateQuiz";
import DashPastQuizzes from "../components/DashPastQuizzes";
import DashboardAnalytics from "../components/DashboardAnalytics";
import DashProfile from "../components/DashProfile";
import DashManageQuiz from "../components/DashManageQuiz";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      navigate("/dashboard?tab=profile");
    }

    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.search, navigate]);

  return (
    <div className="flex min-h-screen">
      <DashSidebar />
      <div className={`flex-1 md:ml-72 transition-all duration-300 ${scrollPosition > 100 ? 'mt-0' : 'mt-[2rem]'}`}>
        {tab === "profile" && <DashProfile />}
        {currentUser?.user.isAdmin && tab === "upload-excel" && <DashUploadExcel />}
        {currentUser?.user.isAdmin && tab === "create-quiz" && <DashCreateQuiz />}
        {currentUser?.user.isAdmin && tab === "manage-quiz" && <DashManageQuiz />}
        {!currentUser?.user.isAdmin && tab === "past-quizzes" && <DashPastQuizzes />}
        {currentUser?.user.isAdmin && tab === "analytics" && <DashboardAnalytics />}
      </div>
    </div>
  );
};

export default Dashboard;
