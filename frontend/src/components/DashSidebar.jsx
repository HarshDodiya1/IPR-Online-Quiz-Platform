import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaChevronDown, FaUser, FaUpload, FaPlusCircle, FaHistory, FaChartBar } from 'react-icons/fa';

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
        className="md:hidden fixed top-4 left-4 z-20 bg-blue-600 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`mt-28 first-line: bg-gray-100 text-gray-800 h-screen p-4 w-72 fixed left-0 top-0 z-10 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 shadow-lg`}>
        <h2 className="text-2xl font-bold mb-6 text-blue-600">IPR Quiz Dashboard</h2>
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
                    if (window.innerWidth < 768) {
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
