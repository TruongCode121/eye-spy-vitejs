import React, { useState } from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { setTotalPriceCarts } from "../../../redux/productSlice";
import useNumber from "../../hook/useNumber";
const CartModalFooter = () => {
  const { convertToNumber } = useNumber();
  const { carts, totalPriceCarts } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTotalPriceCarts());
  }, [carts]);
  return (
    <div className="flex gap-x-3 text-white ">
      <div className="bg-green-500 w-3/4 py-2 e rounded px-2 flex justify-between items-center">
        <span>Tổng đơn hàng:</span>
        <span>{convertToNumber(totalPriceCarts)} đ</span>
      </div>
      <NavLink
        to="/order-page"
        className="w-1/4 bg-red-400 rounded hover:bg-red-500  px-2 flex items-center justify-center"
      >
        <BookmarkBorderIcon sx={{ fontSize: "20px" }}></BookmarkBorderIcon>
        Đặt hàng
      </NavLink>
    </div>
  );
};

export default CartModalFooter;
