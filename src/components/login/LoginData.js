import React from "react";
import Slideshow from "./Slideshow";

const LoginData = () => {
  return (
    <div>
      <div className="p-3 mt-2 mb-2">
        <img src="/Assets/seagull_logo_red.png" alt="logo" className="mx-auto w-24"/>
      </div>

      <div className="p-3 mx-2">
        <img src="/Assets/login-main3.png" alt="logo" className="mx-auto w-[520px]"/>
      </div>

      <div>
        <Slideshow />
      </div>
    </div>
  );
};

export default LoginData;
