import React from "react";
import login from "../../assets/login.png";
import Logo from "/Logo.jpg";

const AuthLeftSide = () => {
  return (
    <div className="hidden lg:flex flex-col w-1/2 bg-[#FAF8F5] min-h-screen">
      <div className="flex items-center p-4">
        <img src={Logo} alt="Logo" className="w-20 h-18 m-0" />
        <span className="ml-2 text-2xl font-bold">
          Institute of <br /> Plasma Research
        </span>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <img src={login} alt="Feature image" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default AuthLeftSide;
