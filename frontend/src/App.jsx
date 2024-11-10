import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import "./i18n.js";
import Dashboard from "./pages/Dashboard";
import Error404 from "./pages/Error404";
import Home from "./pages/Home";
import Login from "./pages/Login";
import QuizPage from "./pages/QuizPage.jsx";
import Results from "./pages/Results.jsx";
import SignUp from "./pages/SignUp";

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
      <div className="flex flex-col min-h-screen">
        <ToastContainer />
        <div className="fixed top-0 left-0 right-0 z-30">
          {isMobile ? <MobileNav /> : <Header />}
        </div>
        <main className="flex-grow mt-28 z-0">
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/quiz/:id" element={<QuizPage />} />
              <Route path="/result/:id" element={<Results />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
