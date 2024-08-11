import React, { useState } from "react";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Skills from "./postjob/Skills";
import Specialization from "./postjob/Specification";
import Assesment from "./assessment/Assesment";
import AdvanceField from "./postjob/AdvanceField";
import { useNavigate } from "react-router-dom";

const PostJobForm = () => {
  const navigate = useNavigate();
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    fullTime: false,
    partTime: false,
    internship: false,
    remote: false,
    workFromHome: false,
  });

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    designation: "",
    industryType: "",
    jobPostingType: "",
    jobDescription: "",

    educationDetails: {
      programs: [],
      specializations: [],
      passoutYear: null,
      totalRequirement: "",
    },

    selectedSkills: selectedSkills,
    cutOffCriteria: [],
    jobPreference: selectedOptions,

    experience: {
      min: "",
      max: "",
    },

    salary: {
      min: "",
      max: "",
      currency: "",
    },

    contactName: "",
    emailId: "",
    phoneNumber: "",
    expiryDate: "",

    jobVisibility: "",

    advancedFields: {
      hostInstituteName: "",
      instituteLogo: null,
      bannerImage: null,
      campusRecruitingDate: "",
      applicationDeadline: "",
      mode: "",
      processDates: {
        preplacement: { from: "", to: "" },
        shortlisting: { from: "", to: "" },
        aptitudeTest: { from: "", to: "" },
        caseStudy: { from: "", to: "" },
        technicalTestMCQ: { from: "", to: "" },
        codingTest: { from: "", to: "" },
        hackathon: { from: "", to: "" },
        groupDiscussion: { from: "", to: "" },
        interview: { from: "", to: "" },
      },
      keywords: "",
    },

    assessments: {
      selectedAssessments: [],
      keepTestOpenFor: "",
    },
  });

  const [isAddCutOff, setIsAddCutOff] = useState(false);
  const [isAdvanceFeildOpen, setIsAdvanceFeildOpen] = useState(false);

  const advanceField = () => {
    setIsAdvanceFeildOpen(!isAdvanceFeildOpen);
  };

  const addCutOff = () => {
    setIsAddCutOff(!isAddCutOff);
  };

  // Handle checkbox change
  const handleCriteriaChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedCriteria = checked
        ? [...prevState.cutOffCriteria, { criteria: value, percentage: "" }]
        : prevState.cutOffCriteria.filter((item) => item.criteria !== value);

      return {
        ...prevState,
        cutOffCriteria: updatedCriteria,
      };
    });
  };

  const handleAdvancedFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      advancedFields: {
        ...prevData.advancedFields,
        [name]: value,
      },
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      advancedFields: {
        ...prevData.advancedFields,
        [name]: files[0],
      },
    }));
  };

  const handleProcessDatesChange = (e) => {
    const { name, value } = e.target;
    const [field, dateType] = name.split(".");
    setFormData((prevData) => ({
      ...prevData,
      advancedFields: {
        ...prevData.advancedFields,
        processDates: {
          ...prevData.advancedFields.processDates,
          [field]: {
            ...prevData.advancedFields.processDates[field],
            [dateType]: value,
          },
        },
      },
    }));
  };
  // Handle select change
  const handlePercentageChange = (e, criteria) => {
    const { value } = e.target;
    setFormData((prevState) => {
      const updatedCriteria = prevState.cutOffCriteria.map((item) =>
        item.criteria === criteria ? { ...item, percentage: value } : item
      );

      return {
        ...prevState,
        cutOffCriteria: updatedCriteria,
      };
    });
  };

  const handleSkillsChange = (skills) => {
    setSelectedSkills(skills);
    setFormData((prevData) => ({
      ...prevData,
      selectedSkills: skills,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    // Log selectedOptions for debugging
    console.log("Updated selectedOptions:", {
      ...selectedOptions,
      [name]: checked,
    });

    // Update formData to include selectedOptions
    setFormData((prevData) => ({
      ...prevData,
      jobPreference: {
        ...prevData.jobPreference,
        [name]: checked,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    console.log(process.env.REACT_APP_BACKEND_URL);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/job-postings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while submitting the form.");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      alert("submiited sucessfully");
      navigate("/jobs/viewjobs");
      // Handle success logic here, e.g., display a success message, clear form, etc.
    } catch (error) {
      console.log(error);
      console.error("Error submitting the form:", error);
      // Handle error logic here, e.g., display an error message to the user
    }
  };

  return (
    <div>
      <div className="bg-white border shadow-md rounded-lg m-2 p-2">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 mx-6">
            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Job Title <span className="text-red-600">*</span>
              </h1>
              <input
                type="text"
                name="jobTitle"
                placeholder="Enter Job Title"
                className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
                value={formData.jobTitle}
                onChange={handleChange}
                required
              />
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Location
              </h1>
              <input
                type="text"
                name="location"
                placeholder="Enter Location"
                value={formData.location}
                onChange={handleChange}
                className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              />
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Designation
              </h1>
              <input
                type="text"
                name="designation"
                placeholder="Enter designation"
                className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
                value={formData.designation}
                onChange={handleChange}
              />
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Industry
              </h1>
              <select
                name="industryType"
                id="industryType"
                className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-500"
                value={formData.industryType}
                onChange={handleChange}
              >
                <option value="">Select Industry</option>
                <option value="Aerospace">Aerospace</option>
                <option value="Transport">Transport</option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Telecommunication">Telecommunication</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Construction">Construction</option>
                <option value="Education">Education</option>
                <option value="Pharmaceutical">Pharmaceutical</option>
                <option value="Food">Food</option>
                <option value="Health care">Health care</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Entertainment">Entertainment</option>
                <option value="News Media">News Media</option>
                <option value="Energy">Energy</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Music">Music</option>
                <option value="Mining">Mining</option>
                <option value="BPO/KPO">BPO/KPO</option>
                <option value="Electronics">Electronics</option>
                <option value="Finance">Finance</option>
                <option value="Others">Others</option>
              </select>
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Job Posting Type
              </h1>
              <select
                name="jobPostingType"
                id="jobpostingtype"
                className="w-full rounded-lg bg-gray-100 border border-gray-300 text-gray-500"
                value={formData.jobPostingType}
                onChange={handleChange}
              >
                <option value="">Select Job Posting Type</option>
                <option value="Open Job">Open Job</option>
                <option value="Campus Recruitment">Campus Recruitment</option>
                <option value="Pool Campus Recruitment">
                  Pool Campus Recruitment
                </option>
              </select>
            </label>
          </div>

          {/* job description */}
          <div className="col-lg-12 col-md-12 col-sm-12 mx-7">
            <div className=" ">
              <h1 className="flex  items-start text-[#495677] font-semibold pb-2 text-sm">
                Job Description <span className="text-red-600">*</span>
              </h1>
              <textarea
                className="w-full"
                rows={4}
                name="jobDescription"
                placeholder="Write job Description here...."
                value={formData.jobDescription}
                onChange={handleChange}
                required
              />
              {/* <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: [
                    "undo",
                    "redo",
                    "|",
                    "bold",
                    "italic",

                    "|",
                    "link",
                    "bulletedList",
                    "numberedList",
                    "blockQuote",
                    "|",
                    "insertTable",
                    "mediaEmbed",
                    "imageUpload",
                    "|",
                    "heading",

                    "|",
                    "outdent",
                    "indent",
                  ],
                  image: {
                    toolbar: [
                      "imageTextAlternative",
                      "imageStyle:full",
                      "imageStyle:side",
                    ],
                  },
                  table: {
                    contentToolbar: [
                      "tableColumn",
                      "tableRow",
                      "mergeTableCells",
                    ],
                  },
                }}
              /> */}
            </div>
          </div>

          {/* job peference */}
          <div>
            <div className="flex  items-start mx-7 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Job Preference
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-sm ml-10 text-[#495677] font-semibold">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mx-4 rounded-sm"
                    name="fullTime"
                    checked={selectedOptions.fullTime}
                    onChange={handleCheckboxChange}
                  />
                  Full Time
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mx-4 rounded-sm"
                    name="partTime"
                    checked={selectedOptions.partTime}
                    onChange={handleCheckboxChange}
                  />
                  Part Time
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mx-4 rounded-sm"
                    name="internship"
                    checked={selectedOptions.internship}
                    onChange={handleCheckboxChange}
                  />
                  Internship
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mx-4 rounded-sm"
                    name="remote"
                    checked={selectedOptions.remote}
                    onChange={handleCheckboxChange}
                  />
                  Remote
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mx-4 rounded-sm"
                    name="workFromHome"
                    checked={selectedOptions.workFromHome}
                    onChange={handleCheckboxChange}
                  />
                  Compnay Office
                </label>
              </div>
            </div>
          </div>

          {/* sills set */}
          <Skills onSkillsChange={handleSkillsChange} />

          <Specialization
            educationDetails={formData.educationDetails}
            setEducationDetails={(educationDetails) =>
              setFormData({ ...formData, educationDetails })
            }
          />

          {/* Add cut off */}
          <div className="flex flex-col md:flex-row mx-7 my-7">
            <div
              className="bg-blue-900 text-white px-2 rounded mr-2 flex items-center h-10 text-sm"
              onClick={addCutOff}
            >
              <span className="mr-2">
                <i className="fa fa-plus" />
              </span>{" "}
              Add Cut-Off
            </div>

            {isAddCutOff && (
              <div className="ml-7 mt-5 md:mt-0  md:mx-28">
                {[
                  { label: "SSC", value: "SSC" },
                  { label: "HSC", value: "HSC" },
                  { label: "Diploma", value: "Diploma" },
                  { label: "Bachelors", value: "Bachelors" },
                  { label: "Master's", value: "Masters" },
                ].map((item, index) => (
                  <div className="flex items-center my-5" key={index}>
                    <div className="text-sm">
                      <input
                        className="rounded-sm p-0"
                        type="checkbox"
                        value={item.value}
                        onChange={handleCriteriaChange}
                      />
                      <label className="text-gray-400 font-bold pl-2 pt-2">
                        {item.label}
                      </label>
                    </div>
                    <div className="">
                      <select
                        name={`percentage-${item.value}`}
                        className="flex flex-col justify-center ml-10 md:ml-[120px] border p-0 text-sm pl-1 font-semibold bg-[#f2f2f2] text-[#808080] rounded-md"
                        onChange={(e) => handlePercentageChange(e, item.value)}
                      >
                        <option value="">Select</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                        <option value="60">60</option>
                        <option value="65">65</option>
                        <option value="70">70</option>
                        <option value="75">75</option>
                        <option value="80">80</option>
                        <option value="85">85</option>
                        <option value="90">90</option>
                        <option value="95">95</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex flex-col items-start mx-7">
              <label className="flex  items-start text-[#495677] font-bold pb-2 text-sm">
                {" "}
                Experience ( In Years (s))
                <span className="pl-1 text-red-600">*</span>
              </label>
              <div className="flex flex-col md:flex-row">
                <label className="text-[#495677] font-semibold my-2 md:my-0">
                  Min
                  <input
                    type="number"
                    required
                    value={formData.experience.min}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: {
                          ...formData.experience,
                          min: e.target.value,
                        },
                      })
                    }
                    className="w-20 mx-8 rounded-md border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                  />
                </label>
                <label className="text-[#495677] font-semibold">
                  Max
                  <input
                    required
                    type="number"
                    value={formData.experience.max}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experience: {
                          ...formData.experience,
                          max: e.target.value,
                        },
                      })
                    }
                    className="w-20 mx-8 rounded-md border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-col items-start mx-7 my-5">
              <label className="flex  items-start text-[#495677] font-bold pb-2 text-sm">
                {" "}
                Salary
                <span className="pl-1 text-red-600">*</span>
              </label>
              <div className="flex flex-col md:flex-row items-start">
                {" "}
                <label className="text-[#495677] font-semibold">
                  Min
                  <input
                    required
                    value={formData.salary.min}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salary: { ...formData.salary, min: e.target.value },
                      })
                    }
                    type="number"
                    className="w-20 mx-8 rounded-md border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                  />
                </label>
                <label className="text-[#495677] font-semibold">
                  Max
                  <input
                    type="number"
                    required
                    value={formData.salary.max}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salary: { ...formData.salary, max: e.target.value },
                      })
                    }
                    className="my-2 md:my-0 w-20 mx-2 ml-7 md:ml-0 rounded-md border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                  />
                </label>
                <label>
                  <select
                    id="currency"
                    value={formData.salary.currency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        salary: {
                          ...formData.salary,
                          currency: e.target.value,
                        },
                      })
                    }
                    className="my-2 md:my-0  w-28 md:w-20rounded-md border border-gray-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="USD">United States Dollars</option>
                    <option value="EUR">Euro</option>
                    <option value="GBP">United Kingdom Pounds</option>
                    <option value="DZD">Algeria Dinars</option>
                    <option value="ARP">Argentina Pesos</option>
                    <option value="AUD">Australia Dollars</option>
                    <option value="ATS">Austria Schillings</option>
                    <option value="BSD">Bahamas Dollars</option>
                    <option value="BBD">Barbados Dollars</option>
                    <option value="BEF">Belgium Francs</option>
                    <option value="BMD">Bermuda Dollars</option>
                    <option value="BRR">Brazil Real</option>
                    <option value="BGL">Bulgaria Lev</option>
                    <option value="CAD">Canada Dollars</option>
                    <option value="CLP">Chile Pesos</option>
                    <option value="CNY">China Yuan Renmimbi</option>
                    <option value="CYP">Cyprus Pounds</option>
                    <option value="CSK">Czech Republic Koruna</option>
                    <option value="DKK">Denmark Kroner</option>
                    <option value="NLG">Dutch Guilders</option>
                    <option value="XCD">Eastern Caribbean Dollars</option>
                    <option value="EGP">Egypt Pounds</option>
                    <option value="FJD">Fiji Dollars</option>
                    <option value="FIM">Finland Markka</option>
                    <option value="FRF">France Francs</option>
                    <option value="DEM">Germany Deutsche Marks</option>
                    <option value="XAU">Gold Ounces</option>
                    <option value="GRD">Greece Drachmas</option>
                    <option value="HKD">Hong Kong Dollars</option>
                    <option value="HUF">Hungary Forint</option>
                    <option value="ISK">Iceland Krona</option>
                    <option value="INR">India Rupees</option>
                    <option value="IDR">Indonesia Rupiah</option>
                    <option value="IEP">Ireland Punt</option>
                    <option value="ILS">Israel New Shekels</option>
                    <option value="ITL">Italy Lira</option>
                    <option value="JMD">Jamaica Dollars</option>
                    <option value="JPY">Japan Yen</option>
                    <option value="JOD">Jordan Dinar</option>
                    <option value="KRW">Korea (South) Won</option>
                    <option value="LBP">Lebanon Pounds</option>
                    <option value="LUF">Luxembourg Francs</option>
                    <option value="MYR">Malaysia Ringgit</option>
                    <option value="MXP">Mexico Pesos</option>
                    <option value="NLG">Netherlands Guilders</option>
                    <option value="NZD">New Zealand Dollars</option>
                    <option value="NOK">Norway Kroner</option>
                    <option value="PKR">Pakistan Rupees</option>
                    <option value="XPD">Palladium Ounces</option>
                    <option value="PHP">Philippines Pesos</option>
                    <option value="XPT">Platinum Ounces</option>
                    <option value="PLZ">Poland Zloty</option>
                    <option value="PTE">Portugal Escudo</option>
                    <option value="ROL">Romania Leu</option>
                    <option value="RUR">Russia Rubles</option>
                    <option value="SAR">Saudi Arabia Riyal</option>
                    <option value="XAG">Silver Ounces</option>
                    <option value="SGD">Singapore Dollars</option>
                    <option value="SKK">Slovakia Koruna</option>
                    <option value="ZAR">South Africa Rand</option>
                    <option value="KRW">South Korea Won</option>
                    <option value="ESP">Spain Pesetas</option>
                    <option value="XDR">Special Drawing Right (IMF)</option>
                    <option value="SDD">Sudan Dinar</option>
                    <option value="SEK">Sweden Krona</option>
                    <option value="CHF">Switzerland Francs</option>
                    <option value="TWD">Taiwan Dollars</option>
                    <option value="THB">Thailand Baht</option>
                    <option value="TTD">Trinidad and Tobago Dollars</option>
                    <option value="TRL">Turkey Lira</option>
                    <option value="VEB">Venezuela Bolivar</option>
                    <option value="ZMK">Zambia Kwacha</option>
                    <option value="EUR">Euro</option>
                    <option value="XCD">Eastern Caribbean Dollars</option>
                    <option value="XDR">Special Drawing Right (IMF)</option>
                    <option value="XAG">Silver Ounces</option>
                    <option value="XAU">Gold Ounces</option>
                    <option value="XPD">Palladium Ounces</option>
                    <option value="XPT">Platinum Ounces</option>
                  </select>
                </label>
              </div>
            </div>
          </div>

          {/* details */}
          <div className="grid grid-cols-1 md:grid-cols-2 mx-7">
            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Contact Name <span className="text-red-600">*</span>
              </h1>
              <input
                type="text"
                name="contactName"
                placeholder="Enter Contact person name"
                value={formData.contactName}
                onChange={handleChange}
                className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              />
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Email Id <span className="text-red-600">*</span>
              </h1>
              <input
                type="email"
                name="emailId"
                placeholder="Enter Contact person email"
                value={formData.emailId}
                onChange={handleChange}
                className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              />
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Phone Number <span className="text-red-600">*</span>
              </h1>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter Contact person phone no"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full h-10 bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500"
              />
            </label>

            <label className="flex flex-col items-start mr-10 my-5">
              <h1 className="text-[#495677] font-semibold pb-2 text-sm">
                Expiry
              </h1>

              <input
                type="date"
                name="expiryDate"
                placeholder="Enter expiry date"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full h-full bg-gray-100 rounded-md border border-gray-300 placeholder:text-gray-500 pl-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                id="date-input"
              />
            </label>
          </div>

          <Assesment
            handleChange1={handleChange}
            formData={formData}
            setFormData={setFormData}
          />

          {/* job visibility */}
          <div className="flex items-center mx-7 my-5">
            <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
              Job Visibility<span className="text-red-600">*</span>
            </label>
            <div className="flex items-center pb-2">
              <label className="mr-4 flex items-center text-sm text-[#495677]">
                <input
                  type="radio"
                  name="jobVisibility"
                  value="public"
                  checked={formData.jobVisibility === "public"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Public
              </label>
              <label className="flex items-center text-sm text-[#495677]">
                <input
                  type="radio"
                  name="jobVisibility"
                  value="private"
                  checked={formData.jobVisibility === "private"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Private
              </label>
            </div>
          </div>

          {/* adavnce feild */}
          <div className=" flex flex-col mx-7">
            <div className="flex flex-col items-start ">
              <span
                onClick={advanceField}
                className="box_shadow border border-blue-300 rounded-md py-2 px-7 text-[#5f6d79] hover:text-white hover:bg-[#1ac790]"
              >
                Advance Field <i className="pl-2 fa fa-arrow-right"></i>
              </span>
            </div>

            {/* {isAdvanceFeildOpen && <AdvanceField />} */}
            {isAdvanceFeildOpen && (
              <AdvanceField
                advancedFields={formData.advancedFields}
                onInputChange={handleAdvancedFieldChange}
                onFileChange={handleFileChange}
                onProcessDatesChange={handleProcessDatesChange}
              />
            )}
          </div>

          <div className="flex items-end justify-end mx-7 my-5">
            <span
              className="box_shadow border border-blue-300 rounded-md py-2 px-7 text-[#5f6d79] hover:text-white hover:bg-[#1ac790]"
              onClick={handleSubmit}
            >
              Save <i className="pl-2 fa fa-arrow-right"></i>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;
