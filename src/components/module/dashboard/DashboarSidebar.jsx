import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import CategoryIcon from "@mui/icons-material/Category";
import SettingsIcon from "@mui/icons-material/Settings";
import CabinIcon from "@mui/icons-material/Cabin";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import GradingIcon from "@mui/icons-material/Grading";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { logoAdmin } from "../../../assets/img/home";
import { setCart } from "../../../redux/productSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setAuth } from "../../../redux/authSlice";
import RemoveIcon from "@mui/icons-material/Remove";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import CalendarViewMonthIcon from "@mui/icons-material/CalendarViewMonth";
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
    icon: (
      <CalendarViewMonthIcon sx={{ fontSize: "18px" }}></CalendarViewMonthIcon>
    ),
  },
  {
    id: uuidv4(),
    title: "Categorys",
    href: "manage/categorys",
    icon: <CategoryIcon sx={{ fontSize: "18px" }}></CategoryIcon>,
  },
  {
    id: uuidv4(),
    title: "brands",
    href: "manage/brands",
    icon: (
      <BrandingWatermarkIcon sx={{ fontSize: "18px" }}></BrandingWatermarkIcon>
    ),
  },
  {
    id: uuidv4(),
    title: "Material",
    href: "manage/materials",
    icon: (
      <AutoAwesomeMotionIcon sx={{ fontSize: "18px" }}></AutoAwesomeMotionIcon>
    ),
  },
  {
    id: uuidv4(),
    title: "Order",
    href: "/manage/orders",
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleLogOut = () => {
    Swal.fire({
      title: `Đăng xuất khỏi hệ thống?`,
      // text: `Bạn sẽ không thể khôi phục`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đăng xuất!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(setAuth([]));
        dispatch(setCart([]));
        toast("Log out success!");
        navigate("/");
      }
    });
  };
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
        <div
          className={` text-slate-700 absolute bottom-2 min-w-full px-2`}
          onClick={handleLogOut}
        >
          <div className="flex items-center justify-between  bg-slate-100 hover:bg-slate-300 p-2 rounded cursor-pointer">
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
