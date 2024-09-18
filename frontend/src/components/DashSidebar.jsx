import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaChevronDown, FaUser, FaUpload, FaPlusCircle, FaHistory, FaChartBar, FaBars } from 'react-icons/fa';

const DashSidebar = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const sidebarItems = [
    { name: 'Profile', param: 'profile', icon: <FaUser /> },
    { name: 'Upload Excel', param: 'upload-excel', icon: <FaUpload /> },
    { name: 'Create Quiz', param: 'create-quiz', icon: <FaPlusCircle /> },
    { name: 'Past Quizzes', param: 'past-quizzes', icon: <FaHistory /> },
    { name: 'Analytics', param: 'analyitics', icon: <FaChartBar /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 bg-blue-600 text-white p-2 rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <div className={`fixed top-0 left-0 h-screen bg-gray-100 text-gray-800 w-64 p-4 z-10 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 shadow-lg overflow-y-auto`}>
        <h2 className="text-2xl font-bold mb-6 text-blue-600 mt-16 lg:mt-28">IPR Quiz Dashboard</h2>
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.param}>
                <Link
                  to={`/dashboard?tab=${item.param}`}
                  className={`flex items-center py-2 px-4 rounded transition duration-200 ${
                    tab === item.param ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-100'
                  }`}
                  onClick={() => {
                    setTab(item.param);
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <span className={`mr-3 ${tab === item.param ? 'text-white' : 'text-blue-600'}`}>{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DashSidebar;
