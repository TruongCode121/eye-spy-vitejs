import React from "react";
import { useState } from "react";
import { ButtonHome } from "../button";
import HeaderFooter from "../layout/HeaderFooter";
import {
  undrawEnter,
  undrawSignup,
  welcome,
  undrawLogin,
  undrawAugmented,
  undrawDreamer,
} from "../../assets/img/home";
import { FormContracts } from "../form";
import { TextField } from "@mui/material";

const LoginPage = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggleUI = () => {
    setToggle(!toggle);
  };
  const fieldLayoutTransition = `text-white w-full mb-4 absolute top-[50%] -translate-y-[50%] items-center`;
  return (
    <div>
      <HeaderFooter status={true}>
        <div className="w-full h-[100vh] bg-gradient-to-r from-slate-100 to-black flex justify-center items-center ">
          <div
            className={`w-[50%] h-[60vh] bg-white rounded-[30px] relative overflow-hidden`}
          >
            <div
              className={`w-1/2 h-full bg-[#263544] text-white  transition-all duration-500 ${
                toggle == true
                  ? "translate-x-[100%]  rounded-l-[100px] rounded-r-[30px]"
                  : "translate-x-0 rounded-l-[30px] rounded-r-[100px]"
              }`}
            ></div>
            <div
              className={`w-1/2 h-full absolute top-[50%] translate-y-[-30%] right-0 transition-all duration-500  ${
                toggle == true ? "translate-x-[100%]" : "translate-x-0 z-10"
              }`}
            >
              <form action="" className="w-full px-8">
                <h1 className="text-4xl mb-4 ">Login Page</h1>
                <div>
                  <TextField
                    id="Email"
                    label="Email"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="my-4">
                  <TextField
                    id="passwork"
                    label="passwork"
                    variant="outlined"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <ButtonHome className="rounded-lg bg-slate-500 text-white text-lg">
                    Sig In
                  </ButtonHome>
                </div>
              </form>
            </div>
            <div
              className={`w-1/2 h-full absolute top-[50%] -translate-y-[40%] left-0 transition-all duration-500  ${
                toggle == false ? "translate-x-[-100%]" : "translate-x-0 z-10"
              }`}
            >
              <form action="" className="w-full px-8">
                <h1 className="text-4xl mb-4 ">Register Account</h1>
                <div>
                  <TextField
                    id="Username"
                    label="Username"
                    variant="outlined"
                    sx={{ width: "100%" }}
                    size="small"
                  />
                </div>
                <div className="my-4">
                  <TextField
                    id="Email"
                    label="Email"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    id="passwork"
                    label="passwork"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="my-4">
                  <TextField
                    id="confirm"
                    label="confirm passwork"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div className="w-full flex justify-center">
                  <ButtonHome className="rounded-lg bg-slate-500 text-white text-lg">
                    Save
                  </ButtonHome>
                </div>
              </form>
            </div>
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
                toggle == false
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
      </HeaderFooter>
    </div>
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
