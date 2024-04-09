import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../../redux/globalSlice";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
const ToggleDarkMode = ({ className }) => {
  const { darkMode } = useSelector((state) => state.globals);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className={`h-8 w-14 rounded select-none ${
          className ? className : "bg-white"
        } flex justify-center items-center cursor-pointer`}
        onClick={() => {
          dispatch(setDarkMode(!darkMode));
        }}
      >
        {darkMode ? (
          <WbSunnyIcon></WbSunnyIcon>
        ) : (
          <NightsStayIcon></NightsStayIcon>
        )}
      </div>
    </>
  );
};

export default ToggleDarkMode;
