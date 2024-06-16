import React from "react";

const Overplay = ({ toggle, status = false, onClick = () => {} }) => {
  return (
    <>
      <div
        className={`bg-slate-900 opacity-50 fixed top-0 left-0 w-full h-full z-10 ${
          !toggle && "d-none"
        }`}
        onClick={() => {
          onClick(status);
        }}
      ></div>
    </>
  );
};

export default Overplay;
