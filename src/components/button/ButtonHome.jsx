import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ButtonHome = ({ children, className = "", onClick = () => {} }) => {
  return (
    <>
      <button
        type="button"
        className={`flex justify-center items-center font-bold py-2 px-4 gap-x-3   ${
          className
            ? className
            : "hover:text-white hover:bg-black border-black border"
        }`}
        onClick={onClick}
      >
        {children}
        {className == "" && (
          <ArrowForwardIcon
            sx={{ fontSize: "13px", mt: "2px" }}
          ></ArrowForwardIcon>
        )}
      </button>
    </>
  );
};

export default ButtonHome;
