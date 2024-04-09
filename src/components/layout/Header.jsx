import React from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/img/home/logo.webp";
import { v4 as uuidv4 } from "uuid";
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
    title: "Admin",
    href: "/dashboard-page",
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
  return (
    <div className=" pt-4 pb-3 w-full flex-col sticky top-0 bg-white z-30">
      <div className="flex justify-center ">
        <img src={logo} alt="" />
      </div>
      <UL className="flex gap-x-8 justify-center mt-3 text-[14px]">
        {dataMenu.map((item) => (
          <li key={item.id}>
            <NavLink to={item.href}>{item.title}</NavLink>
          </li>
        ))}
      </UL>
    </div>
  );
};

export default Header;
