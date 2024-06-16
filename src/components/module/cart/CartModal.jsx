import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cartlist from "./Cartlist";
import CartModalHeader from "./CartModalHeader";
import CartModalFooter from "./CartModalFooter";

const CartModal = ({ tgCart, setTgCart }) => {
  const { darkMode } = useSelector((state) => state.globals);
  const getLinkImgProduct = (nameImg) => {
    const imageUrl = new URL(
      `../../../assets/img/products/${nameImg}`,
      import.meta.url
    );
    return imageUrl;
  };
  return (
    <div
      className={`h-full w-[500px] ${
        darkMode ? "" : "bg-white"
      } dark:bg-slate-700 fixed right-0 top-0 transition-all duration-500 z-20 ${
        tgCart ? "translate-x-0" : " translate-x-[100%]"
      }`}
    >
      <div className="px-3">
        <CartModalHeader setTgCart={setTgCart}></CartModalHeader>
        <Cartlist></Cartlist>
        <CartModalFooter></CartModalFooter>
      </div>
    </div>
  );
};

export default CartModal;
