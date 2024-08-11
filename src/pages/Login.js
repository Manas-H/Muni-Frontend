import React from "react";
import LoginFrom from "../components/login/LoginFrom";
import LoginData from "../components/login/LoginData";

const Login = () => {
  return (
    <div className="flex h-[100vh] ">
      <div className="hidden md:block w-[50%] bg-gray-100">
        <LoginData />
      </div>
      <div className="w-full md:w-[50%]">
        <LoginFrom />
      </div>
    </div>
  );
};

export default Login;
