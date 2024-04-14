import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/img/home/logo.webp";
import { v4 as uuidv4 } from "uuid";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  decrementCart,
  deleteCart,
  incrementCart,
} from "../../redux/productSlice";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { toast } from "react-toastify";
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
  const [tgCart, setTgCart] = useState(false);
  const { carts, productsData } = useSelector((state) => state.products);
  console.log("carts", carts);
  const dispatch = useDispatch();
  const [numberCart, setNumberCart] = useState(0);
  useEffect(() => {
    const className = "overflow-y-hidden";
    const element = window.document.querySelector("body");
    if (tgCart) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [tgCart]);
  const getLinkImgProduct = (nameImg) => {
    const imageUrl = new URL(
      `../../assets/img/products/${nameImg}`,
      import.meta.url
    );
    return imageUrl;
  };
  const handleTotalQuantity = () => {
    let sum = 0;
    carts.map((item) => (sum += item.quantity));
    return sum;
  };
  const handleTotalPriceCarts = () => {
    let sumPriceCart = 0;
    let sumTotal = 0;
    carts.map((cart) => {
      let indexProduct = productsData.findIndex(
        (item) => item.id == cart.product_id
      );
      sumPriceCart = productsData[indexProduct]?.price * cart.quantity;
      sumTotal += sumPriceCart;
    });
    return sumTotal;
  };
  return (
    <div className=" pt-4 pb-3 w-full flex-col sticky top-0 bg-white z-30">
      <div className="flex justify-center ">
        <img src={logo} alt="" />
      </div>
      <UL className="flex gap-x-8 justify-center mt-3 text-[14px] relative">
        {dataMenu.map((item) => (
          <li key={item.id}>
            <NavLink to={item.href}>{item.title}</NavLink>
          </li>
        ))}
        <div
          className="absolute right-8 top-[50%] translate-y-[-50%] cursor-pointer select-none "
          onClick={() => {
            if (handleTotalQuantity() == 0) {
              toast.warning("Giỏ hàng rỗng!");
            } else {
              setTgCart(true);
            }
          }}
        >
          <div
            className={`flex items-center gap-x-2 bg-gray-100 hover:bg-slate-200 px-2 py-1 rounded ${
              handleTotalQuantity() == 0 ? "text-slate-500" : " text-red-500"
            } font-medium `}
          >
            <LocalMallIcon sx={{ fontSize: "18px" }}></LocalMallIcon>
            Giỏ hàng
          </div>
          <div
            className={`h-6 w-6 bg-red-500 rounded-full absolute top-[-40%] right-[-10px] text-white ${
              handleTotalQuantity() == 0 ? "d-none" : ""
            }`}
          >
            <div className="flex justify-center items-center text-[15px]">
              {handleTotalQuantity()}
            </div>
          </div>
        </div>
      </UL>
      {/* cart */}
      <div
        className={`h-[100vh] w-[500px] bg-white fixed right-0 top-0 transition-all duration-500 z-20 ${
          tgCart ? "translate-x-0" : " translate-x-[100%]"
        }`}
      >
        <div className="px-3">
          <div className="flex justify-between items-center px-3 bg-slate-500 -mx-4 py-3 text-slate-100">
            <span className="text-2xl font-medium">Giỏ hàng của bạn</span>
            <div
              className="bg-cyan-500 px-3 text-white rounded hover:bg-cyan-600 cursor-pointer"
              onClick={() => {
                setTgCart(false);
              }}
            >
              <CloseIcon></CloseIcon>
            </div>
          </div>
          {/* map shopping cart */}
          <div className="mt-3 h-[85vh]  overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent">
            {carts.length > 0
              ? carts.map((cart) => {
                  let indexProduct = productsData.findIndex(
                    (item) => item.id == cart.product_id
                  );
                  return (
                    <div
                      className="grid grid-cols-4 gap-x-6 border-b-2 mb-4 relative"
                      key={cart.product_id}
                    >
                      <img
                        src={getLinkImgProduct(
                          productsData[indexProduct]?.imageProduct
                        )}
                        alt=""
                        className="w-24 h-24 border-2 mb-2 rounded-lg"
                      />
                      <div className="flex flex-col items-start justify-center">
                        <div> {productsData[indexProduct]?.name}</div>
                        <div className="text-red-500">
                          {productsData[indexProduct]?.price} vnd
                        </div>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <button
                          type="button"
                          onClick={() =>
                            dispatch(incrementCart(cart.product_id))
                          }
                          className="w-6 h-6 cursor-pointer select-none bg-slate-400  text-white flex justify-center items-center font-medium rounded hover:bg-slate-500"
                        >
                          <AddIcon sx={{ fontSize: "18px" }}></AddIcon>
                        </button>
                        <div>{cart.quantity}</div>
                        <button
                          type="button"
                          disabled={cart.quantity == 1 && true}
                          onClick={() =>
                            dispatch(decrementCart(cart.product_id))
                          }
                          className={`w-6 h-6  select-none ${
                            cart.quantity > 1
                              ? "hover:bg-slate-500 bg-slate-400 cursor-pointer"
                              : "bg-slate-200"
                          } text-white  flex justify-center items-center font-medium rounded`}
                        >
                          <RemoveIcon sx={{ fontSize: "18px" }}></RemoveIcon>
                        </button>
                      </div>
                      <div className="flex items-center text-green-700 font-medium">
                        {productsData[indexProduct]?.price * cart.quantity} đ.
                      </div>
                      <div
                        className="flex justify-center mb-2"
                        onClick={() => {
                          dispatch(deleteCart(cart.product_id));
                          toast.success("Delete cart success!");
                        }}
                      >
                        <div className="rounded bg-red-500 text-white flex justify-center w-12 hover:bg-red-600 cursor-pointer select-none">
                          <DeleteForeverIcon></DeleteForeverIcon>
                        </div>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="flex gap-x-3 text-white">
            <div className="bg-green-500 w-3/4 py-2 e rounded px-2 flex justify-between items-center">
              <span>Tổng đơn hàng:</span>
              <span>{handleTotalPriceCarts()} đ</span>
            </div>
            <NavLink
              to="/order-page"
              className="w-1/4 bg-red-400 rounded hover:bg-red-500  px-2 flex items-center justify-center"
            >
              <BookmarkBorderIcon
                sx={{ fontSize: "20px" }}
              ></BookmarkBorderIcon>
              Đặt hàng
            </NavLink>
          </div>
        </div>
      </div>
      {/* overplay */}
      <div
        className={`bg-slate-900 opacity-50 fixed top-0 left-0 w-full h-full z-10 ${
          !tgCart && "d-none"
        }`}
        onClick={() => {
          setTgCart(false);
        }}
      ></div>
    </div>
  );
};

export default Header;
