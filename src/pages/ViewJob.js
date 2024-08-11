import React, { useState } from "react";
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/Header/Header";
import Jobs from "../components/jobs/viewjob/Jobs";

const ViewJob = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} className="fixed"/>
      <div
        className={`bg-gray-50 h-full flex-1 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Header />
        <Jobs />
      </div>
    </div>
  );
};

export default ViewJob;
