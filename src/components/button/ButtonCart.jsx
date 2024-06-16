import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LocalMallIcon from "@mui/icons-material/LocalMall";
const ButtonCart = ({ setTgCart }) => {
  const { carts } = useSelector((state) => state.products);
  const handleTotalQuantity = () => {
    let sum = 0;
    carts?.map((item) => (sum += item.quantity));
    return sum;
  };
  return (
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
  );
};

export default ButtonCart;
