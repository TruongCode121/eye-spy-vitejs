import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/img/home/logo.webp";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Overplay from "./Overplay";
import { ButtonCart } from "../button";
import CartModal from "../module/cart/CartModal";
import { useDispatch, useSelector } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { setCart } from "../../redux/productSlice";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { setAuth } from "../../redux/authSlice";
import ToggleDarkMode from "../darkmode/ToggleDarkMode";
import SwitchDarkMode from "../darkmode/SwitchDarkMode";
import { BsSunFill } from "react-icons/bs";
import { TbMoonStars } from "react-icons/tb";
const dataMenu = [
  {
    id: uuidv4(),
    title: "Trang chủ",
    href: "/",
  },
  {
    id: uuidv4(),
    title: "Sản phẩm",
    href: "/products-page",
  },
  {
    id: uuidv4(),
    title: "Về EYE SPY",
    href: "/introduce-page",
  },
  {
    id: uuidv4(),
    title: "Blog",
    href: "/blog-page",
  },
  {
    id: uuidv4(),
    title: "Đơn hàng",
    href: "/order-page",
  },
  {
    id: uuidv4(),
    title: "Đăng nhập",
    href: "/login-page",
  },
];
const UL = styled.ul`
  .active {
    border-bottom: 2px solid #333;
    padding-bottom: 5px;
  }
  li > a:hover {
    border-bottom: 2px solid #333;
    padding-bottom: 5px;
  }

  li:hover {
    cursor: pointer;
    /* background-color: darkkhaki; */
    user-select: none;
  }
`;

const Header = () => {
  const { handleToggleDarkMode } = SwitchDarkMode();
  const { auth } = useSelector((state) => state.auth);
  const { carts } = useSelector((state) => state.products);
  const { darkMode } = useSelector((state) => state.globals);
  console.log("darkMode", darkMode);
  const [tgCart, setTgCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const className = "overflow-y-hidden";
    const element = window.document.querySelector("body");
    if (tgCart) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [tgCart]);
  const getQuantity = () => {
    let sum = 0;
    carts?.map((item) => (sum += item.quantity));
    return sum;
  };
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
        navigate("/");
        dispatch(setCart([]));
        toast("Exited the system!");
      }
    });
  };
  return (
    <div
      className={` pt-4 pb-3 w-full flex-col sticky top-0 z-30 dark:text-white ${
        darkMode ? "bg-slate-600" : "bg-white"
      }`}
    >
      <div className="flex justify-center  ">
        <img src={logo} alt="" />
      </div>
      <UL className="flex gap-x-8 justify-center mt-3 text-[14px] relative">
        {auth.length > 0
          ? dataMenu.map((item) => {
              if (item.title == "Đăng nhập") return;
              return (
                <li key={item.id}>
                  <NavLink to={item.href}>{item.title}</NavLink>
                </li>
              );
            })
          : dataMenu.map((item) => {
              return (
                <li key={item.id}>
                  <NavLink to={item.href}>{item.title}</NavLink>
                </li>
              );
            })}
        <div
          className={`absolute right-36 top-[50%] translate-y-[-50%] ${
            auth.length > 0 ? "hidden" : ""
          }`}
        >
          <ToggleDarkMode></ToggleDarkMode>
        </div>
        {auth.length == 0 && <ButtonCart setTgCart={setTgCart}></ButtonCart>}
        {auth.length > 0 ? (
          <div className="group bg-slate-100 dark:bg-slate-500 hover:bg-slate-200 hover:rounded-t-lg hover:rounded-b-none cursor-pointer absolute right-8 top-[50%] translate-y-[-50%] px-2 py-1 rounded-lg">
            <div className="flex gap-x-2 items-center ">
              <img
                src={auth[0].avatar}
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <span>{auth[0].fullname}</span>
              <ArrowDropDownIcon></ArrowDropDownIcon>
            </div>
            {getQuantity() > 0 && (
              <div className=" absolute top-[-50%] translate-y-[50%] -right-1 bg-red-600 text-white h-5 w-5 rounded-full flex justify-center items-center">
                {getQuantity()}
              </div>
            )}

            <div className="absolute font-medium rounded w-full border bg-white group-hover:inline-block group-hover:right-0 hidden p-2">
              <div
                onClick={() => setTgCart(true)}
                className={`flex justify-between items-center  border-b-2 gap-x-2 ${
                  getQuantity() > 0 ? "text-red-500" : "text-slate-600"
                }  hover:border-b-2 p-1 hover:text-cyan-500`}
              >
                <LocalMallIcon sx={{ fontSize: "20px" }}></LocalMallIcon>
                <span>Giỏ hàng</span>
              </div>
              {auth[0].department != "No person" &&
              auth[0].position != "Client" ? (
                <NavLink
                  to="/dashboard-page"
                  className="flex justify-between items-center  border-b-2 gap-x-2 text-slate-600 hover:border-b-2 p-1 hover:text-cyan-500"
                >
                  <AdminPanelSettingsIcon
                    sx={{ fontSize: "20px" }}
                  ></AdminPanelSettingsIcon>
                  <span>Admin</span>
                </NavLink>
              ) : (
                ""
              )}

              <NavLink
                to="/userInfor-page"
                className="flex justify-between items-center border-b-2  gap-x-2 text-slate-600 p-1 hover:text-cyan-500 select-none"
              >
                <EngineeringIcon sx={{ fontSize: "20px" }}></EngineeringIcon>
                <span>Thông tin user</span>
              </NavLink>
              <div
                onClick={handleToggleDarkMode}
                className="flex justify-between items-center border-b-2  gap-x-2 text-slate-600 p-1 hover:text-cyan-500 select-none"
              >
                {!darkMode ? (
                  <TbMoonStars size={17}></TbMoonStars>
                ) : (
                  <BsSunFill size={17}></BsSunFill>
                )}

                {darkMode ? <span>Light mode</span> : <span>Dark mode</span>}
              </div>
              <div
                onClick={handleLogOut}
                className="flex justify-between items-center border-b-2  gap-x-2 text-slate-600 p-1 hover:text-cyan-500 select-none"
              >
                <LogoutIcon sx={{ fontSize: "20px" }}></LogoutIcon>
                <span>Log Out</span>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </UL>
      <CartModal tgCart={tgCart} setTgCart={setTgCart}></CartModal>
      <Overplay toggle={tgCart} status={false} onClick={setTgCart}></Overplay>
    </div>
  );
};

export default Header;
