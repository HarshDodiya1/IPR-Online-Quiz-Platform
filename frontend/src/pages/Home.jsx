import React, { useState } from 'react';
import QuizCard from '../components/QuizCard';
import Popup from '../components/QuizPopup';

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleStart = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleStartQuiz = () => {
    setPopupVisible(false);
    // Add logic to start the quiz here
  };

  const ongoingQuizzes = [
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 1', time: '10 mins', numberOfQuestions: 10, startDate: '2024-09-01', endDate: '2024-09-10' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 2', time: '15 mins', numberOfQuestions: 15, startDate: '2024-09-02', endDate: '2024-09-11' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 3', time: '20 mins', numberOfQuestions: 20, startDate: '2024-09-03', endDate: '2024-09-12' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 4', time: '25 mins', numberOfQuestions: 25, startDate: '2024-09-04', endDate: '2024-09-13' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 1', time: '10 mins', numberOfQuestions: 10, startDate: '2024-09-01', endDate: '2024-09-10' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 2', time: '15 mins', numberOfQuestions: 15, startDate: '2024-09-02', endDate: '2024-09-11' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 3', time: '20 mins', numberOfQuestions: 20, startDate: '2024-09-03', endDate: '2024-09-12' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 4', time: '25 mins', numberOfQuestions: 25, startDate: '2024-09-04', endDate: '2024-09-13' },
    // Add more quizzes as needed
  ];

  const pastQuizzes = [
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 5', time: '30 mins', numberOfQuestions: 30, startDate: '2024-08-01', endDate: '2024-08-10' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 6', time: '35 mins', numberOfQuestions: 35, startDate: '2024-08-02', endDate: '2024-08-11' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 7', time: '40 mins', numberOfQuestions: 40, startDate: '2024-08-03', endDate: '2024-08-12' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 8', time: '45 mins', numberOfQuestions: 45, startDate: '2024-08-04', endDate: '2024-08-13' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 5', time: '30 mins', numberOfQuestions: 30, startDate: '2024-08-01', endDate: '2024-08-10' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 6', time: '35 mins', numberOfQuestions: 35, startDate: '2024-08-02', endDate: '2024-08-11' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 7', time: '40 mins', numberOfQuestions: 40, startDate: '2024-08-03', endDate: '2024-08-12' },
    { photo: 'https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', name: 'Sample Quiz 8', time: '45 mins', numberOfQuestions: 45, startDate: '2024-08-04', endDate: '2024-08-13' },
    // Add more quizzes as needed
  ];

  return (
    <div className="bg-orange-50 min-h-screen">
      <div className="container  mx-auto p-4">
        {/* Ongoing Quizzes Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 items-center text-center text-orange-600">Ongoing Quizzes</h2>
          <div className="relative">
            <div className="overflow-x-auto flex space-x-4 py-4 scrollbar-hide">
              {ongoingQuizzes.map((quiz, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <QuizCard quiz={quiz} onStart={handleStart} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past Quizzes Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Past Quizzes</h2>
          <div className="relative">
            <div className="overflow-x-auto flex space-x-4 py-4 scrollbar-hide">
              {pastQuizzes.map((quiz, index) => (
                <div key={index} className="flex-shrink-0 w-80">
                  <QuizCard quiz={quiz} onStart={handleStart} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Popup show={isPopupVisible} onClose={handleClosePopup} onStart={handleStartQuiz} />
    </div>
  );
};

export default Home;