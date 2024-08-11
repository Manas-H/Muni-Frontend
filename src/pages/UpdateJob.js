import React, { useState } from "react";
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/Header/Header";
import UpdateJobForm from "../components/jobs/UpdateJobFrom";

const UpdateJob = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="w-full">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div
        className={`bg-gray-200 h-full flex-1 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Header />
        <UpdateJobForm />
      </div>
    </div>
  );
};

export default UpdateJob;
