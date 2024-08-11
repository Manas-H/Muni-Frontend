import React from "react";

const Tabs = ({ activeTab, setActiveTab }) => {
  const images = {
    1: "/Assets/Student-card.png",
    2: "/Assets/Employers-card.png",
    3: "/Assets/Universities-card.png",
  };

  return (
    <div className="container flex justify-center md:block mt-36 md:ml-24 md:mt-14">
      <div className="flex flex-col md:flex-row w-[80%]  mb-10">
        <button
          className={`py-4 px-10 ml-1 rounded-md text-md font-semibold ${
            activeTab === 1 ? "bg-[#0a294f] text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Students
        </button>
        <button
          className={`py-4 px-8 ml-1 my-2 md:my-0 rounded-md ${
            activeTab === 2 ? "bg-[#0a294f] text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Employers
        </button>
        <button
          className={`py-4 px-8 ml-1 rounded-md ${
            activeTab === 3 ? "bg-[#0a294f] text-white" : "bg-white"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Universities
        </button>
      </div>
      <div className="hidden md:block">
        <img
          src={images[activeTab]}
          alt={`Tab ${activeTab}`}
          className="w-[500px] mb-4"
        />
      </div>
    </div>
  );
};

export default Tabs;
