import { useTranslation } from "react-i18next";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import QuizPage from "./pages/QuizPage.jsx";
import Results from "./pages/Results.jsx";
import PastQuizzes from "./pages/PastQuizzes";
import { AboutUs } from "./pages/AboutUs.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      {isMobile ? <MobileNav /> : <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz/:quizId" element={<QuizPage />} />
        <Route path="/result/:quizId" element={<Results />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </BrowserRouter>
  );
}

export default App;
