import React, { useState } from "react";
// import Loader from "../components/Loader/Loader";
import Header from "../components/Header/Header";
import Select from "react-select";
import Sidebar from "../components/dashboard/SideBar";

const CampusReach = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInstitutions, setSelectedInstitutions] = useState([]);

  const institutionsOptions = [
    { value: "373", label: "Acharya Bangalore B-School" },
    { value: "69", label: "Test Institute (Test)" },
    { value: "492", label: "Goa Institute of Management" },
    {
      value: "495",
      label: "Goa College of Engineering, Farmagudi, Ponda, Goa",
    },
    {
      value: "1715",
      label: "Pillai HOC College of Engineering & Technology, Rasayani",
    },
    {
      value: "2",
      label:
        "Aegis School of Business, Data Science, Cyber Security & Telecommunication",
    },
    // Add more institutions as needed...
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleInstitutionsChange = (selectedOptions) => {
    setSelectedInstitutions(selectedOptions);
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

        <div className="border border-gray-300 m-4">
          <div className="py-3 text-left px-3 text-base font-bold border-b-[1px] border-gray-300">
            <strong className="card-title">
              Campus Recruitment Request Form
            </strong>
          </div>

          <div className="bg-white">
            <div className="py-7">
              <div>
                <span
                  className={`p-4 rounded-lg text-base font-semibold text-white ${
                    currentStep === 1 ? "bg-[#232b46]" : "bg-gray-400"
                  }`}
                >
                  Step 1
                </span>
                <span
                  className={`p-4 rounded-lg text-base font-semibold text-white ml-2 ${
                    currentStep === 2 ? "bg-[#232b46]" : "bg-gray-400"
                  }`}
                >
                  Step 2
                </span>
              </div>
            </div>

            {/* Step 1 Form */}
            {currentStep === 1 && (
              <div>
                <div className="flex items-center mx-7 my-5">
                  <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
                    Job Visibility<span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center pb-2">
                    <label className="mr-4 flex items-center text-sm text-[#495677]">
                      <input
                        type="radio"
                        name="jobVisibility"
                        value="offcampus"
                        className="mr-2"
                      />
                      Off Campus
                    </label>
                    <label className="flex items-center text-sm text-[#495677]">
                      <input
                        type="radio"
                        name="jobVisibility"
                        value="closecampus"
                        className="mr-2"
                      />
                      Closed Campus
                    </label>
                  </div>
                </div>

                <div className="flex items-center mx-7 my-5">
                  <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
                    Institution<span className="text-red-600">*</span>
                  </label>
                  <Select
                    isMulti
                    name="institutions"
                    options={institutionsOptions}
                    className="w-full"
                    classNamePrefix="select"
                    value={selectedInstitutions}
                    onChange={handleInstitutionsChange}
                    placeholder="Select institutions..."
                  />
                </div>

                <div className="flex items-center mx-7 my-5">
                  <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
                    Job Visibility<span className="text-red-600">*</span>
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="from_preplacement_date"
                      className="w-20 md:w-full py-2 border-none bg-gray-200 border border-gray-200 rounded-md placeholder:text-gray-600 p-0 placeholder:pl-3"
                      placeholder="From"
                      name="preplacement.from"
                      onFocus={(e) => {
                        e.target.type = "date";
                        e.target.showPicker();
                      }}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                    &nbsp;&nbsp;&nbsp;
                    <input
                      type="text"
                      id="to_preplacement_date"
                      className=" w-20 md:w-full py-2 placeholder:pl-3 border-none bg-gray-200 border border-gray-200 rounded-md placeholder:text-gray-600 p-0"
                      placeholder="To"
                      name="preplacement.to"
                      onFocus={(e) => {
                        e.target.type = "date";
                        e.target.showPicker();
                      }}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                  </div>
                </div>

                <div className="flex items-start mx-7 my-5">
                  <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
                    Campus Process
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-2 gap-x-32 gap-y-5 items-center">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Preplacement
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Coding test
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Aptitude Test
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Hackathon
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Case Study
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Group Discussion
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Technical Test MCQ
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Interview
                      </h1>
                    </label>

                    <label className="flex items-center">
                      <input type="checkbox" className="rounded-md" />
                      <h1 className="pl-2 text-[#495677] font-semibold">
                        Other
                      </h1>
                    </label>
                  </div>
                </div>

                <div className="flex items-center mx-7 my-5">
                  <label className="text-[#495677] font-semibold pb-2 text-sm mr-5">
                    Campus Mode<span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center pb-2">
                    <label className="mr-4 flex items-center text-sm text-[#495677]">
                      <input
                        type="radio"
                        name="campusMode"
                        value="oncampus"
                        className="mr-2"
                      />
                      On Campus
                    </label>
                    <label className="flex items-center text-sm text-[#495677]">
                      <input
                        type="radio"
                        name="campusMode"
                        value="online"
                        className="mr-2"
                      />
                      Online
                    </label>
                  </div>
                </div>

                <div className="flex justify-start mx-7 my-5">
                  <button
                    className="px-2 py-1.5 border border-gray-600 box_shadow ml-5 hover:bg-[#1ac790] hover:text-white hover:border-none hover:font-semibold"
                    onClick={handleNextStep}
                  >
                    Save & Next <i className="fa fa-arrow-right" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 Form */}
            {currentStep === 2 && (
              <div className="px-7 py-5">
                <div className="flex items-center my-5">
                  <label className="text-[#495677] font-semibold pb-2 text-sm mr-5 w-32">
                    Select Option<span className="text-red-600">*</span>
                  </label>
                  <select className="overflow-y-scroll w-full border border-gray-300 rounded-md p-2">
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </select>
                </div>

                <div className="flex justify-start my-5">
                  <button
                    className="py-1.5 border border-gray-600 box_shadow ml-5 hover:bg-[#1ac790] hover:text-white hover:border-none hover:font-semibold px-3"
                    onClick={handlePreviousStep}
                  >
                    <i className="fa fa-arrow-left " /> Back
                  </button>
                  <button className="px-2 py-1.5 border border-gray-600 box_shadow ml-5 hover:bg-[#1ac790] hover:text-white hover:border-none hover:font-semibold">
                    Submit <i className="fa fa-arrow-right" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusReach;
