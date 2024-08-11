import React, { useState, useEffect } from "react";
import Select from "react-select";
import programsData from "./program.json";

const Specialization = ({ educationDetails, setEducationDetails }) => {
  const [specializations, setSpecializations] = useState([]);

  // Generate year options for Passout Year
  const yearOptions = Array.from({ length: 48 }, (_, i) => ({
    value: 1980 + i,
    label: 1980 + i,
  }));

  const programOptions = programsData.map((program) => ({
    value: program.program,
    label: program.program,
  }));

  const specializationOptions = specializations.map((specialization) => ({
    value: specialization,
    label: specialization,
  }));

  useEffect(() => {
    // Collect all specializations from selected programs
    const allSpecializations = educationDetails.programs.flatMap((program) => {
      const programData = programsData.find((p) => p.program === program.value);
      return programData ? programData.specializations : [];
    });
    // Remove duplicates if any
    const uniqueSpecializations = Array.from(new Set(allSpecializations));
    setSpecializations(uniqueSpecializations);
  }, [educationDetails.programs]);

  const handleProgramChange = (selectedOptions) => {
    setEducationDetails({
      ...educationDetails,
      programs: selectedOptions || [],
    });
  };

  const handleSpecializationChange = (selectedOptions) => {
    setEducationDetails({
      ...educationDetails,
      specializations: selectedOptions || [],
    });
  };

  const handlePassoutYearChange = (selectedOption) => {
    setEducationDetails({
      ...educationDetails,
      passoutYear: selectedOption,
    });
  };

  const handleTotalRequirementChange = (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setEducationDetails({
        ...educationDetails,
        totalRequirement: value,
      });
    }
  };

  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-10 mx-7">
      <div className="form-group">
        <h1 className="flex items-start text-[#495677] font-bold pb-2 text-sm">
          Program
        </h1>
        <Select
          isMulti
          options={programOptions}
          value={educationDetails.programs}
          onChange={handleProgramChange}
          placeholder="Type to search programs"
          className="basic-multi-select "
          classNamePrefix="select"
        />
      </div>

      <div className="form-group">
        <h1 className="flex items-start text-[#495677] font-bold pb-2 text-sm">
          Specialization
        </h1>
        <Select
          isMulti
          options={specializationOptions}
          value={educationDetails.specializations}
          onChange={handleSpecializationChange}
          placeholder="Type to search specializations"
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>

      <div>
        <h1 className="flex items-start text-[#495677] font-bold pb-2 text-sm">
          Passout Year
        </h1>
        <Select
          options={yearOptions}
          value={educationDetails.passoutYear}
          onChange={handlePassoutYearChange}
          placeholder="Select Passout Year"
          className="basic-single"
          classNamePrefix="select"
        />
      </div>

      <div>
        <h1 className="flex items-start text-[#495677] font-bold pb-2 text-sm">
          Total Requirement<span className="text-red-600">*</span>
        </h1>
        <input
          type="number"
          value={educationDetails.totalRequirement}
          onChange={handleTotalRequirementChange}
          placeholder="Total Requirement"
          className={`w-full h-14 rounded-lg ${
            educationDetails.totalRequirement !== ""
              ? "bg-white"
              : "bg-gray-200"
          } placeholder:text-gray-500`}
        />
      </div>
    </div>
  );
};

export default Specialization;
