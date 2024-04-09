import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import CabinIcon from "@mui/icons-material/Cabin";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import RemoveIcon from "@mui/icons-material/Remove";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import GradingIcon from "@mui/icons-material/Grading";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { logoAdmin } from "../../../assets/img/home";

const dataSidebarAdmin = [
  {
    id: uuidv4(),
    title: "Home",
    href: "/",
    icon: <CabinIcon sx={{ fontSize: "18px" }}></CabinIcon>,
  },
  {
    id: uuidv4(),
    title: "Dashboard",
    href: "/dashboard-page",
    icon: <DashboardIcon sx={{ fontSize: "18px" }}></DashboardIcon>,
  },
  {
    id: uuidv4(),
    title: "Accounts",
    href: "manage/accounts",
    icon: (
      <PermContactCalendarIcon
        sx={{ fontSize: "18px" }}
      ></PermContactCalendarIcon>
    ),
  },
  {
    id: uuidv4(),
    title: "Products",
    href: "manage/products",
    icon: <CategoryIcon sx={{ fontSize: "18px" }}></CategoryIcon>,
  },
  {
    id: uuidv4(),
    title: "Order",
    href: "/manage/order",
    icon: <GradingIcon sx={{ fontSize: "18px" }}></GradingIcon>,
  },
  {
    id: uuidv4(),
    title: "Blog",
    href: "/manage/post",
    icon: <NewspaperIcon sx={{ fontSize: "18px" }}></NewspaperIcon>,
  },
  {
    id: uuidv4(),
    title: "Setting",
    href: "/setting",
    icon: <SettingsIcon sx={{ fontSize: "18px" }}></SettingsIcon>,
  },
];
const MenuStyless = styled.div`
  .active {
    background-color: #f3f4f6;
    color: #263544;
    /* border-left: 5px solid #049fbb; */
    padding-left: 50px;
  }
`;
const DashboarSidebar = () => {
  const [selected, setSelected] = useState(null);
  const [link, setLink] = useState("");
  const handleLinkAdmin = (href) => {
    setLink(href);
  };
  const dropItemHandler = (index) => {
    console.log("index", index);
    if (selected == index) {
      return setSelected(null);
    }
    setSelected(index);
  };
  console.log("link", link);
  const { toggleMenu } = useSelector((state) => state.admins);
  return (
    <div
      className={`h-full ${
        !toggleMenu
          ? " w-[250px] transition-all duration-500"
          : " transition-all duration-500 w-0 z-10"
      } fixed bg-[#263544]`}
    >
      <div
        className={`h-20 flex justify-center items-center  shadow-md z-10 sticky top-0 `}
      >
        <img src={logoAdmin} alt="" className="mx-auto " />
      </div>
      {/* sticky top-[100px] left-[-20px]
      sticky top-[120px] */}
      <MenuStyless
        className={`h-[calc(100%_-_150px)] pt-4 ${
          toggleMenu == true
            ? "-ml-[200px] transition-all duration-500 "
            : " transition-all duration-500 "
        } scrollbar-thin scrollbar-thumb-slate-400 overflow-x-hidden scrollbar-track-transparent text-white font-medium `}
      >
        {dataSidebarAdmin.map((item) => (
          <NavLink
            to={item.href}
            key={item.id}
            className="px-[34px] py-3 flex items-center gap-x-5 hover:bg-slate-800 transition-all duration-300 "
          >
            {item.icon} {item.title}
          </NavLink>
        ))}
        <div className={` text-slate-700 absolute bottom-2 min-w-full px-2`}>
          <div className="flex items-center justify-between  bg-slate-100 p-2 rounded cursor-pointer">
            <div className=" flex items-center gap-x-4">
              <MeetingRoomIcon sx={{ fontSize: "18px" }}></MeetingRoomIcon>
              <span>Log Out</span>
            </div>
            <SubdirectoryArrowRightIcon
              sx={{ fontSize: "18px" }}
            ></SubdirectoryArrowRightIcon>
          </div>
        </div>
      </MenuStyless>
    </div>
  );
};

export default DashboarSidebar;
