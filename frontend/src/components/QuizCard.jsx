import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaLanguage, FaQuestionCircle, FaTag } from "react-icons/fa";

const QuizCard = ({ quiz, isLoggedIn, onStart }) => {
  const { t } = useTranslation("home");
  const currentDate = new Date();
  const startDate = new Date(quiz.startDate);
  const endDate = new Date(quiz.endDate);

  const isOngoing = currentDate >= startDate && currentDate <= endDate;
  const isUpcoming = currentDate < startDate;

  const getDaysRemaining = (targetDate) => {
    const timeDiff = targetDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getBadgeContent = () => {
    if (isOngoing) {
      return t("daysLeft", { count: getDaysRemaining(endDate) });
    } else if (isUpcoming) {
      return t("startsIn", { count: getDaysRemaining(startDate) });
    } else {
      return t("closed");
    }
  };

  const getBadgeColor = () => {
    if (isOngoing) return "bg-green-500";
    if (isUpcoming) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-2xl overflow-hidden relative"
      whileHover={{
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div
        className={`absolute top-4 right-4 ${getBadgeColor()} text-white text-lg font-bold px-4 py-2 rounded-full z-10 shadow-lg`}
      >
        {getBadgeContent()}
      </div>
      <img
        src={quiz.imageLink}
        alt={quiz.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-purple-700">
          {quiz.title}
        </h3>
        <p className="text-gray-600 mb-4 text-lg">{quiz.description}</p>
        <div className="flex items-start mb-4">
          <FaTag className="mr-2  text-blue-500" size={20} />
          <span className="font-semibold  mr-2">{t("categories")}</span>
          <div className="flex flex-wrap gap-2">
            {quiz.categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        <p className="text-gray-700 mb-2 flex items-center text-lg">
          <FaQuestionCircle className="mr-2 text-green-500" size={20} />
          <span className="font-semibold mr-2">{t("level")}</span>
          {quiz.isBasic ? t("basic") : t("advanced")}
        </p>
        <p className="text-gray-700 mb-4 flex items-center text-lg">
          <FaLanguage className="mr-2 text-blue-500" size={20} />
          <span className="font-semibold mr-2">{t("language")}</span>
          {quiz.language}
        </p>
        {isOngoing && (
          <motion.button
            onClick={() => onStart(quiz.id)}
            className="mt-4 bg-purple-600 text-white text-xl font-bold px-6 py-3 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out w-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("startQuizNow")}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default QuizCard;
