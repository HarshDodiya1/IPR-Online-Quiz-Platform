import React from 'react';
import QuizCard from './QuizCard';

const QuizSection = ({ title, quizzes }) => {
  return (
    <section className="my-12">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-wide transition-all duration-300 ease-in-out hover:text-blue-600">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-8 lg:px-12">
        {quizzes.map((quiz) => (
          <QuizCard key={quiz.id} title={quiz.title} image={quiz.image} time={quiz.time} />
        ))}
      </div>
    </section>
  );
};

export default QuizSection;