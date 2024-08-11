import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Select from "react-select";
import { components } from "react-select";

const customSingleValue = ({ data }) => (
  <div className="custom-single-value">
    {data.label}
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        // Handle removing the selected option
        e.preventDefault();
      }}
      className="ml-2 text-red-600 hover:text-red-800"
    >
      ×
    </button>
  </div>
);

const customOption = (props) => {
  return (
    <components.Option {...props}>
      <input
        type="checkbox"
        checked={props.isSelected}
        onChange={() => null} // Required to make the checkbox work
      />
      <label className="ml-2">{props.label}</label>
    </components.Option>
  );
};

const Assesment = ({ formData, setFormData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessments, setSelectedAssessments] = useState([]);
  const [options, setOptions] = useState([]);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAssessmentSelect = (assessment) => {
    setSelectedAssessments((prevSelected) => [
      ...prevSelected,
      { label: assessment.title, value: assessment },
    ]);
    setOptions((prevOptions) => [
      ...prevOptions,
      { label: assessment.title, value: assessment },
    ]);
  };
  // const handleChange = (selectedOptions) => {
  //   setSelectedAssessments(selectedOptions || []);
  // };

  const handleChangeSelect = (selectedOptions) => {
    setFormData({
      ...formData,
      assessments: {
        ...formData.assessments,
        selectedAssessments: selectedOptions || [],
      },
    });
  };

  useEffect(() => {
    // Retrieve saved selected assessments from localStorage or other persistent storage
    const savedAssessments =
      JSON.parse(localStorage.getItem("selectedAssessments")) || [];
    setSelectedAssessments(savedAssessments);
    setOptions(savedAssessments);
  }, []);

  useEffect(() => {
    // Save selected assessments to localStorage or other persistent storage
    localStorage.setItem(
      "selectedAssessments",
      JSON.stringify(selectedAssessments)
    );
  }, [selectedAssessments]);

  // const handleAssessmentRemove = (assessmentToRemove) => {
  //   setSelectedAssessments((prevSelected) =>
  //     prevSelected.filter((a) => a.title !== assessmentToRemove.title)
  //   );
  // };

  const handleKeepTestOpenForChange = (e) => {
    setFormData({
      ...formData,
      assessments: {
        ...formData.assessments,
        keepTestOpenFor: e.target.value,
      },
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2  mx-7">
      <div className="flex flex-col items-start ">
        <label className="text-[#495677] font-semibold pb-2 text-sm">
          Select Assesment
        </label>
        {/* <input type="text" className="md:w-[462px] rounded-md"></input> */}
        <Select
          isMulti
          options={options}
          value={formData.assessments.selectedAssessments}
          components={{ SingleValue: customSingleValue, Option: customOption }}
          onChange={handleChangeSelect}
          className="basic-multi-select md:w-[400px] rounded-md"
          classNamePrefix="select"
        />
      </div>
      <div className="flex flex-col md:flex-row items-start md:1items-center">
        <label className="flex flex-col items-start">
          <h1 className="text-[#495677] font-semibold pb-2 mt-2 md:mt-0 text-sm">
            Keep Test Open for
          </h1>
          <select
            name="keepTestOpenFor"
            className="flex justify-between w-full md:w-52 mr-10 rounded-md mb-2 md:mb-0"
            value={formData.assessments.keepTestOpenFor}
            onChange={handleKeepTestOpenForChange}
          >
            <option value="">Select a day</option>
            {[...Array(10).keys()].map((i) => (
              <option key={i} value={`Day ${i + 1}`}>{`Day ${i + 1}`}</option>
            ))}
          </select>
        </label>

        <label className="">
          <h1
            className="bg-[#0a294f] rounded-md text-white px-10 py-2 md:mt-7 w-full cursor-pointer"
            onClick={openModal}
          >
            Select New Assessment
          </h1>
        </label>

        {isModalOpen && (
          <Modal
            closeModal={closeModal}
            selectedAssessments={selectedAssessments}
            onAssessmentSelect={handleAssessmentSelect}
          />
        )}
      </div>
    </div>
  );
};

export default Assesment;
