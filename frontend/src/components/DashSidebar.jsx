import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaUser,
  FaUpload,
  FaPlusCircle,
  FaHistory,
  FaChartBar,
  FaBars,
  FaSignOutAlt,
  FaTasks,
} from "react-icons/fa";
import { signInSuccess } from "../slices/userSlice";
import { toast } from "react-toastify";

const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    } else {
      navigate("/dashboard?tab=profile");
    }
  }, [location.search, navigate]);

  const studentSidebarItems = [
    {
      name: "Profile",
      param: "profile",
      icon: <FaUser />,
      component: "DashProfile",
    },
    {
      name: "Past Quizzes",
      param: "past-quizzes",
      icon: <FaHistory />,
      component: "DashPastQuizzes",
    },
  ];

  const adminSidebarItems = [
    {
      name: "Profile",
      param: "profile",
      icon: <FaUser />,
      component: "DashProfile",
    },
    {
      name: "Upload Excel",
      param: "upload-excel",
      icon: <FaUpload />,
      component: "DashUploadExcel",
    },
    {
      name: "Create Quiz",
      param: "create-quiz",
      icon: <FaPlusCircle />,
      component: "DashCreateQuiz",
    },
    {
      name: "Manage Quiz",
      param: "manage-quiz",
      icon: <FaTasks />,
      component: "DashManageQuiz",
    },
    {
      name: "Analytics",
      param: "analytics",
      icon: <FaChartBar />,
      component: "DashboardAnalytics",
    },
  ];

  const sidebarItems = currentUser?.user.isAdmin
    ? adminSidebarItems
    : studentSidebarItems;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSignout = async () => {
    try {
      const response = await fetch("/api/user/signout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        dispatch(signInSuccess(null));
        navigate("/");
        toast.success("Signed out successfully");
      } else {
        toast.error("Signout failed");
      }
    } catch (error) {
      toast.error("Error during signout");
    }
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-20 bg-blue-600 text-white p-2 rounded-md lg:hidden"
        onClick={toggleSidebar}
      >
        <FaBars />
      </button>
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-100 text-gray-800 w-64 p-4 z-10 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 shadow-lg overflow-y-auto`}
      >
        <h2 className="text-2xl font-bold mb-6 text-blue-600 mt-16 lg:mt-28">
          IPR Quiz Dashboard
        </h2>
        <nav className="flex flex-col justify-between h-[calc(100%-8rem)]">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.param}>
                <Link
                  to={`/dashboard?tab=${item.param}`}
                  className={`flex items-center py-2 px-4 rounded transition duration-200 ${
                    tab === item.param
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => {
                    setTab(item.param);
                    if (window.innerWidth < 1024) {
                      setIsOpen(false);
                    }
                  }}
                >
                  <span
                    className={`mr-3 ${
                      tab === item.param ? "text-white" : "text-blue-600"
                    }`}
                  >
                    {item.icon}
                  </span>
                  {item.name}
                  {item.param === "profile" && (
                    <span
                      className={`ml-auto px-1 py-1 text-xs font-semibold rounded-md ${
                        currentUser?.user.isAdmin
                          ? "bg-yellow-300 text-black"
                          : "bg-green-300 text-green-900"
                      }`}
                    >
                      {currentUser?.user.isAdmin ? "Admin" : "Student"}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSignout}
            className="flex items-center py-2 px-4 rounded transition duration-200 text-gray-700 hover:bg-red-100 mt-auto"
          >
            <span className="mr-3 text-red-600">
              <FaSignOutAlt />
            </span>
            Sign Out
          </button>
        </nav>
      </div>
    </>
  );
};

export default DashSidebar;
