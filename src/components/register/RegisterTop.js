import React from "react";
import Tabs from "./Tabs";

const RegisterTop = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="w-full md:hidden">
        <div className="z-20 absolute w-full">
          <img
            src="/Assets/Vector.png"
            alt="vector"
            className="w-full h-[153px]"
          />
        </div>
        <div className="z-50 relative top-5 left-10 w-full">
          <img
            src="/Assets/seagull_logo_white.png"
            alt="vector"
            className="w-32 h-14"
          />
        </div>
      </div>
      <div className="w-full hidden md:block">
        <div className="p-3 mt-4 mb-2">
          <img
            src="/Assets/seagull_logo_red.png"
            alt="logo"
            className="mx-auto w-24"
          />
        </div>
      </div>
      <div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default RegisterTop;
