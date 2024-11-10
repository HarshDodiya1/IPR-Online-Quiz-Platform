import { Transition } from "@headlessui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Popup = ({ show, onClose, quizId }) => {
  const { t } = useTranslation("home");

  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-6 w-full max-w-md sm:max-w-lg md:max-w-xl m-4">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaRegCheckCircle className="mr-2 text-green-500" />
            {t("rules")}
          </h2>
          <ul className="list-disc list-inside mb-4 text-base">
            <li>{t("quizRules.time")}</li>
            <li>{t("quizRules.questions")}</li>
            <li>{t("quizRules.options")}</li>
            <li>{t("quizRules.skip")}</li>
            <li>{t("quizRules.results")}</li>
          </ul>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaTimes className="mr-2 text-gray-600" />
              {t("close")}
            </button>
            <button
              onClick={handleStart}
              className="w-full bg-orange-500 sm:w-auto text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaRegCheckCircle className="mr-2 text-white" />
              {t("start")}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Popup;
