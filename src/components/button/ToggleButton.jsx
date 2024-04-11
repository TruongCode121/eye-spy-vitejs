import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToggleMenu } from "../../redux/adminSlice";

const ToggleButton = () => {
  const { toggleMenu } = useSelector((state) => state.admins);
  console.log("togglemenu ", toggleMenu);
  const dispatch = useDispatch();
  return (
    <div
      className={`h-[32px] w-[64px]  bg-slate-600 rounded-full flex items-center cursor-pointer`}
      onClick={() => {
        dispatch(setToggleMenu(!toggleMenu));
      }}
    >
      <div
        className={`h-[26px] w-[26px] rounded-full ml-1 bg-white shadow-sm transition-all duration-500 ${
          !toggleMenu ? "translate-x-[30px] " : ""
        }`}
      ></div>
    </div>
  );
};

export default ToggleButton;
