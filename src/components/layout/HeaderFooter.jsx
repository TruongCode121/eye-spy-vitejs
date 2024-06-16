import React, { useEffect } from "react";
import logo from "../../assets/img/home/logo.webp";
import styled from "styled-components";
import { Stack, TextField } from "@mui/material";
import { ButtonHome } from "../button";
import { hom20 } from "../../assets/img/home";

import {
  ContactPhoneIcon,
  EmailIcon,
  FacebookIcon,
  GoogleIcon,
  HomeWorkIcon,
  PieChartIcon,
  PinDropIcon,
  ProductionQuantityLimitsIcon,
  XIcon,
  YouTubeIcon,
} from "../../assets/icon";
import { NavLink, useNavigate } from "react-router-dom";
import useNavLinkActive from "../hook/useNavLinkActive";
import { FormContracts } from "../form";
import Header from "./Header";

const UlFooter = styled.ul`
  width: 100%;
  li {
    padding: 10px;
    background-color: #3e3e3e;
    margin-top: 6px;
    border-radius: 10px;
    margin-left: -10px;
  }
  li:hover {
    cursor: pointer;
    background-color: darkkhaki;
  }
`;

const HeaderFooter = ({ children, status = false }) => {
  const { activeNavlink } = useNavLinkActive();
  const navigate = useNavigate();
  const handleNavigate = (link) => {
    navigate(link);
  };
  return (
    <div className="dark:bg-slate-800">
      <Header></Header>
      <div className={`${status == false && "px-8"}`}>{children}</div>
      <div className={`-mx-8 ${status == false && "mt-32"} relative`}>
        <div className="bg-img">
          <img src={hom20} alt="" width="100%" className="h-[800px]" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-85"></div>
        <div className="absolute top-[50%] w-full translate-y-[-50%] px-8">
          <div className=" flex justify-between mx-8 gap-x-8">
            <div className="w-1/3 text-white">
              <UlFooter>
                <NavLink to="/">
                  <li>
                    <HomeWorkIcon></HomeWorkIcon> <span> Trang chủ</span>
                  </li>
                </NavLink>
                <NavLink to="/products-page">
                  <li>
                    <ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>
                    <span> Sản phẩm</span>
                  </li>
                </NavLink>
                <NavLink to="/introduce-page">
                  <li>
                    <PieChartIcon></PieChartIcon> <span>Về Eye Spy</span>
                  </li>
                </NavLink>
              </UlFooter>
              <div className="bg-white inline-block p-2 my-4">
                <img src={logo} alt="" />
              </div>
              {/* ContactPhoneIcon, EmailIcon, PinDropIcon, */}
              <div>
                <ContactPhoneIcon sx={{ mr: "2px" }}></ContactPhoneIcon>{" "}
                0366981264
              </div>
              <div className="my-4">
                <PinDropIcon sx={{ mr: "4px" }}></PinDropIcon>
                Số 1 Cầu Giấy, quận Cầu Giấy, Hà Nội
              </div>
              <div>
                <EmailIcon></EmailIcon> EyeSpy123@gmail.com
              </div>
            </div>

            <div className="w-1/3 flex flex-col justify-between">
              <div className="text-white">
                <div className="w-1/2 ">
                  <h3 className="text-2xl mb-5">Theo dõi Eye Spy tại đây:</h3>
                  <Stack direction="row" spacing={2}>
                    <div className="bg-blue-500 text-white p-2 rounded">
                      <FacebookIcon sx={{ fontSize: "40px" }}></FacebookIcon>
                    </div>
                    <div className="bg-gray-800 text-white p-2 rounded">
                      <XIcon sx={{ fontSize: "40px" }}></XIcon>
                    </div>
                    <div className="bg-red-500 text-white p-2 rounded">
                      <YouTubeIcon sx={{ fontSize: "40px" }}></YouTubeIcon>
                    </div>
                    <div className=" bg-gradient-to-tr from-red-500 to-green-500 text-white p-2 rounded">
                      <GoogleIcon sx={{ fontSize: "40px" }}></GoogleIcon>
                    </div>
                  </Stack>
                </div>
              </div>
              <FormContracts></FormContracts>
            </div>
            <div className="w-1/3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d20070.567106690454!2d-114.13718498372708!3d51.03792875094858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sEye%20Spy!5e0!3m2!1svi!2s!4v1712033599862!5m2!1svi!2s"
                width="100%"
                height="600px"
                allowFullScreen=""
                className="rounded"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderFooter;
