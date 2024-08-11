import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import axios from "axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobileNo: "",
  });

  const validate = () => {
    const errors = {};
    if (!formData.firstName) errors.firstName = "First name is required";
    if (!formData.lastName) errors.lastName = "Last name is required";
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
    console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
          formData
        );
        alert("Registration successful!");
        navigate('/')
        console.log("Registration successful:", response.data);
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error("Error registering user:", error);
        // Handle error
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
    <div>
      <div className=" w-full flex justify-center items-center mt-11 md:mt-0 mb-10 md:mb-0">
        <form className="w-full mx-10 md:mx-[90px] mt-[150px] md:mt-12">
          <h1 className="text-2xl md:text-[2.5rem] mb-5 text-[#0a294f] font-medium">
            Student Registeration
          </h1>
          <div className="flex my-3">
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First name"
              className="w-[50%] mr-12 p-[6px]  bg-[#f4f8f7] rounded-md border border-[#e1e1e1]  placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-[50%] p-[6px]  bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
            />
          </div>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" Enter email address"
              className="w-full p-[6px] bg-[#f4f8f7] rounded-md border border-[#e1e1e1]  placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password "
              className="w-full p-[6px] my-2 bg-[#f4f8f7] rounded-md border border-[#e1e1e1]  placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
            />

            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password "
              className="w-full p-[6px]  bg-[#f4f8f7] rounded-md border border-[#e1e1e1]  placeholder:text-xs placeholder:pl-1 placeholder:text-gray-500"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <div className="w-full p-0 px-4 my-3 bg-[#f4f8f7] rounded-md border border-[#e1e1e1] placeholder:text-xs placeholder:pl-1">
            <div className="flag-container">
              <div
                className="selected-flag"
                tabIndex="0"
                title={`Code: ${formData.mobileNo ? formData.mobileNo : "+44"}`} // Display current code
              >
                {/* Flag will be handled by PhoneInput */}
              </div>
            </div>
            <PhoneInput
              placeholder="+365 1234 5678"
              value={formData.mobileNo}
              onChange={(value) =>
                setFormData({ ...formData, mobileNo: value })
              }
              className="w-full bg-[#f4f8f7] placeholder:text-sm p-0"
              international
              defaultCountry="GB" // Optional: Set a default country code
            />
          </div>

          <div className="md:hidden">
            <span className="text-xs text-left text-gray-600 inline-block">
              By proceeding, you agree to our{" "}
              <a href="https://myseagull.ai/terms-of-use.php">Terms of Use</a>{" "}
              and{" "}
              <a href="https://myseagull.ai//privacy-policy.php">
                Privacy Policy
              </a>
            </span>
          </div>

          <button
            type="button"
            className="bg-[#a72d38] text-white text-xl cursor-pointer rounded-xl p-2 w-[60%]  mt-5"
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
              className="bg-[#0a294f] text-white text-xl cursor-pointer rounded-xl p-2 w-[60%]"
            >
              Login&nbsp;
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
