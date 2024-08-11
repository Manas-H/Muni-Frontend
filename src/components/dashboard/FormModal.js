import React, { useState, useEffect } from "react";

const FormModal = ({
  closeModal,
  initialStep,
  updateCardData,
  title: initialTitle,
  description: initialDescription,
}) => {
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [step, setStep] = useState(
    parseInt(initialStep.split(" ")[1], 10) || 1
  );

  useEffect(() => {
    setStep(parseInt(initialStep.split(" ")[1], 10) || 1);
    setTitle(initialTitle || "");
    setDescription(initialDescription || "");
  }, [initialStep, initialTitle, initialDescription]);

  const handleTitleChange = (e) => {
    if (e.target.value.length <= 30) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length <= 100) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async () => {
    const formData = { step, title, description };
    console.log("this is formdata", formData);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/steps`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();
      console.log("Response from backend:", result);
      alert("Data Added Sucessfully");
      updateCardData(step, title, description);

      // Close the modal after successful submission
      closeModal();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="">
      <div className="bg-black bg-opacity-30 overflow-y-auto overflow-x-hidden fixed top-0 z-50 flex justify-center w-full md:inset-0 h-[calc(100%-0rem)] max-h-full">
        <div className="relative p-4 w-full md:max-w-7xl max-h-full md:mx-20 mt-3">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-[#2e68a3] dark:text-white">
                Edit Data
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={closeModal}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5 space-y-4">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="float-left">
                  <label className="text-[#2e68a3] text-base float-left">
                    Step
                  </label>
                </div>
                <div className="w-full my-2 md:ml-64 md:mr-20">
                  <select
                    name="step"
                    id="step"
                    value={`Step ${step}`}
                    onChange={(e) =>
                      setStep(parseInt(e.target.value.split(" ")[1], 10))
                    }
                    className="w-full p-0.5 px-4 rounded-md bg-gray-300 text-gray-700"
                    disabled
                  >
                    <option value="Step 1">Step 1</option>
                    <option value="Step 2">Step 2</option>
                    <option value="Step 3">Step 3</option>
                    <option value="Step 4">Step 4</option>
                    <option value="Step 5">Step 5</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <div className="float-left">
                  <label className="text-[#2e68a3] text-base float-left">
                    Title<span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="w-full my-2 md:ml-[250px] md:mr-20">
                  <input
                    name="title"
                    id="title"
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full p-0.5 px-4 rounded-md bg-white text-gray-500"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <div className="float-left">
                  <label className="text-[#2e68a3] text-base float-left">
                    Description<span className="text-red-600">*</span>
                  </label>
                </div>
                <div className="w-full my-2 md:ml-[198px] md:mr-20 ">
                  <input
                    name="description"
                    id="description"
                    type="text"
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full p-0.5 px-4 rounded-md bg-white text-gray-500"
                  />
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                type="button"
                className="shadow-2xl box_shadow px-2.5 text-sm font-normal py-1 text-gray-500 focus:ring-4 focus:outline-none border focus:ring-blue-300 text-center hover:bg-gray-100"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="box_shadow ml-3 px-2.5 text-sm font-normal py-1 text-gray-500 focus:outline-none bg-white  border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
