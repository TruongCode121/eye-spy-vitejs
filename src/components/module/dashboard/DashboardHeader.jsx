import React from "react";
import { useSelector } from "react-redux";
import { hom20 } from "../../../assets/img/home";
import { ToggleButton, ToggleDarkMode } from "../../button";

const DashboardHeader = () => {
  const { toggleMenu } = useSelector((state) => state.admins);
  return (
    <div
      className={`h-20 transition-all duration-500 ${
        toggleMenu ? " w-full" : "w-[calc(100%_-_250px)]"
      } bg-white shadow-sm fixed z-10 px-3`}
    >
      <div className=" flex justify-between gap-x-5 items-center h-full">
        <ToggleButton></ToggleButton>
        <div className="flex items-center gap-x-5">
          <ToggleDarkMode className="bg-slate-700 text-white"></ToggleDarkMode>
          <div className="flex items-center gap-x-4  rounded ">
            <img src={hom20} alt="" className="w-9 h-9 rounded-full" />
            <span className="font-medium">X.Trường.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
