import React from "react";
import { useSelector } from "react-redux";
import { hom20 } from "../../../assets/img/home";
import { ToggleButton } from "../../button";
import ToggleDarkMode from "../../darkmode/ToggleDarkMode";

const DashboardHeader = () => {
  const { toggleMenu } = useSelector((state) => state.admins);
  const { auth } = useSelector((state) => state.auth);
  return (
    <div
      className={`h-20 transition-all duration-500 ${
        toggleMenu ? " w-full" : "w-[calc(100%_-_250px)]"
      } bg-white shadow-sm fixed z-10 px-3`}
    >
      <div className=" flex justify-between gap-x-5 items-center h-full">
        <ToggleButton></ToggleButton>
        <div className="flex items-center gap-x-5">
          <ToggleDarkMode></ToggleDarkMode>
          <div className="flex items-center gap-x-4  rounded ">
            <img
              src={auth[0].avatar}
              alt=""
              className="w-10 h-10 rounded-full border-2"
            />
            <span className="font-medium">{auth[0].fullname}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
