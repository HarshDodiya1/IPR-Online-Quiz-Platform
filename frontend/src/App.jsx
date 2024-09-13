import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSelector from "./components/LanguageSelector";
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Error404 from "./pages/Error404";
import Dashboard from "./pages/Dashboard";

function App() {
  const { t } = useTranslation();
  const { part1, part2 } = t("description");
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      {/* <div className="flex flex-col items-center justify-center h-screen gap-10">
              
              <div className="text-xl">
                <LanguageSelector />
              </div>
              <div className="font-bold text-4xl">{t("greetings")}</div>
              <div className="text-lg text-center">
                {part1}
                <br />
                {part2}
              </div>
            </div> */}
    </BrowserRouter>
  );
}

export default App;
