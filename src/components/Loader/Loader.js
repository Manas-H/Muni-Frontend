import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="h-full w-full bg-white flex flex-col items-center">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
      Please Wait...
    </div>
  );
};

export default Loader;
