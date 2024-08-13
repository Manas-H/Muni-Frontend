import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const LoginFrom = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [isAccountSelectionVisible, setIsAccountSelectionVisible] =
    useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleAccountSelection = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/verify-account-type`,
        { ...formData, type: selectedAccount }
      );
      const { token, type } = response.data;

      // Store the token in local storage
      localStorage.setItem("token", token);

      console.log("Verify api");

      // Navigate to the appropriate dashboard based on the account type
      switch (type) {
        case "student":
          navigate("/dashboard/student");
          break;
        case "employer":
          console.log("dasboard clicked1");
          navigate("/dashboard");
          break;
        case "university":
          navigate("/dashboard/university");
          break;
        default:
          navigate("/"); 
      }
      // console.log("this is data validate:", response);
      // Handle successful login, e.g., store token and navigate to dashboard
      // navigate("/dashboard");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message || "Login failed. Please try again.",
        customClass: {
          popup: "my-swal-popup",
          title: "my-swal-title",
          content: "my-swal-content",
        },
      });
    }
  };

  const validateLogin = async () => {
    console.log("Login clicked");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
        formData
      );
      console.log("login api");
      console.log("Login clicked1", response);
      const { accounts, token, type } = response.data;
      console.log("Login clicked1", type);

      // Store the token in local storage
      localStorage.setItem("token", token);
      // console.log("this is data validate:", data);
      if (accounts) {
        console.log("Login clicked3 acc");
        setAccounts(accounts);
        setIsAccountSelectionVisible(true);
      } else {
        console.log("Login clicked else");
        console.log("Login clicked else", type);
        switch (type) {
          case "student":
            navigate("/dashboard/student");
            break;
          case "employer":
            console.log("dasboard clicked2");
            navigate("/dashboard");
            break;
          case "university":
            navigate("/dashboard/university");
            break;
          default:
            navigate("/"); // Fallback in case of an unexpected type
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text:
          error.response?.data?.message || "Login failed. Please try again.",
        customClass: {
          popup: "my-swal-popup",
          title: "my-swal-title",
          content: "my-swal-content",
        },
      });
    }
  };

  return (
    <div className="w-full">
      {/* mobile view vector */}
      <div className="w-full md:hidden">
        <div className="z-20 absolute w-full">
          <img
            src="/Assets/Vector.png"
            alt="vector"
            className="w-full h-[153px]"
          />
        </div>
        <div className="z-50 relative top-5 left-10 w-full">
          <img
            src="/Assets/seagull_logo_white.png"
            alt="vector"
            className="w-32 h-14"
          />
        </div>
      </div>

      {/* login form */}
      <div className=" w-full flex justify-center items-center mt-1">
        <form className="w-full mx-10 md:mx-[90px] mt-[150px]">
          <h1 className="text-2xl md:text-[2.5rem] mb-3 text-[#0a294f] font-bold">
            Login
          </h1>
          <input type="hidden" name="mywantsurl" value=""></input>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" ✉     Enter email address"
            className="w-full p-[6px] mb-5 mt-4 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-sm placeholder:text-gray-500"
            disabled={isAccountSelectionVisible}
          />

          <div className="flex w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder=" 🗝️     Enter password "
              className="w-full p-[6px] mb-5 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-sm placeholder:text-gray-500"
              disabled={isAccountSelectionVisible}
            />{" "}
            <i
              className={`fa ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } cursor-pointer absolute right-4 mt-2.5`}
              id="togglePassword"
              onClick={togglePasswordVisibility}
            ></i>
          </div>

          {isAccountSelectionVisible && (
            <div className="mb-5">
              <label htmlFor="accountType" className="block text-gray-700">
                Select Account Type:
              </label>
              <select
                id="accountType"
                name="accountType"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full p-[6px] bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-sm placeholder:text-gray-500"
              >
                <option value="">Select an account type</option>
                {accounts.map((account) => (
                  <option key={account.type} value={account.type}>
                    {account.type}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="">
              <div className="flex items-center text-gray-800 text-xs md:text-base">
                <input
                  type="checkbox"
                  name="rememberUsername"
                  id="rememberUsername"
                />
                <span className="md:ml-1"> Remember me</span>
              </div>
            </div>
            <div className="info-pass m-0 text-blue-800 text-xs md:text-base">
              <a href="@" className="forgot ">
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="button"
            className="bg-[#0a294f] text-white text-xl cursor-pointer rounded-3xl p-2 w-[80%] mt-14"
            onClick={
              isAccountSelectionVisible ? handleAccountSelection : validateLogin
            }
          >
            {isAccountSelectionVisible ? "Continue" : "Login"}&nbsp;
          </button>

          <div className="flex justify-center items-center w-full my-4">
            <hr className="border-1 border-gray-500 w-[30%] inline-block"></hr>
            <p className="px-5">Or</p>
            <hr className="border-1 border-gray-500 w-[30%] inline-block"></hr>
          </div>

          <Link to="register">
            <button
              type="button"
              className="bg-[#a72d38] text-white text-xl cursor-pointer rounded-3xl p-2 w-[80%] "
            >
              Register&nbsp;&nbsp; <i className="fa fa-sign-in"></i>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginFrom;
