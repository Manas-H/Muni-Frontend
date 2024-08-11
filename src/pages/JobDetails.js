import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer/Footer";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { jobId } = useParams();
  const [viewJobDetails, setViewJobDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      console.log("this is id", jobId);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/job-postings/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // setFormData(response.data);
        console.log(response.data);
        setViewJobDetails(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching job data:", err);
        setError("Failed to load job details. Please try again later.");
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchJob();
  }, [jobId]);

  const handleLogout = () => {
    alert("You are logged out");
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const ApplyJob = () => {
   alert("You Dont have permission to do this")
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div className="flex justify-between items-center bg-[#0a294f] px-5">
        <div className="flex items-center py-5">
          <img
            src="/Assets/seagull_logo_white.png"
            alt="logo"
            className="w-20"
          />
          <ul className="hidden md:flex items-center text-white">
            <li className="pl-5 cursor-pointer">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="pl-5 cursor-pointer">
              <Link>Update Profile</Link>
            </li>
            <li className="pl-5 cursor-pointer">
              <Link>Applied Jobs</Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:block">
          <button
            className="text-white bg-[#a71d38] px-5 py-1.5"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="md:hidden">
          <i
            className="fa fa-bars text-[#718499] text-3xl"
            onClick={toggleMenu}
          />
        </div>
        {isMenuOpen && (
          <div className="fixed left-0 top-0 h-full w-[50%] bg-[#0a294f] pt-20">
            <ul className=" text-white flex flex-col  items-center">
              <li className="border-b-[1px] border-t-[1px] py-4 border-gray-300 w-full cursor-pointer">
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li className="border-b-[1px] border-gray-300 py-4 w-full cursor-pointer">
                <Link>Update Profile</Link>
              </li>
              <li className="border-b-[1px] border-gray-300 py-4 w-full cursor-pointer">
                <Link>Applied Jobs</Link>
              </li>
            </ul>
            <div className="py-10">
              <button
                className="text-white bg-[#a71d38] px-5 py-1.5"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {viewJobDetails ? (
        <div>
          <div className=" flex flex-col md:flex-row justify-between items-center border-[1px] border-gray-50 shadow-2xl rounded-md p-2 mx-2 md:mx-24 my-4">
            <div className="flex flex-col md:flex-row items-center p-4">
              <div className="single-job-thumb">
                <a className="nav-brand" href="https://myseagull.ai/TCA">
                  <img
                    src="https://myseagull.ai/theme/image.php/gr8street_muniversity/core/1380293780/u/f3"
                    alt=""
                    className="w-24"
                  />
                </a>
              </div>
              <div className="flex flex-col items-start ml-5 py-1">
                <h4 className="flex flex-col md:flex-row font-bold text-lg">
                  <span>{viewJobDetails.jobTitle}</span>
                  <span className="ml-3 text-[#053305] text-xs bg-[#cafbca] px-2 py-1 rounded-md">
                    {Object.keys(viewJobDetails.jobPreference)
                      .filter(
                        (preference) => viewJobDetails.jobPreference[preference]
                      )
                      .map(
                        (preference) =>
                          preference.charAt(0).toUpperCase() +
                          preference.slice(1).replace(/([A-Z])/g, " $1")
                      )
                      .join(", ") || "N/A"}
                  </span>
                </h4>
                <span className="py-3">
                  <i className=" fa fa-location-pin text-[#0a294f] pr-1.5"></i>
                  <span>{viewJobDetails.location}</span>
                </span>
                <ul className="flex">
                  <li className="pr-6">
                    <i className="fa fa-briefcase text-[#0a294f] pr-1.5"></i>
                    <span>
                      {viewJobDetails.experience.min} -{" "}
                      {viewJobDetails.experience.max} Yrs
                    </span>
                  </li>
                  <li>
                    <i className="fa-solid fa-dollar-sign pr-1.5"></i>
                    <span>
                      {" "}
                      {viewJobDetails.salary.min} - {viewJobDetails.salary.max}{" "}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="py-5 md:py-0 mr-4">
              <button onClick={ApplyJob} className="text-white bg-[#a71d38] px-5 py-1.5">
                <i className="fa fa-check-square-o pr-1.5"></i>
                <span>Apply Job</span>
              </button>
            </div>
            {/* <!-- <a href="#" class="btn apply-btn btn-primary"><i class="ti-check-box"></i>Apply job</a> --> */}
          </div>

          <div className="flex flex-col md:flex-row justify-between mx-2 md:mx-24 my-10">
            <div className="md:w-[70%] md:mr-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 items-center">
                <div className="flex  items-center justify-start px-5 py-3 md:py-0 border-[1px] border-gray-200 shadow-lg w-full md:mr-3 md:h-20">
                  <i className="fas fa-user-md pr-3 text-[32px] text-[#0A294F]" />
                  <span className="flex flex-col items-start">
                    <h1>Industry:</h1>
                    <p>{viewJobDetails.industryType}</p>
                  </span>
                </div>
                <div className="flex items-center justify-start px-5  py-3 md:py-0 border-[1px] border-gray-200 shadow-lg w-full md:ml-3 md:h-20">
                  <i className="fa-regular fa-calendar-days pr-3 text-[32px] text-[#0A294F]"></i>
                  <span className="flex flex-col items-start">
                    <h1>
                      {new Date(viewJobDetails.expiryDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </h1>
                    <p>
                      {Object.keys(viewJobDetails.jobPreference)
                        .filter(
                          (preference) =>
                            viewJobDetails.jobPreference[preference]
                        )
                        .map(
                          (preference) =>
                            preference.charAt(0).toUpperCase() +
                            preference.slice(1).replace(/([A-Z])/g, " $1")
                        )
                        .join(", ") || "N/A"}
                    </p>
                  </span>
                </div>
              </div>

              <div className="my-5 flex   py-3 md:py-0 items-center justify-start px-5 border-[1px] border-gray-200 shadow-lg w-full mr-3 md:h-20">
                <i className="far fa-chart-bar pr-3 text-[32px] text-[#0A294F]" />
                <span className="flex flex-col items-start">
                  <h1>Skills</h1>
                  <p>{viewJobDetails.selectedSkills.join(", ")}</p>
                </span>
              </div>

              <div className="my-5 flex flex-col items-start justify-start border-[1px] border-gray-200 shadow-lg w-full mr-3">
                <div className="w-full flex justify-start px-5 py-3 border-b-[1px] border-gray-300">
                  <h4 className="flex items-center">
                    <i className="fa-solid fa-info pr-3 text-[15px] text-[#0A294F]"></i>
                    <span> Job Overview</span>
                  </h4>
                </div>
                <div className="flex flex-col items-start justify-start px-5 py-2">
                  <p>
                    <strong className="text-gray-600">
                      Job Title: {viewJobDetails.jobTitle}
                    </strong>
                  </p>

                  <p className="text-left text-gray-500 py-2">
                    {viewJobDetails.jobDescription}
                  </p>
                </div>
              </div>

              <div className="my-5 flex flex-col items-start justify-start border-[1px] border-gray-200 shadow-lg w-full mr-3">
                <div className="w-full flex justify-start px-5 py-3 border-b-[1px] border-gray-300">
                  <h4 className="flex items-center">
                    <i className="fa-solid fa-book-open pr-3 text-[15px] text-[#0A294F]"></i>
                    <span>Qualification</span>
                  </h4>
                </div>
                <div className="flex flex-col items-start justify-start px-5 py-5"></div>
              </div>
            </div>

            <div className="md:w-[30%]">
              <div className="flex flex-col justify-center items-center border-[3px] border-gray-100 shadow-md rounded-sm p-2 py-20">
                <img
                  src="https://myseagull.ai/theme/image.php/gr8street_muniversity/core/1380293780/u/f3"
                  alt=""
                  className="w-36"
                />
                <h1 className="text-base font-semibold">Test Company Name</h1>
                <span className="py-3">
                  <i className=" fa fa-location-pin text-[#0a294f] pr-1.5"></i>
                  <span>{viewJobDetails.location}</span>
                </span>
              </div>
              <div className="py-5 my-3 border-2 border-gray-200">
                <h4>
                  <i className="fa-solid fa-signs-post"></i> Company Address
                </h4>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No job details available.</div>
      )}
      <Footer />
    </div>
  );
};

export default JobDetails;
