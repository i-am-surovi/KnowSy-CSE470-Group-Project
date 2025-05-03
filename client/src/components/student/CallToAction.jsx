import React from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-sm">
        Access knowledge at your pace with no limits and no barriers. Discover
        curated content tailored to you wherever and whenever you choose to
        grow.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button
          onClick={() => navigate("/course-list")}
          className="px-10 py-3 rounded-md text-white bg-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-md"
        >
          Get started
        </button>
        <button
          onClick={() => navigate("/about-us")}
          className="flex items-center gap-2 transition-all duration-300 hover:text-blue-600"
        >
          Learn more <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
