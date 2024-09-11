import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa'; // For dropdown icon
import { FaHome, FaTachometerAlt } from 'react-icons/fa'; // For home and past quizzes icons

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white bg-opacity-70 backdrop-blur-md rounded-b-lg shadow-lg z-50 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-orange-600 text-2xl font-bold cursor-pointer">Quiz App</div>
        <div className="flex items-center space-x-6">
          <a href="/" className="flex items-center text-black hover:text-orange-600 transition duration-300 ease-in-out">
            <FaHome className="mr-2" /> Home
          </a>
          <a href="/past-quizzes" className="flex items-center text-black hover:text-orange-600 transition duration-300 ease-in-out">
            <FaTachometerAlt className="mr-2" /> Past Quizzes
          </a>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-black hover:text-orange-600 transition duration-300 ease-in-out"
            >
              Language
              <FaChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-2 transition-transform transform scale-95 origin-top-right">
                <ul className="list-none">
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition duration-300 ease-in-out rounded-lg">English</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition duration-300 ease-in-out rounded-lg">Gujarati</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 transition duration-300 ease-in-out rounded-lg">Hindi</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
