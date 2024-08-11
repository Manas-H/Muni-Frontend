import React, { useState } from "react";
import { availableSkills } from "./SkillsSet";

const Skills = ({ onSkillsChange }) => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleAddSkill = () => {
    if (skill.trim() !== "") {
      // Split the input by commas and trim whitespace
      const newSkills = skill
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s !== "");

      // Add only new skills that are not already included
      const updatedSkills = [...new Set([...skills, ...newSkills])];

      setSkills(updatedSkills);
      onSkillsChange(updatedSkills);
      setSkill("");
      setSuggestions([]);
    }
  };

  const handleClearSkills = () => {
    setSkills([]);
    onSkillsChange([]);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSkill(value);
    if (value) {
      const filteredSuggestions = availableSkills.filter((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="flex items-start text-[#495677] font-semibold pb-2 text-sm">
        Skill Set <span className="text-red-500">*</span>
      </h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Please type skills do not copy paste"
          value={skill}
          onChange={handleChange}
          onPaste={(e) => e.preventDefault()}
          className="w-full p-2 border rounded"
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-50 bg-white border mt-1 w-full rounded shadow-lg max-h-40 overflow-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => {
                  setSkill(suggestion);
                  setSuggestions([]);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className=" flex justify-start mt-2 items-center">
        <div
          onClick={handleAddSkill}
          className="bg-blue-900 text-white px-4 py-2 rounded mr-2 flex items-center"
        >
          <span className="mr-2">
            <i className="fa fa-plus" />
          </span>{" "}
          Add Skills
        </div>{" "}
        <div className="mx-2 md:mb-4 ">
          <ul className="flex mt-4">
            {skills.map((skill, index) => (
              <li key={index} className="p-1">
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div onClick={handleClearSkills} className="text-blue-900">
          Clear Skills
        </div>
      </div>
    </div>
  );
};

export default Skills;
