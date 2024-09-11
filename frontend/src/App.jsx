import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/LandingPage';
// import PastQuizzes from './pages/PastQuizzes';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/past-quizzes" element={<PastQuizzes />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
