import React from "react";
import { Transition } from "@headlessui/react";
import { FaRegCheckCircle, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Popup = ({ show, onClose, onStart }) => {
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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-4 sm:p-6 w-full max-w-md sm:max-w-lg md:max-w-xl transition-transform transform scale-90 duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 flex items-center">
            <FaRegCheckCircle className="mr-2 text-green-500" />
            Rules
          </h2>
          <p className="mb-4 text-sm sm:text-base">
            Here are the rules for the quiz...
          </p>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out flex items-center justify-center"
            >
              <FaTimes className="mr-2 text-gray-600" />
              Close
            </button>
            <Link to={"/quiz"} className="w-full sm:w-auto">
              <button
                onClick={onStart}
                className="w-full bg-orange-500  sm:w-auto  text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center justify-center"
              >
                <FaRegCheckCircle className="mr-2 text-white" />
                Start
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Popup;
