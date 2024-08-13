import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const jobRelatedRoutes = [
  "/jobs/postjobs",
  "/jobs/viewjobs",
  "/jobs/view-application",
];
const Sidebar = ({ isOpen, toggleMenu }) => {
  const location = useLocation();
  const [isDropDownOpen, setIssDropDownOpen] = useState(false);
  const [isjobOpen, setJobOpen] = useState(false);
  const [interviewOpen, setInterviewOpen] = useState(false);

  const isJobRoute = jobRelatedRoutes.includes(location.pathname);

  const activeTab = location.pathname;

  const toggleDropDown = () => {
    setIssDropDownOpen(!isDropDownOpen);
  };

  const toggleJobDropdown = () => {
    setJobOpen(!isjobOpen);
  };

  const toggleInterviewDropdown = () => {
    setInterviewOpen(!interviewOpen);
  };

  return (
    <aside
      className={`bg-[#0A294F] md:fixed md:min-h-full md:max-h-full md:h-full ${
        isOpen ? "md:w-64" : "md:w-20"
      }`}
    >
      <nav className="flex flex-col">
        {/* this is desktop n logo and button */}
        <div className="hidden md:block">
          {" "}
          <div className="flex items-center justify-between w-full md:mx-0">
            {isOpen ? (
              <div className="border-b-[0.5px] text-white text-xl float-none text-left capitalize p-0 py-4 flex md:justify-center items-center relative border-white  w-full z-20">
                <Link to="/dashboard">
                  <img
                    src="/Assets/logo_small.png"
                    width="70"
                    alt="Logo"
                    className="ml-10 md:ml-0"
                  />
                </Link>
              </div>
            ) : (
              <div className="border-b-[0.5px] text-white text-xl float-none text-left capitalize p-0 py-[21.5px] flex justify-center items-center relative border-white  w-full z-20">
                <Link to="/dashboard">M</Link>
              </div>
            )}

            {isOpen ? (
              <div className="bg-[#1C4980] rounded-full absolute left-[235px] top-3 z-50 hidden md:block">
                <button
                  className=" py-1.5 px-2.5 flex justify-center text-white rounded-full focus:outline-none"
                  onClick={toggleMenu}
                >
                  <i className="text-white text-xl fa-solid fa-circle-chevron-left"></i>
                </button>
              </div>
            ) : (
              <div className="bg-[#1C4980] rounded-full absolute left-14 top-3 z-50 hidden md:block">
                <button
                  className=" py-1.5 px-2.5 flex justify-center text-white rounded-full focus:outline-none"
                  onClick={toggleMenu}
                >
                  <i className="text-white text-xl fa-solid fa-hand-point-right"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block">
          <div className={`md:block flex ${isOpen ? "block" : "hidden"}`}>
            <ul className="flex flex-col w-full">
              <input
                type="hidden"
                name="username"
                id="username"
                value="hoboh70017@digdy.com"
              />
              <input
                type="hidden"
                name="password"
                id="password"
                value="Test_12345#"
              />
              <li
                className={`my-1 mx-2 rounded-md ${
                  activeTab === "/dashboard" ? "bg-[#4784ce]" : ""
                }`}
              >
                <Link
                  to="/dashboard"
                  className={`nav-link text-white flex items-center p-3`}
                >
                  <i className="fa fa-dashboard pr-4 pl-3"></i>
                  {isOpen && <span className="font-semibold">Dashboard</span>}
                </Link>
              </li>
              <li className="relative transition py-1.5">
                <button
                  className="nav-link text-white flex items-center px-4 pt-3 pb-2 md:pb-2 w-full text-left"
                  onClick={toggleJobDropdown}
                >
                  <i className="fa fa-university pr-4 pl-4"></i>
                  {isOpen && <span>Jobs</span>}
                  {isOpen && <i className="fa fa-caret-down pl-2"></i>}
                </button>
                {(isjobOpen || isJobRoute) && (
                  <ul className="pl-6 md:pl-3 duration-400 transition-all duration-300 py-1">
                    <li
                      className={`my-1 mr-2  py-2 rounded-md  ${
                        isOpen ? "pl-7" : "pl-5"
                      } ${
                        activeTab === "/jobs/postjobs" ? "bg-[#4784ce]" : ""
                      }`}
                    >
                      <Link
                        to="/jobs/postjobs"
                        // className="nav-link text-white flex items-center"
                        className={`nav-link text-white flex items-center `}
                      >
                        <i className="fa fa-suitcase pr-3 text-sm"></i>
                        {isOpen && <span className="text-sm">Post Job</span>}
                      </Link>
                    </li>
                    <li
                      className={`my-1 mr-2  py-2 rounded-md  ${
                        isOpen ? "pl-7" : "pl-5"
                      } ${
                        activeTab === "/jobs/viewjobs" ? "bg-[#4784ce]" : ""
                      }`}
                    >
                      <Link
                        to="/jobs/viewjobs"
                        className="nav-link text-white flex items-center"
                      >
                        <i className="fa fa-suitcase pr-3 text-sm"></i>
                        {isOpen && <span className="text-sm">View Jobs</span>}
                      </Link>
                    </li>
                    <li
                      className={`my-1 mr-2  py-2 rounded-md  ${
                        isOpen ? "pl-7" : "pl-5"
                      } ${
                        activeTab === "/jobs/view-application"
                          ? "bg-[#4784ce]"
                          : ""
                      }`}
                    >
                      <Link
                        to="/jobs/view-application"
                        className="nav-link text-white flex items-center"
                      >
                        <i className="fa fa-bar-chart pr-3 text-sm"></i>
                        {isOpen && (
                          <span className="text-sm">View Applications</span>
                        )}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item transition ">
                <button
                  className="nav-link text-white flex items-center pb-2 md:pb-1 px-4 pt-2 w-full text-left"
                  onClick={toggleInterviewDropdown}
                >
                  <i className="fa fa-puzzle-piece pr-4 pl-4"></i>
                  {isOpen && <span>Interview Scheduling</span>}
                  {isOpen && <i className="fa fa-caret-down pl-2"></i>}
                </button>

                {interviewOpen && (
                  <ul className="pl-6 md:pl-4 duration-400 transition-all duration-300">
                    <li
                      className={`my-1 mr-2  py-2 rounded-md  ${
                        isOpen ? "pl-7" : "pl-4"
                      } ${activeTab === "/schedule/add" ? "bg-[#4784ce]" : ""}`}
                    >
                      <Link
                        // to="/schedule/add"
                        onClick={() => {
                          alert("NO Navigation");
                        }}
                        className="nav-link text-white py-1 flex items-center"
                      >
                        <i className="fa fa-puzzle-piece pr-2 text-sm"></i>
                        {isOpen && (
                          <span className="text-sm">Add Zoom Schedule</span>
                        )}
                      </Link>
                    </li>
                    <li
                      className={`my-1 mr-2  py-2 rounded-md  ${
                        isOpen ? "pl-7" : "pl-4"
                      } ${
                        activeTab === "/schedule/view" ? "bg-[#4784ce]" : ""
                      }`}
                    >
                      <Link
                        // to="/schedule/view"
                        onClick={() => {
                          alert("NO Navigation");
                        }}
                        className="nav-link text-white py-1 flex items-center"
                      >
                        <i className="fa fa-puzzle-piece pr-2 text-sm"></i>
                        {isOpen && (
                          <span className="text-sm">View Zoom Schedule</span>
                        )}
                      </Link>
                    </li>
                    <li
                      className={`my-1 mr-2  py-2 rounded-md  ${
                        isOpen ? "pl-7" : "pl-4"
                      } ${
                        activeTab === "/schedule/setting" ? "bg-[#4784ce]" : ""
                      }`}
                    >
                      <Link
                        // to="/schedule/setting"
                        className="nav-link text-white py-1 flex items-center"
                        onClick={() => {
                          alert("NO Navigation");
                        }}
                      >
                        <i className="fa fa-puzzle-piece pr-2 text-sm"></i>
                        {isOpen && (
                          <span className="text-sm">Zoom Setting</span>
                        )}
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
              <li className="nav-item py-1.5">
                <Link
                  className="nav-link text-white flex items-center p-4"
                  onClick={() => {
                    alert("NO Navigation");
                  }}
                >
                  <i className="fa fa-book pr-4 pl-4"></i>
                  {isOpen && <span>Assessment</span>}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* this is mibile nav */}
        <div className="md:hidden">
          <div className="flex items-center justify-between w-full md:mx-0">
            <div className="border-b-[0.5px] text-white text-xl float-none text-left capitalize p-0 py-4 flex md:justify-center items-center relative border-white  w-full z-20">
              <Link to="/dashboard">
                <img
                  src="/Assets/logo_small.png"
                  width="70"
                  alt="Logo"
                  className="ml-10 md:ml-0"
                />
              </Link>
            </div>

            <div
              className="md:hidden absolute right-0 z-50 mr-10"
              onClick={toggleDropDown}
            >
              <i className="fa fa-bars text-white text-2xl" />
            </div>
          </div>
        </div>

        {isDropDownOpen && (
          <div className="md:hidden">
            <div className="md:block flex">
              <ul className="flex flex-col w-full">
                <input
                  type="hidden"
                  name="username"
                  id="username"
                  value="hoboh70017@digdy.com"
                />
                <input
                  type="hidden"
                  name="password"
                  id="password"
                  value="Test_12345#"
                />
                {/* <li className="bg-[#4784ce] my-1 mx-3 rounded-md active"> */}
                <li
                  className={`my-1 mx-2 rounded-md ${
                    activeTab === "/dashboard" ? "bg-[#4784ce]" : ""
                  }`}
                >
                  <Link
                    to="/dashboard"
                    className="nav-link text-white flex items-center p-3"
                  >
                    <i className="fa fa-dashboard pr-4 pl-3"></i>
                    <span className="font-semibold">Dashboard</span>
                  </Link>
                </li>
                <li className="relative transition py-1.5">
                  <button
                    className="nav-link text-white flex items-center px-4 pt-3 pb-2 md:pb-1 w-full text-left"
                    onClick={toggleJobDropdown}
                  >
                    <i className="fa fa-university pr-4 pl-4"></i>
                    <span>Jobs</span>
                    <i className="fa fa-caret-down pl-2"></i>
                  </button>
                  {isjobOpen && (
                    <ul className="pl-6 md:pl-8 duration-400 transition-all duration-300">
                      {/* <li className="pl-4"> */}
                      <li
                        className={` mr-1  py-2 rounded-md  ${
                          isOpen ? "pl-7" : "pl-4"
                        } ${
                          activeTab === "/jobs/postjobs" ? "bg-[#4784ce]" : ""
                        }`}
                      >
                        <Link
                          to="/jobs/postjobs"
                          className="nav-link text-white flex items-center"
                        >
                          <i className="fa fa-suitcase pr-2 text-sm"></i>
                          {isOpen && <span className="text-sm">Post Job</span>}
                        </Link>
                      </li>
                      <li
                        className={` mr-1  py-2 rounded-md  ${
                          isOpen ? "pl-7" : "pl-4"
                        } ${
                          activeTab === "/jobs/viewjobs" ? "bg-[#4784ce]" : ""
                        }`}
                      >
                        <Link
                          to="/jobs/viewjobs"
                          className="nav-link text-white py-2 flex items-center"
                        >
                          <i className="fa fa-suitcase pr-2 text-sm"></i>
                          {isOpen && <span className="text-sm">View Jobs</span>}
                        </Link>
                      </li>
                      <li
                        className={` mr-1  py-2 rounded-md  ${
                          isOpen ? "pl-7" : "pl-4"
                        } ${
                          activeTab === "/jobs/view-application"
                            ? "bg-[#4784ce]"
                            : ""
                        }`}
                      >
                        <Link
                          to="/jobs/view-application"
                          className="nav-link text-white flex items-center"
                        >
                          <i className="fa fa-bar-chart pr-2 text-sm"></i>
                          {isOpen && (
                            <span className="text-sm">View Applications</span>
                          )}
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="nav-item transition md:py-1.5">
                  <button
                    className="nav-link text-white flex items-center pb-2 md:pb-1 px-4 pt-2 w-full text-left"
                    onClick={toggleInterviewDropdown}
                  >
                    <i className="fa fa-puzzle-piece pr-4 pl-4"></i>
                    <span>Interview Scheduling</span>
                    <i className="fa fa-caret-down pl-2"></i>
                  </button>

                  {interviewOpen && (
                    <ul className="pl-6 md:pl-8 duration-400 transition-all duration-300">
                      <li
                        className={` mr-1  py-2 rounded-md  ${
                          isOpen ? "pl-7" : "pl-4"
                        } ${activeTab === "/" ? "bg-[#4784ce]" : ""}`}
                      >
                        <Link
                          // to="/"
                          onClick={() => {
                            alert("NO Navigation");
                          }}
                          className="nav-link text-white py-1 flex items-center"
                        >
                          <i className="fa fa-puzzle-piece pr-2 text-sm"></i>

                          <span className="text-sm">Add Zoom Schedule</span>
                        </Link>
                      </li>
                      <li
                        className={` mr-1  py-2 rounded-md  ${
                          isOpen ? "pl-7" : "pl-4"
                        } ${activeTab === "/" ? "bg-[#4784ce]" : ""}`}
                      >
                        <Link
                          // to="/"
                          onClick={() => {
                            alert("NO Navigation");
                          }}
                          className="nav-link text-white py-1 flex items-center"
                        >
                          <i className="fa fa-puzzle-piece pr-2 text-sm"></i>

                          <span className="text-sm">View Zoom Schedule</span>
                        </Link>
                      </li>
                      <li
                        className={` mr-1  py-2 rounded-md  ${
                          isOpen ? "pl-7" : "pl-4"
                        } ${activeTab === "/" ? "bg-[#4784ce]" : ""}`}
                      >
                        <Link
                          // to="/"
                          onClick={() => {
                            alert("NO Navigation");
                          }}
                          className="nav-link text-white py-1 flex items-center"
                        >
                          <i className="fa fa-puzzle-piece pr-2 text-sm"></i>

                          <span className="text-sm">Zoom Setting</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="nav-item py-1.5">
                  <Link
                    className="nav-link text-white flex items-center p-4"
                    onClick={() => {
                      alert("NO Navigation");
                    }}
                  >
                    <i className="fa fa-book pr-4 pl-4"></i>
                    <span>Assessment</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
