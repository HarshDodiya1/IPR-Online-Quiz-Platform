import { useTranslation } from "react-i18next";
import "./App.css";
import LanguageSelector from "./components/LanguageSelector";
import React from "react";
import AdminLanding from "./pages/Adminlanding";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminUploadExcel from "./pages/AdminUploadExcel";
import CreateQuiz from "./pages/CreateQuiz";

function App() {
  const { t } = useTranslation();
  const { part1, part2 } = t("description");
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<AdminLanding />} />
          <Route path="/admin/upload-excel" element={<AdminUploadExcel />} />
          <Route path="/admin/create-quiz" element={<CreateQuiz />} />

          <></>
        </Routes>
      </Router>    
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
    </>
  );
}

export default App;
