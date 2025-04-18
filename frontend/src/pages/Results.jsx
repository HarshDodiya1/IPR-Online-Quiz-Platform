import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axiosConfig.jsx";

const Results = () => {
  const { t } = useTranslation("resultsQuiz");
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const userEmail = user.currentUser.user.email;

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedResults = localStorage.getItem("quizResults");
    const storedAnswers = localStorage.getItem("submittedAnswers");
    const storedQuestions = localStorage.getItem("quizQuestions");

    if (storedResults && storedAnswers && storedQuestions) {
      setResults(JSON.parse(storedResults));
      setSubmittedAnswers(JSON.parse(storedAnswers));
      setQuestions(JSON.parse(storedQuestions));

      const end = Date.now() + 3 * 1000;
      const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

      const frame = () => {
        if (Date.now() > end) return;

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          startVelocity: 60,
          origin: { x: 0, y: 0.5 },
          colors: colors,
        });

        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          startVelocity: 60,
          origin: { x: 1, y: 0.5 },
          colors: colors,
        });

        requestAnimationFrame(frame);
      };

      frame();
    } else {
      navigate("/");
    }
  }, [navigate]);

  window.history.pushState(null, null, window.location.pathname);
  window.addEventListener("popstate", () => {
    window.history.pushState(null, null, window.location.pathname);
  });

  const sendCertificateEmail = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/quiz/generate-certificate", {
        studentName: results.userName,
        quizName: results.quizName,
        percentage: results.scorePercentage,
        email: userEmail,
      });
      if (response.data.message) {
        setIsEmailSent(true);
        toast.success("Certificate sent successfully!");
      }
    } catch (error) {
      toast.error("Failed to send certificate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!results || !questions.length) return <div>Loading...</div>;

  const tableData = [
    { label: t("userName"), value: results.userName },
    { label: t("quizName"), value: results.quizName },
    { label: t("skippedQuestions"), value: results.skippedQuestions },
    { label: t("incorrectAnswers"), value: results.incorrectAnswers },
    { label: t("correctAnswers"), value: results.correctAnswers },
    { label: t("scorePercentage"), value: `${results.scorePercentage}%` },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 relative"
    >
      <h1 className="text-3xl font-bold mb-8 text-center">
        {t("quizResults")}
      </h1>

      <motion.table
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full mb-0 bg-white shadow-md rounded-lg overflow-hidden"
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
      <div className="flex flex-col items-start gap-2">
        {!isEmailSent && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-blue-600 font-medium ml-4 mt-4"
          >
            {t("Click below to receive your certificate via email!")}
          </motion.p>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-2 ${
            isEmailSent
              ? "bg-green-500 hover:bg-green-700"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded mr-4`}
          onClick={sendCertificateEmail}
          disabled={isEmailSent || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t("sendCertificate")}
            </span>
          ) : isEmailSent ? (
            t("certificateSent")
          ) : (
            t("sendCertificate")
          )}
        </motion.button>

        {isEmailSent && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 font-medium ml-4"
          >
            {t("Check your email and download your certificate!")}
          </motion.p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 bg-green-500 mb-8 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/", { replace: true })}
      >
        {t("goHome")}
      </motion.button>

      <h2 className="text-2xl font-bold mb-4">{t("detailedResults")}</h2>
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
            <h3 className="font-semibold mb-2">
              {t("question")} {index + 1}: {question.question}
            </h3>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {question.options.map((option, optIndex) => (
                <div
                  key={optIndex}
                  className={`p-2 rounded ${
                    option === correctAnswer
                      ? "bg-green-200 border-green-500 border"
                      : option === submittedAnswer && !isCorrect
                      ? "bg-red-200 border-red-500 border"
                      : "bg-gray-100"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
            <p className="mb-1">
              {t("yourAnswer")}:
              <span
                className={
                  isSkipped
                    ? "text-yellow-600"
                    : isCorrect
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {isSkipped ? ` ${t("skipped")}` : ` ${submittedAnswer}`}
              </span>
            </p>
            <p className="text-green-600">
              {t("correctAnswer")}: {correctAnswer}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Results;
