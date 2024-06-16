import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  decrementCart,
  deleteCart,
  incrementCart,
} from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import useNumber from "../../hook/useNumber";
import Swal from "sweetalert2";
const Cartlist = ({ className }) => {
  const { convertToNumber } = useNumber();
  const { carts, productsData } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleDeleteItemCart = (id, name) => {
    Swal.fire({
      title: `Xóa ${name} khỏi giỏ hàng!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(deleteCart(id));
        toast.success("Delete cart success!");
      }
    });
  };
  return (
    <div
      className={`mt-3 ${
        className ? className : "h-[85vh]"
      }  overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent`}
    >
      {carts?.length > 0
        ? carts.map((cart) => {
            let indexProduct = productsData.findIndex(
              (item) => item.id == cart.product_id
            );
            return (
              <div
                className={`grid grid-cols-4 gap-x-6 border-b-2 mb-4 relative`}
                key={cart.product_id}
              >
                <img
                  src={productsData[indexProduct]?.imageProduct}
                  alt=""
                  className="w-24 h-24 border-2 mb-2 rounded-lg"
                />
                <div className="flex flex-col items-start justify-center">
                  <div> {productsData[indexProduct]?.name}</div>
                  <div className="text-red-500">
                    {convertToNumber(productsData[indexProduct]?.price)} đ
                  </div>
                </div>
                <div className="flex items-center gap-x-3">
                  <button
                    type="button"
                    onClick={() => dispatch(incrementCart(cart.product_id))}
                    className="w-6 h-6 cursor-pointer select-none bg-slate-400  text-white flex justify-center items-center font-medium rounded hover:bg-slate-500"
                  >
                    <AddIcon sx={{ fontSize: "18px" }}></AddIcon>
                  </button>
                  <div>{cart.quantity}</div>
                  <button
                    type="button"
                    disabled={cart.quantity == 1 && true}
                    onClick={() => dispatch(decrementCart(cart.product_id))}
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
                  {convertToNumber(
                    productsData[indexProduct]?.price * cart.quantity
                  )}{" "}
                  đ.
                </div>
                <div
                  className="flex ml-6 mb-2"
                  onClick={() => {
                    handleDeleteItemCart(
                      cart.product_id,
                      productsData[indexProduct]?.name
                    );
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
  );
};

export default Cartlist;
