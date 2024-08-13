import React, { useState, useEffect } from "react";
import FormModal from "./FormModal";
import Card from "./Card";
import Indicators from "./Indicators";
import Loader from "../Loader/Loader";

const Dashworkflow = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState("Step 1");
  const [loading, setLoading] = useState(true);
  const [cardsData, setCardsData] = useState(
    Array(5).fill({ title: "", description: "" })
  );
  // const initialCards = [1, 2, 3, 4, 5];

  useEffect(() => {
    // Fetch data from backend
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/steps`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const result = await response.json();
        // Ensure cardsData is set correctly based on fetched result
        const stepsArray = Array(5).fill({ title: "", description: "" });
        result.forEach((step) => {
          const index = step.step - 1;
          if (index >= 0 && index < stepsArray.length) {
            stepsArray[index] = {
              title: step.title,
              description: step.description,
            };
          } else {
            console.error("Invalid step index:", index);
          }
        });
        setCardsData(stepsArray);
      } catch (error) {
        console.error("Error fetching steps:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleGearClick = (step) => {
    console.log("clicked");
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("clicked");

    setIsModalOpen(false);
  };
  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const updateCardData = (step, title, description) => {
    // const stepIndex = parseInt(String(step).split(" ")[1]) - 1;
    const stepIndex = step - 1;
    // const a = stepIndex - 1;
    // console.log("Raw step value:", step);
    // console.log("steps", stepIndex)
    // console.log("steps a", a)
    // Check if stepIndex is valid
    if (stepIndex >= 0 && stepIndex < cardsData.length) {
      const updatedCards = [...cardsData];
      updatedCards[stepIndex] = { title, description };
      setCardsData(updatedCards);
    } else {
      console.error("Invalid stepIndex:", stepIndex);
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
    <div className="bg-gray-100 w-full">
      <div className="w-full">
        <div className="flex justify-between items-center mx-8 my-5 py-3">
          <p className="font-bold">Campus Hiring Workflow</p>

          <label className="switch inline-flex items-center cursor-pointer">
            <input
              className="switch-input hidden"
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span
              className={`switch-label ${
                isChecked ? "bg-[#0a294f]" : "bg-[#0a294f]"
              } flex justify-between items-center w-16 h-7 rounded-full`}
              data-on="Edit"
              data-off="Hide"
            >
              <span
                className={`switch-handle transform transition-transform ${
                  isChecked ? "translate-x-10" : "translate-x-0"
                } bg-white w-14 h-6 rounded-full shadow-md`}
              ></span>
              {isChecked ? (
                <span className="text-xs text-white w-20 text-start relative">
                  <span className="text-start relative right-3">Edit</span>
                </span>
              ) : (
                <span className="text-xs text-white w-20 ">Hide</span>
              )}
            </span>
          </label>
        </div>
      </div>

      {/* flex flex-col md:flex-row mx-14 md:mx-4 bg-white rounded-lg p-1 */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 mx-14 gap-3  md:mx-4 bg-white rounded-lg p-3">
        {cardsData.map((card, index) => (
          <div
            key={index} // Add a unique key prop here
            className="relative border bg-[#0a294f] w-full sm:w-min-24 md:min-w-32 lg:min-w-40 min-h-16 cursor-pointer rounded-lg my-1 "
          >
            <div
              className="float-right absolute right-0"
              onClick={() => handleGearClick(`Step ${index + 1}`)}
            >
              {isChecked && <i className="fa fa-gear text-white text-lg"></i>}
            </div>
            <div className="w-full flex flex-col items-start flex-wrap text-white">
              <h1 className="font-bold break-words overflow-hidden pr-4 pl-2 pt-1 text-start text-xs">
                {card.title || "Title"}
              </h1>
              <p className="w-full break-words overflow-hidden pr-4 pl-2 py-1 text-start text-[9px] ">
                {card.description || "Description"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <FormModal
          closeModal={closeModal}
          initialStep={selectedStep}
          updateCardData={updateCardData}
          title={cardsData[selectedStep.split(" ")[1] - 1].title}
          description={cardsData[selectedStep.split(" ")[1] - 1].description}
        />
      )}

      <Card />
      <Indicators />
    </div>
  );
};

export default Dashworkflow;
