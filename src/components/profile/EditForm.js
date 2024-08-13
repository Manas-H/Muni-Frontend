import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CountrySelect from "./CountrySelect";
import axios from "axios";
import Loader from "../Loader/Loader";

const EditForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { getProfileData } = location.state || {};

  const [formData, setFormData] = useState(getProfileData || {});
  const [selectedCountry, setSelectedCountry] = useState(
    getProfileData?.country || null
  );

  useEffect(() => {
    console.log("data", getProfileData);
    if (getProfileData) {
      setFormData(getProfileData);
      setSelectedCountry(getProfileData.country || null);
      setLoading(false)
    }
  }, [getProfileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectCountry = (selectedCountry) => {
    setSelectedCountry(selectedCountry);
    setFormData((prevData) => ({ ...prevData, country: selectedCountry }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/update-profile/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/profile");
      alert("Profile Updated Successfully");
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col bg-white text-black pt-52 h-[100vh]">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="border border-gray-300 mx-7 my-3">
        <div className="border-b-[1px] border-gray-200 py-2 text-start px-3 text-lg font-bold">
          Edit Enterprise
        </div>
        <div>
          <h1 className="text-green-600 text-2xl">Data</h1>
          <form className="" onSubmit={handleSubmit}>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start ">
                Name<span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                value={`${formData.firstName || ""} ${formData.lastName || ""}`}
                readOnly
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Designation<span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="designation"
                value={formData.designation || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Custom URL<span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="customURL"
                value={formData.url || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Password<span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="password"
                className="w-full p-0 bg-transparent"
                name="password"
                value={formData.password || ""}
                onChange={handleChange}
                readOnly
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Email<span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="email"
                className="w-full p-0 bg-transparent"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Representative First Name
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Representative Last Name
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Address
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
                type="text"
                className="w-full p-0 bg-transparent"
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Zipcode
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="number"
                className="w-full p-0 bg-transparent"
                name="zipCode"
                value={formData.zipCode || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                City/Town
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                State
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                name="state"
                value={formData.state || ""}
                onChange={handleChange}
                type="text"
                className="w-full p-0 bg-transparent"
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Country
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <CountrySelect
                selectedCountry={selectedCountry}
                onSelectCountry={handleSelectCountry}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Mobile No
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="mobileNo"
                value={formData.mobileNo || ""}
                onChange={handleChange}
                placeholder="Enter mobile number"
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Logo (100*10)
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input type="file" className="w-full p-0 bg-transparent" />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Banner Image (1280*360)
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input type="file" className="w-full p-0 bg-transparent" />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Description
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <textarea
                className="w-full p-0 bg-transparent"
                rows={2}
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Website
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                LinkedIn
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="linkedIn"
                value={formData.linkedIn || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Facebook
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="facebook"
                value={formData.facebook || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Twitter
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="twitter"
                value={formData.twitter || ""}
                onChange={handleChange}
              />
            </label>
            <label className="flex flex-col md:flex-row justify-around items-center mx-2 my-5 md:mx-32">
              <h1 className="text-base text-[#212529] md:w-96 text-start">
                Youtube Channel
                <span className="text-red-600 pl-1 ">*</span>
              </h1>
              <input
                type="text"
                className="w-full p-0 bg-transparent"
                name="youtube"
                value={formData.youtube || ""}
                onChange={handleChange}
              />
            </label>
            <button className="bg-[#28a745] text-white p-1 mb-1">
              Update Profile
              <i className="fa fa-angle-double-right text-xs pl-1 rounded-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
