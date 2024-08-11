import React, { useState } from "react";
import RegisterTop from "../components/register/RegisterTop";
import RegisterForm from "../components/register/RegisterForm";
import Employers from "../components/register/Employers";
import Universities from "../components/register/Universities";

const Register = () => {
  const [activeTab, setActiveTab] = useState(1);

  const renderForm = () => {
    switch (activeTab) {
      case 1:
        return <RegisterForm />;
      case 2:
        return <Employers />;
      case 3:
        return <Universities />;
      default:
        return <RegisterForm />;
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-[100vh] ">
      <div className=" w-full md:w-[50%] md:h-[100vh] mt-64 md:mt-0 ">{renderForm()}</div>
      <div className="w-full md:w-[50%] bg-gray-100 absolute md:fixed top-0 right-0 md:h-[100vh] md:overflow-hidden">
        <RegisterTop activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default Register;
