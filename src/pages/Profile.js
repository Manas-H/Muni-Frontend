import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [getProfileData, setGetProfileData] = useState({});
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/get-profile/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setGetProfileData(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching job data:", err);
        // setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, []);

  const handleEditClick = () => {
    navigate("/edit-profile", { state: { getProfileData } });
  };

  if (loading) {
    return (
      <div className="flex flex-col bg-white text-black pt-52 h-[100vh]">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div
        className={`bg-gray-50 h-full flex-1 transition-all duration-300 ${
          isOpen ? "md:ml-64" : "md:ml-20"
        }`}
      >
        <Header />

        <div>
          {getProfileData && (
            <div className="bg-white mx-5 mt-5">
              <div className="border border-gray-200 shadow-sm my-5">
                <div className="flex items-center justify-between px-7 py-3 w-full bg-gray-100 border-b-[1px] ">
                  <h1 className="text-black font-bold text-md">My Profile</h1>
                  <label
                    className="font-extrabold text-blue-500 cursor-pointer"
                    onClick={handleEditClick}
                  >
                    Edit <i className="fa fa-edit" />
                  </label>
                </div>
                <div className="flex flex-col justify-center items-center my-3 ">
                  <img
                    src="https://myseagull.ai/img/no_Image.png"
                    alt="profile"
                    className="w-40"
                  />
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {getProfileData.firstName}
                    {getProfileData.lastName}
                  </h1>
                  <label className="flex items-center">
                    <i className="fa fa-map-marker"></i>
                    <h1 className="pl-2 text-lg">
                      {getProfileData.city},{getProfileData.country?.name}
                    </h1>
                  </label>
                </div>
                <span className="border-[1px] my-8 border-gray-200 w-full flex"></span>
              </div>

              <div className="border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between px-7 py-3 w-full bg-gray-100 border-b-[1px] ">
                  <h1 className="flex items-center text-black font-bold text-md">
                    <i className="fa fa-user pr-2" />
                    Profile Details
                  </h1>
                </div>
                <div className="flex justify-start items-center my-3 mx-3">
                  <div className="h-20 border border-blue-400 bg-blue-400 p-0.5"></div>
                  <div className="mt-10 text-gray-500 text-lg font-semibold ml-10">
                    Position: {getProfileData.designation}
                  </div>
                </div>
                <span className="border-[1px] my-8 border-gray-200 w-full flex"></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
