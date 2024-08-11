import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [isNotify, setIsNotify] = useState(false);
  const [isProfileDown, setIsProfileDown] = useState(false);

  const navigate = useNavigate();

  const toggleNotifcation = () => {
    setIsNotify(!isNotify);
  };

  const toggleProfile = () => {
    setIsProfileDown(!isProfileDown);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  };

  return (
    <div className="flex justify-center md:justify-end px-10 bg-white min-h-[72px] shadow-lg w-full">
      <div className="flex justify-center items-center ">
        <div className="dropdown for-notification">
          <button
            className=" bg-gray-100 py-2 px-6"
            type="button"
            id="notification"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            onClick={toggleNotifcation}
          >
            <i className="fa fa-bell"></i>
            <span className="pl-1">0</span>
          </button>
          {isNotify && (
            <div
              className="min-w-56 max-h-[500px] overflow-auto absolute transform"
              aria-labelledby="notification"
              x-placement="bottom-start"
            >
              <p className="bg-[#9fd7ea66] text-black text-[13px] font-bold text-center border rounded-t-md border-b-2 border-[#6ca9e6] py-1 px-1 font">
                You have 0 Notification
              </p>
            </div>
          )}
        </div>

        <div className="ml-3">
          <div className="profile-round">
            <img
              className="w-10 "
              src="https://myseagull.ai/img/no_Image.png"
              alt=""
            />
          </div>
        </div>

        <div className="ml-3">
          <button
            className=" w-fit px-4 py-1.5 cursor-pointer rounded-md border border-[#6c757d] my-2"
            onClick={toggleProfile}
          >
            <div className="mt-1">
              <i className="fa fa-caret-down text-[#212429]"></i>{" "}
              <strong className="text-[#212429]">UserName</strong>
            </div>
          </button>

          {isProfileDown && (
            <div
              className=" flex absolute right-20 bg-white border border-[#bbb] rounded-sm p-3"
              x-placement="bottom-start"
            >
              <div className="relative z-20">
                {" "}
                <Link
                  className="flex justify-center items-center text-xs pr-1 text-[#272c33]"
                  to="/profile"
                >
                  <i className="fa fa-user text-xs py-1 px-1"></i> My Profile
                </Link>
                <Link
                  className="flex justify-center items-center text-xs text-[#272c33] pr-1  py-3 w-20"
                  to=""
                >
                  <i className="fa fa-cog  text-xs py-1 px-1"></i> Change
                  Password
                </Link>
                <button
                  className="flex justify-center items-center text-xs float-start text-[#272c33]"
                  onClick={handleLogout}
                >
                  <i className="fa fa-power-off  text-xs py-1 px-1"></i> Logout
                </button>
              </div>
              <div className="relative z-50">
                <Link
                  to="2"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    className="w-10 "
                    src="https://myseagull.ai/img/no_Image.png"
                    alt=""
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
