import React from "react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-14 gap-3 md:ml-1 ">
      <Link>
        <div className="flex items-center border bg-white md:w-48 lg:w-60 h-16 cursor-pointer rounded-lg m-3 shadow-lg">
          <div className="flex items-center px-3">
            <i className=" fa fa-solid fa-suitcase border-2 border-[rgb(10,41,79)] rounded-xl p-2 text-[#0a294f]"></i>
          </div>
          <div className="flex flex-col  items-start">
            <h1 className="text-[10px] font-semibold text-[#8c8c8c]">
              Post Job
            </h1>
            <h2 className="text-[10px] text-[#6f6f79]">Add Job Requirement</h2>
          </div>
        </div>
      </Link>

      <Link>
        <div className="flex items-center border bg-white md:w-60 h-16 cursor-pointer rounded-lg m-3 shadow-lg">
          <div className="flex items-center px-3">
            <i className=" fa fa-solid fa-id-badge border-2 border-[#0a294f] rounded-xl p-2 text-[#0a294f]"></i>
          </div>
          <div className="flex flex-col  items-start">
            <h1 className="text-[10px] font-semibold text-[#8c8c8c]">
              Post Job
            </h1>
            <h2 className="text-[10px] text-[#6f6f79]">Add Job Requirement</h2>
          </div>
        </div>
      </Link>

      <Link>
        <div className="flex items-center border bg-white md:w-60 h-16 cursor-pointer rounded-lg m-3 shadow-lg">
          <div className="flex items-center px-3">
            <i className=" fa fa-solid fa-chart-column border-2 border-[#0a294f] rounded-xl p-2 text-[#0a294f]"></i>
          </div>
          <div className="flex flex-col  items-start">
            <h1 className="text-[10px] font-semibold text-[#8c8c8c]">
              Post Job
            </h1>
            <h2 className="text-[10px] text-[#6f6f79]">Add Job Requirement</h2>
          </div>
        </div>
      </Link>

      <Link>
        <div className="flex items-center border bg-white md:w-56 h-16 cursor-pointer rounded-lg m-3 shadow-lg">
          <div className="flex items-center px-3">
            <i className=" fa fa-solid fa-user border-2 border-[#0a294f] rounded-xl p-2 text-[#0a294f]"></i>
          </div>
          <div className="flex flex-col  items-start">
            <h1 className="text-[10px] font-semibold text-[#8c8c8c]">
              Post Job
            </h1>
            <h2 className="text-[10px] text-[#6f6f79]">Add Job Requirement</h2>
          </div>
        </div>
      </Link>

      <Link>
        <div className="flex items-center border bg-white md:w-60 h-16 cursor-pointer rounded-lg m-3 shadow-lg">
          <div className="flex items-center px-3">
            <i className=" fa fa-solid fa-chalkboard border-2 border-[#0a294f] rounded-xl p-2 text-[#0a294f]"></i>
          </div>
          <div className="flex flex-col  items-start">
            <h1 className="text-[10px] font-semibold text-[#8c8c8c]">
              Post Job
            </h1>
            <h2 className="text-[10px] text-[#6f6f79]">Add Job Requirement</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
