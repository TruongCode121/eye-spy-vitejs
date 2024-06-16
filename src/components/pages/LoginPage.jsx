import React, { useEffect } from "react";
import { useState } from "react";
import { ButtonHome } from "../button";
import CabinIcon from "@mui/icons-material/Cabin";
import { undrawAugmented, undrawDreamer } from "../../assets/img/home";
import { FormContracts, FormLogin, FormRegister } from "../form";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AccountForm from "../module/accounts/AccountForm";

const LoginPage = () => {
  const [toggle, setToggle] = useState(false);
  const { Authen } = useSelector((state) => state.accounts);
  const handleToggleUI = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fieldLayoutTransition = `text-white w-full mb-4 absolute top-[50%] -translate-y-[50%] items-center`;
  return (
    <>
      <div className="w-full h-[100vh] bg-gradient-to-r from-slate-100 to-black flex justify-center items-center ">
        <div
          className={`w-[50%] h-[60vh] bg-white rounded-[30px] relative overflow-hidden`}
        >
          <div
            className={`w-1/2 h-full px-5 py-4 bg-[#263544] text-white  transition-all duration-500 ${
              toggle
                ? "translate-x-[100%]  rounded-l-[100px] rounded-r-[30px]"
                : "translate-x-0 rounded-l-[30px] rounded-r-[100px]"
            }`}
          ></div>
          <FormLogin toggle={toggle}></FormLogin>
          <FormRegister toggle={toggle}></FormRegister>
          <div
            className={`${fieldLayoutTransition} ${
              toggle
                ? "-translate-x-[200%] transition-all duration-500"
                : "translate-x-[5%] transition-all duration-700"
            }`}
          >
            <LayoutTransition onClick={handleToggleUI}></LayoutTransition>
          </div>
          <div
            className={`${fieldLayoutTransition} ${
              !toggle
                ? "translate-x-[200%] transition-all duration-500"
                : "translate-x-[55%] transition-all duration-700"
            }`}
          >
            <LayoutTransition
              img={undrawDreamer}
              onClick={handleToggleUI}
              textBtn="Đăng nhập"
            >
              Đăng nhập vào hệ thống tại đây!
            </LayoutTransition>
          </div>
        </div>
      </div>
    </>
  );
};
export const LayoutTransition = ({
  img = undrawAugmented,
  onClick = () => {},
  textBtn = "Đăng ký",
  children = "Tạo tài khoản của bạn ở đây!",
}) => {
  return (
    <>
      <div className="w-[40%] flex justify-center flex-col items-center">
        <div className="flex justify-start w-full">
          <NavLink
            to="/"
            className="pb-1 hover:text-cyan-500 flex  items-center gap-x-2 mb-2"
          >
            <CabinIcon sx={{ fontSize: "20px" }}></CabinIcon> Trang chủ
          </NavLink>
        </div>
        <img src={img} alt="" className="w-full rounded-2xl" />
        <div className="my-2">{children}</div>
        <ButtonHome
          className={`border-white border rounded-md`}
          onClick={onClick}
        >
          {textBtn}
        </ButtonHome>
      </div>
    </>
  );
};
export default LoginPage;
