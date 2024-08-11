import React from "react";
import Swal from "sweetalert2";

const Modal = ({ closeModal, onAssessmentSelect, selectedAssessments }) => {
  const assessments = [
    { title: "HTML & CSS Basics", questions: 20, minutes: 30 },
    { title: "JavaScript Fundamentals", questions: 25, minutes: 40 },
    { title: "React.js Advanced", questions: 30, minutes: 45 },
    { title: "Node.js & Express", questions: 20, minutes: 35 },
    { title: "Database Management", questions: 15, minutes: 25 },
    { title: "Python for Data Science", questions: 30, minutes: 50 },
    { title: "Machine Learning Basics", questions: 25, minutes: 40 },
    { title: "Algorithms & Data Structures", questions: 20, minutes: 35 },
    { title: "Software Engineering Principles", questions: 15, minutes: 30 },
    { title: "Cybersecurity Fundamentals", questions: 20, minutes: 30 },
    { title: "DevOps Practices", questions: 25, minutes: 45 },
    { title: "Cloud Computing", questions: 30, minutes: 50 },
  ];

  const isAssessmentSelected = (assessment) =>
    selectedAssessments.some(
      (selected) => selected.value.title === assessment.title
    );

  const handleCardClick = (assessment) => {
    if (!isAssessmentSelected(assessment)) {
      Swal.fire({
        title: "Are you sure?",
        text: "Are you sure you want to select this assessment?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#c1c1c1",
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes",
        reverseButtons: true,
        customClass: {
          confirmButton: "swal2-confirm-button",
          cancelButton: "swal2-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          onAssessmentSelect(assessment); // Pass the selected assessment to parent
        }
      });
    }
  };

  //   .then((result) => {
  //     if (result.isConfirmed) {
  //       // Send the assessment details to the backend
  //       fetch("YOUR_BACKEND_ENDPOINT", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(assessment),
  //       })
  //         .then((response) => response.json())
  //         .then((data) => {
  //           Swal.fire(
  //             "Selected!",
  //             "The assessment has been selected.",
  //             "success"
  //           );
  //         })
  //         .catch((error) => {
  //           Swal.fire(
  //             "Error!",
  //             "There was an error selecting the assessment.",
  //             "error"
  //           );
  //         });
  //     }
  //   });
  // };

  return (
    <div className="">
      <div className="bg-black bg-opacity-30 fixed top-0 left-0 z-50 flex justify-center w-full h-screen md:inset-0 overflow-y-auto">
        <div className="relative p-4 w-full md:max-w-5xl mt-3 ">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-[450px]">
            {/* <!-- Modal header --> */}
            <div className="flex items-center md:pt-4 md:pb-10 rounded-t dark:border-gray-600">
              <div className="flex flex-col md:relative left-96 ml-16 md:ml-0">
                <h3 className="text-xl font-semibold text-[#2d3954] dark:text-white">
                  Edit Data
                </h3>
                <p className="text-base font-semibold text-[#2d3954] dark:text-white">
                  Click On Assessment to add
                </p>
              </div>
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

            <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 overflow-y-auto h-[calc(100%-200px)]">
              {assessments.map((assessment, index) => (
                <div
                  key={index}
                  className={`bg-white shadow-md md:w-48 rounded-lg px-2 border border-gray-300 py-4 my-5 mx-2 cursor-pointer flex flex-col justify-between ${
                    isAssessmentSelected(assessment)
                      ? "bg-gray-500 cursor-not-allowed"
                      : "hover:bg-[#0a294f] text-black hover:text-white"
                  }`}
                  onClick={() => handleCardClick(assessment)}
                >
                  <h2 className="text-left text-sm font-semibold">
                    {assessment.title}
                  </h2>
                  <div className="flex justify-between text-xs items-center">
                    <p className="mt-2">Questions: {assessment.questions}</p>
                    <p className="mt-1">Time: {assessment.minutes} mins</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center md:p-3 pb-2 pt-2 border-t rounded-b dark:border-gray-600">
              <button
                className="bg-[#0a294f] text-white text-semibold px-6 py-1.5 rounded-lg"
                onClick={closeModal}
              >
                Close
              </button>
              <button className="bg-[#a72d38] text-white text-semibold mx-3 px-6 py-1.5 rounded-lg">
                Select
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
