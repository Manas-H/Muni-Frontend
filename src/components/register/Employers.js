import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

const Employers = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    designation: "",
    companyName: "",
    url: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
    type: "employer",
  });

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
    if (!formData.designation) errors.designation = "Designation is required";
    if (!formData.companyName) errors.companyName = "Company name is required";
    if (!formData.url) errors.url = "Website URL is required";
    else if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(formData.url))
      errors.url = "Website URL is invalid";
    if (!formData.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email address is invalid";
    if (!formData.password) errors.password = "Password is required";
    else if (formData.password.length < 6)
      errors.password = "Password must be at least 6 characters";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    )
      errors.password =
        "Password must include uppercase, lowercase, number, and special character";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    if (!formData.mobileNo) errors.mobileNo = "Mobile number is required";
    else if (!/^\+?\d{10,14}$/.test(formData.mobileNo))
      errors.mobileNo = "Mobile number is invalid";

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    const validationErrors = validate();
    console.log("Form Data:", formData);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
          formData
        );
        alert("Registration successful!");
        navigate("/");
        console.log("Registration successful:", response.data);
      } catch (error) {
        console.error("Error registering user:", error);
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        alert(errorMessage);
      }
    } else {
      let errorMessage = "Please fix the following errors:\n";
      for (let key in validationErrors) {
        errorMessage += `${validationErrors[key]}\n`;
      }
      alert(errorMessage);
    }
  };

  return (
    <div className="">
      <div className=" w-full flex justify-center items-center mt-11 md:mt-0 mb-10 md:mb-0">
        <form className="w-full mx-10 md:mx-[90px] mt-[150px] md:mt-12">
          <h1 className="text-2xl md:text-[2.5rem] mb-5 text-[#0a294f] font-medium">
            Employer Registration
          </h1>
          <div className="flex my-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              className="w-[50%] mr-12 p-[6px] bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last name"
              className="w-[50%] p-[6px] bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              id="designation"
              name="designation"
              placeholder="Enter Designation"
              className="w-full p-[6px] mb-3 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.designation}
              onChange={handleChange}
            />
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter Company Name"
              className="w-full p-[6px] mb-3 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.companyName}
              onChange={handleChange}
            />
            <input
              type="text"
              id="url"
              name="url"
              placeholder="Enter Website URL"
              className="w-full p-[6px] mb-3 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.url}
              onChange={handleChange}
            />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
              className="w-full p-[6px] mb-3 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
              className="w-full p-[6px] my-2 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-[6px] bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="w-full p-0 px-4 my-3 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1">
            <PhoneInput
              placeholder="+365 1234 5678"
              value={formData.mobileNo}
              onChange={(value) =>
                setFormData({ ...formData, mobileNo: value })
              }
              className="w-full bg-[#f4f8f7] placeholder:text-sm p-0"
              international
              defaultCountry="GB"
            />
          </div>
          <div className="">
            <span className="text-xs text-left text-gray-600 inline-block">
              By proceeding, you agree to our{" "}
              <a
                href="https://myseagull.ai/terms-of-use.php"
                className="font-semibold"
              >
                Terms of Use
              </a>{" "}
              and{" "}
              <a
                href="https://myseagull.ai//privacy-policy.php"
                className="font-semibold"
              >
                Privacy Policy
              </a>
            </span>
          </div>
          <button
            type="button"
            className="bg-[#a72d38] text-white text-xl cursor-pointer rounded-xl p-2 w-[60%] mt-5"
            onClick={handleRegister}
          >
            Register&nbsp;&nbsp; <i className="fa fa-sign-in"></i>
          </button>
          <div className="flex justify-center items-center w-full my-4">
            <hr className="border-1 border-gray-500 w-[30%] inline-block"></hr>
            <p className="px-5">Or</p>
            <hr className="border-1 border-gray-500 w-[30%] inline-block"></hr>
          </div>
          <Link to="/">
            <button
              type="button"
              className="bg-[#0a294f] text-white text-xl cursor-pointer rounded-xl p-2 w-[60%] my-1"
            >
              Login &nbsp;&nbsp;<i className="fa fa-sign-in"></i>
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Employers;
