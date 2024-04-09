import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboarSidebar from "./DashboarSidebar";

const DashboardLayout = () => {
  const { toggleMenu } = useSelector((state) => state.admins);
  return (
    <div className="flex min-h-[100vh] bg-gray-100">
      <DashboarSidebar></DashboarSidebar>
      <div
        className={`${
          !toggleMenu
            ? `ml-[250px] w-full duration-500 transition-all`
            : `ml-0 w-full duration-500 transition-all `
        }`}
      >
        <DashboardHeader></DashboardHeader>
        <div className={`p-3 mt-20 w-full`}>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
