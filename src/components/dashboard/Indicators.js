import React from "react";

const Indicators = () => {
  return (
    <div>
      <div className="flex flex-col border bg-white mx-4 rounded-md">
        <div className="border-b w-[96%] mx-auto py-4 px-5">
          <h1 className="float-left text-[#495057] text-[16px]">
            Key Performance Indicators
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 my-4">
          <div className="flex m-6">
            <div className="flex items-center mt-3 px-3">
              <i className="border bg-[#0a294f] rounded-full p-2 text-xs fa-solid fa-user-check text-white"></i>
            </div>
            <div className="flex flex-col  items-start">
              <h2 className="text-gray-400 text-lg font-normal">
                Applied OffCampus Job
              </h2>
              <p className="text-[#495047] text-xl font-bold">0</p>
            </div>
          </div>

          <div className="flex m-6">
            <div className="flex items-center mt-3 px-3">
              <i className="border bg-[#0a294f] rounded-full p-2 fa-solid fa-file-circle-check text-white text-xs"></i>
            </div>
            <div className="flex flex-col  items-start">
              <h2 className="text-gray-400  text-base">
                Application Completion Rate
              </h2>
              <p className="text-[#495047] text-xl font-bold">0%</p>
            </div>
          </div>

          <div className="flex m-6">
            <div className="flex items-center mt-3 px-3">
              <i className="border bg-[#0a294f] rounded-full p-2 text-xs fa-solid fa-user-plus text-white"></i>
            </div>
            <div className="flex flex-col  items-start">
              <h2 className="text-gray-400  text-base">Selection Rate</h2>
              <p className="text-[#495047] text-xl font-bold">0%</p>
            </div>
          </div>

          <div className="flex m-6">
            <div className="flex items-center mt-3 px-3">
              <i className="border bg-[#0a294f] rounded-full p-2 text-xs fa-solid fa-user-check text-white"></i>
            </div>
            <div className="flex flex-col  items-start">
              <h2 className="text-gray-400  text-base">Candidate Assessed</h2>
              <p className="text-[#495047] text-xl font-bold">0</p>
            </div>
          </div>

          <div className="flex m-6">
            <div className="flex items-center mt-3 px-3">
              <i className="border bg-[#0a294f] rounded-full p-2 text-xs fa-solid fa-square-check text-white"></i>
            </div>
            <div className="flex flex-col  items-start">
              <h2 className="text-gray-400 text-base">Offer Acceptance Rate</h2>
              <p className="text-[#495047] text-xl font-bold">0%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col border bg-white mx-4 rounded-lg mt-6 mb-20 md:w-[50%] h-96">
        <div className="flex justify-start">
        <h2 className="mx-5 my-3 text-gray-700 text-xl">Selected Candidates</h2>
        </div>
      </div>
    </div>
  );
};

export default Indicators;
