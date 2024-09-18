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
import QuizPage from "./components/QuizQuestionSection";
import PastQuizzes from "./pages/PastQuizzes";

function App() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <BrowserRouter>
      {isMobile ? <MobileNav /> : <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/past-quiz" element={<PastQuizzes />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
