import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/dashboard/SideBar";
import Header from "../components/Header/Header";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  //   const [errors, setErrors] = useState({});

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.currentPassword)
      errors.currentPassword = "Current password is required";
    if (!formData.newPassword) errors.newPassword = "New password is required";
    else if (formData.newPassword.length < 6)
      errors.newPassword = "New password must be at least 6 characters";
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.newPassword
      )
    )
      errors.newPassword =
        "New password must include uppercase, lowercase, number, and special character";
    if (!formData.confirmPassword)
      errors.confirmPassword = "Confirm password is required";
    else if (formData.newPassword !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      // Show errors in alert
      Object.values(validationErrors).forEach((error) => alert(error));
      return;
    }

    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/change-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Password changed successfully");
      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Error changing password";
      alert(errorMessage);
    }
  };

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
          <div className="border border-gray-300 m-4">
            <div className="card">
              <div className="py-3 text-left px-3 text-base font-bold border-b-[1px] border-gray-300">
                <strong className="card-title">Change Password</strong>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 bg-white p-5">
                <div className="flex flex-col md:flex-row items-center w-full">
                  <label className="w-56">
                    Current Password{" "}
                    <span className="required text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    className="w-full p-0"
                    placeholder="Enter current password."
                    value={formData.currentPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center w-full">
                  <label className="w-56">
                    New Password{" "}
                    <span className="required text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="w-full p-0"
                    placeholder="Enter new password."
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col md:flex-row items-center w-full">
                  <label className="w-56">
                    Confirm Password{" "}
                    <span className="required text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="w-full p-0"
                    placeholder="Confirm new password."
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-start">
                  <button
                    type="submit"
                    className="bg-[#28a745] text-white font-semibold py-1 px-2 rounded-md"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
