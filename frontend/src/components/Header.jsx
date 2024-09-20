import { FaChevronDown, FaUser } from "react-icons/fa";
import Logo from "/Logo.jpg";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { signInSuccess } from "../slices/userSlice";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  console.log("This is the current user:", currentUser);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
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
      } else {
        console.error("Signout failed");
      }
    } catch (error) {
      console.error("Error during signout:", error);
    }
    setShowSignoutModal(false);
  };

  return (
    <nav className="bg-white bg-opacity-70 backdrop-blur-md rounded-b-lg shadow-lg z-50 p-4 sticky top-0">
      <div className="container mx-auto max-w-screen px-4 sm:px-6 lg:px-8 grid grid-cols-8">
        <Link
          to={"/"}
          className="flex justify-start items-center space-x-4 col-span-3"
        >
          <div className="h-20 w-20">
            <img src={Logo} alt="IPR Logo" />
          </div>
          <div>
            <div className="text-orange-600 text-2xl font-bold cursor-pointer">
              {t("institute")}
            </div>
            <div className="text-gray-600 text-lg font-regular">
              {t("instituteHindi")}
            </div>
          </div>
        </Link>
        <div className="col-span-2 flex justify-center items-center">
          <div className="text-3xl font-extrabold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
              {t("quizMaster")}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-6 col-span-3">
          <Link
            to={"/past-quiz"}
            className="flex items-center text-black hover:text-orange-600 transition duration-300 ease-in-out "
          >
            {t("pastQuizzes")}
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center text-black hover:text-orange-600 transition duration-300 ease-in-out"
            >
              {t("language")}
              <FaChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-2 transition-transform transform scale-95 origin-top-right">
                <ul className="list-none">
                  <li>
                    <button
                      onClick={() => changeLanguage("en")}
                      className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100 transition duration-300 ease-in-out rounded-lg ${
                        i18n.language === "en" ? "bg-orange-200" : ""
                      }`}
                    >
                      English
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeLanguage("gu")}
                      className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100 transition duration-300 ease-in-out rounded-lg ${
                        i18n.language === "gu" ? "bg-orange-200" : ""
                      }`}
                    >
                      ગુજરાતી
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeLanguage("hi")}
                      className={`block w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100 transition duration-300 ease-in-out rounded-lg ${
                        i18n.language === "hi" ? "bg-orange-200" : ""
                      }`}
                    >
                      हिंदी
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {currentUser ? (
            <div className="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center h-12 w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <FaUser className="mr-2" />
                  Hello, {currentUser.user.firstName}
                  <FaChevronDown className="-mr-1 h-5 w-5 text-gray-400" />
                </button>
              </div>
              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div
                    className="py-1"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <Link
                      to={"/dashboard"}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {t("accountSettings")}
                    </Link>
                    <button
                      onClick={() => setShowSignoutModal(true)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                      role="menuitem"
                    >
                      {t("signOut")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/sign-up"}>
              <Button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out">
                Sign Up
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Signout Confirmation Modal */}
      <Modal show={showSignoutModal} onClose={() => setShowSignoutModal(false)}>
        <Modal.Header>Confirm Signout</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out?
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-orange-500" onClick={handleSignout}>
            Yes, Sign Out
          </Button>
          <Button
            className="bg-slate-500"
            onClick={() => setShowSignoutModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default Header;
