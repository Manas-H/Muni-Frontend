import React, { useState } from "react";
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/Header/Header";
import PostJobForm from "../components/jobs/PostJobForm";

const PostJob = () => {
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
        <PostJobForm />
      </div>
    </div>
  );
};

export default PostJob;
