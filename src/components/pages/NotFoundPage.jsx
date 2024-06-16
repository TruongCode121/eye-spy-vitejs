import React from "react";
import { NavLink } from "react-router-dom";
import img404 from "../../assets/img/home/undraw_Page_not_found.png";
const NotFoundPage = () => {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-indigo-700 flex flex-col justify-center items-center h-[100vh] w-full">
      <img src={img404} alt="" className="w-1/3 rounded" />
      <div className="font-medium my-3 text-white">
        This page does not exist!
      </div>
      <NavLink
        to="/"
        className="btn btn-info text-slate-200 px-10 hover:bg-cyan-500 font-medium"
      >
        BACK TO HOME
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
