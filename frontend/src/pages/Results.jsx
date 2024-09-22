import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedResults = localStorage.getItem('quizResults');
    const storedAnswers = localStorage.getItem('submittedAnswers');
    const storedQuestions = localStorage.getItem('quizQuestions');

    if (storedResults && storedAnswers && storedQuestions) {
      setResults(JSON.parse(storedResults));
      setSubmittedAnswers(JSON.parse(storedAnswers));
      setQuestions(JSON.parse(storedQuestions));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!results || !questions.length) return <div>Loading...</div>;

  const tableData = [
    { label: 'User Name', value: results.userName },
    { label: 'Quiz Name', value: results.quizName },
    { label: 'Skipped Questions', value: results.skippedQuestions },
    { label: 'Incorrect Answers', value: results.incorrectAnswers },
    { label: 'Correct Answers', value: results.correctAnswers },
    { label: 'Score Percentage', value: `${results.scorePercentage}%` },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">Quiz Results</h1>
      
      <motion.table 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-8 bg-white shadow-md rounded-lg overflow-hidden"
      >
        <tbody>
          {tableData.map(({ label, value }) => (
            <tr key={label} className="border-b">
              <td className="py-2 px-4 font-semibold">{label}</td>
              <td className="py-2 px-4">{value}</td>
            </tr>
          ))}
        </tbody>
      </motion.table>

      <h2 className="text-2xl font-bold mb-4">Detailed Results</h2>
      {questions.map((question, index) => {
        const correctAnswer = results.correctAnswersList[question.id];
        const submittedAnswer = submittedAnswers[question.id];
        const isSkipped = !submittedAnswer;
        const isCorrect = submittedAnswer === correctAnswer;

        return (
          <motion.div 
            key={question.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="mb-6 p-4 bg-white shadow-md rounded-lg"
          >
            <h3 className="font-semibold mb-2">Question {index + 1}: {question.question}</h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {question.options.map((option, optIndex) => (
                <div 
                  key={optIndex} 
                  className={`p-2 rounded ${
                    option === correctAnswer 
                      ? 'bg-green-100 border-green-500 border' 
                      : option === submittedAnswer && !isCorrect
                      ? 'bg-red-100 border-red-500 border'
                      : 'bg-gray-100'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            <p className="mb-1">
              Your Answer: 
              <span className={
                isSkipped ? 'text-yellow-600' : (isCorrect ? 'text-green-600' : 'text-red-600')
              }>
                {isSkipped ? ' Skipped' : ` ${submittedAnswer}`}
              </span>
            </p>
            <p className="text-green-600">Correct Answer: {correctAnswer}</p>
          </motion.div>
        );
      })}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {/* Implement certificate download logic */}}
      >
        Download Certificate
      </motion.button>
    </motion.div>
  );
};

export default Results;
