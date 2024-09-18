import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaUser } from "react-icons/fa";
import Logo from "/Logo.jpg";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess } from "../slices/userSlice";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false);
    setIsOpen(false);
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
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img className="h-8 w-8" src={Logo} alt="Logo" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("home")}
                </Link>
                <Link
                  to="/past-quizzes"
                  className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("pastQuizzes")}
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center text-gray-800 hover:text-orange-500"
                >
                  {t("language")}
                  <FaChevronDown
                    className={`ml-1 transition-transform ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                {dropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    {["en", "gu", "hi"].map((lang) => (
                      <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                      >
                        {lang === "en"
                          ? "English"
                          : lang === "gu"
                          ? "ગુજરાતી"
                          : "हिंदी"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {currentUser ? (
                <div className="ml-3 relative">
                  <button
                    onClick={() => setShowSignoutModal(true)}
                    className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {t("signOut")}
                  </button>
                </div>
              ) : (
                <Link
                  to="/sign-up"
                  className="text-gray-800 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t("signUp")}
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              {t("home")}
            </Link>
            <Link
              to="/past-quizzes"
              className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              {t("pastQuizzes")}
            </Link>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium w-full text-left"
            >
              {t("language")}
            </button>
            {dropdownOpen && (
              <div className="pl-4">
                {["en", "gu", "hi"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => changeLanguage(lang)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-orange-500 w-full text-left"
                  >
                    {lang === "en"
                      ? "English"
                      : lang === "gu"
                      ? "ગુજરાતી"
                      : "हिंदी"}
                  </button>
                ))}
              </div>
            )}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-orange-500"
                >
                  <FaUser className="mr-2" />
                  Hello, {currentUser.user.firstName}
                  <FaChevronDown className="ml-auto" />
                </button>
                {dropdownOpen && (
                  <div className="pl-4">
                    <Link
                      to="/dashboard"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-orange-500"
                    >
                      {t("accountSettings")}
                    </Link>
                    <button
                      onClick={() => setShowSignoutModal(true)}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-orange-500"
                    >
                      {t("signOut")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/sign-up"
                className="text-gray-800 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                {t("signUp")}
              </Link>
            )}
          </div>
        </div>
      )}

      <Modal show={showSignoutModal} onClose={() => setShowSignoutModal(false)}>
        <Modal.Header>{t("confirmSignout")}</Modal.Header>
        <Modal.Body>
          <p className="text-base leading-relaxed text-gray-500">
            {t("signoutConfirmMessage")}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSignout}>{t("yesSignOut")}</Button>
          <Button color="gray" onClick={() => setShowSignoutModal(false)}>
            {t("cancel")}
          </Button>
        </Modal.Footer>
      </Modal>
    </nav>
  );
};

export default MobileNav;
