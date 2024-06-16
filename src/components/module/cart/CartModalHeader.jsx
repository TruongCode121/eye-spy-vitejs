import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
const CartModalHeader = ({ setTgCart }) => {
  const { carts } = useSelector((state) => state.products);
  return (
    <div className="flex justify-between items-center px-3 bg-slate-500 -mx-4 py-3 text-slate-100">
      <span className="text-2xl font-medium">
        Giỏ hàng của bạn {carts.length > 0 ? `có ${carts.length} sản phẩm` : ""}
      </span>
      <div
        className="bg-cyan-500 px-3 text-white rounded hover:bg-cyan-600 cursor-pointer"
        onClick={() => {
          setTgCart(false);
        }}
      >
        <CloseIcon></CloseIcon>
      </div>
    </div>
  );
};

export default CartModalHeader;
