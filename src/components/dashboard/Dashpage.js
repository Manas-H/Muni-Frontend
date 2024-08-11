import React, { useState } from "react";
import Sidebar from "./SideBar";
import Header from "../Header/Header";
import Dashworkflow from "./Dashworkflow";

const Dashpage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div
        className={`bg-gray-200 h-full flex-1 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Header />
        <Dashworkflow />
      </div>
    </div>
  );
};

export default Dashpage;
