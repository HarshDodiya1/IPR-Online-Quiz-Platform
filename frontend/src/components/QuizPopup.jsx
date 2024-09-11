import React from 'react';
import { Transition } from '@headlessui/react';
import { FaRegCheckCircle, FaTimes } from 'react-icons/fa';

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
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-lg p-6 w-1/2 transition-transform transform scale-90 duration-300 ease-in-out">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <FaRegCheckCircle className="mr-2 text-green-500" />Rules
          </h2>
          <p className="mb-4">Here are the rules for the quiz...</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out flex items-center"
            >
              <FaTimes className="mr-2 text-gray-600" />Close
            </button>
            <button
              onClick={onStart}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
            >
              <FaRegCheckCircle className="mr-2 text-white" />Start
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Popup;
