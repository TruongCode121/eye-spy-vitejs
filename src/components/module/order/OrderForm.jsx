import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cartlist from "../cart/Cartlist";
import { undrawNodata } from "../../../assets/img/home";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { fetchOrderAddNew, setCart } from "../../../redux/productSlice";
import { RadioFileds } from "../../input";
import moment from "moment";
import OrderEmpty from "./orderEmpty";
import useNumber from "../../hook/useNumber";

const schema = yup.object({
  fullname: yup.string().required("Fullname can not be empty!"),
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter email you!"),
  phone: yup
    .number()
    .min(10, "Your phone must be at min 10 characters or greater")
    .required("Please enter your phone !"),
  address: yup.string().required("Please enter address for you!"),
});
const OrderForm = ({ filterOrder }) => {
  const { convertToNumber } = useNumber();
  const { carts, totalPriceCarts, orderList } = useSelector(
    (state) => state.products
  );
  const { auth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      id: uuidv4(),
      codeOrders: "#" + uuidv4().slice(0, 7).toUpperCase(),
      createdAt: `${moment().format("DD/MM/YYYY")}`,
      statusOrder: true,
      deliveryStatus: false,
    },
  });

  if (carts.length > 0) {
    const handleAddNewOrder = (values) => {
      values.carts = carts;
      values.totalPriceCarts = totalPriceCarts;
      dispatch(fetchOrderAddNew(values));
      toast.success("Order add new success");
      dispatch(setCart([]));
      filterOrder("myOrder");
    };
    return (
      <div>
        <div
          className="max-w-[1280px] mb-10 mx-auto p-3 md:p-0 flex-col items-center lg:flex-row flex lg:items-start lg:gap-x-3 "
          id="#form-order"
        >
          <div className="  w-full md:w-2/3 lg:w-1/2 rounded-lg p-3 dark:bg-slate-700 shadow md:mb-4 dark:text-white">
            <div className="w-full text-red-600 dark:text-white">
              <span className="text-left">Tạm tính đơn hàng:</span>
              <span className="float-right">
                {convertToNumber(totalPriceCarts)}.đ
              </span>
            </div>
            <Cartlist className="max-h-[72vh]"></Cartlist>
          </div>
          <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-3 rounded shadow">
            <header className="font-medium border-b-2 border-slate-600 pb-2 mb-2">
              THÔNG TIN KHÁCH HÀNG
            </header>
            <form action="" onSubmit={handleSubmit(handleAddNewOrder)}>
              <RadioFileds
                register={register}
                defaultValue={auth.length > 0 ? auth[0].gender : ""}
              ></RadioFileds>

              <TextField
                sx={{
                  my: 1,
                  width: "100%",
                }}
                id="outlined-basic"
                label="Họ và tên..."
                variant="outlined"
                defaultValue={auth.length > 0 ? auth[0].fullname : ""}
                {...register("fullname")}
                error={errors.fullname && true}
                helperText={errors.fullname && errors.fullname.message}
              />
              <TextField
                sx={{ my: 1, width: "100%" }}
                id="outlined-basic"
                label="Email..."
                defaultValue={auth.length > 0 ? auth[0].email : ""}
                variant="outlined"
                {...register("email")}
                error={errors.email && true}
                helperText={errors.email && errors.email.message}
              />
              <TextField
                sx={{ my: 1, width: "100%" }}
                id="outlined-basic"
                label="Số điện thoại"
                variant="outlined"
                {...register("phone")}
                error={errors.phone && true}
                helperText={errors.phone && errors.phone.message}
              />
              <TextField
                sx={{ my: 1, width: "100%" }}
                id="outlined-basic"
                label="Địa chỉ giao hàng"
                variant="outlined"
                {...register("address")}
                error={errors.address && true}
                helperText={errors.address && errors.address.message}
              />
              <div className="text-red-600 mt-2">
                <div className="break-words text-right">
                  <span className="text-slate-700 mr-2 font-bold">
                    Tổng tiền
                  </span>
                  <span className="font-medium">
                    {convertToNumber(totalPriceCarts)} đ
                  </span>
                </div>
              </div>
              <footer className="font-medium border-b-2 border-slate-600 pb-2 mb-2">
                THÔNG TIN BỔ SUNG
              </footer>
              <textarea
                name="ghiChu"
                className=" w-full bg-white border-2 p-1 rounded"
                placeholder="Ghi chú đơn hàng VD: thời gian,địa chỉ nhận hàng chi tiết."
                id=""
                {...register("note")}
                cols="30"
                rows="5"
              ></textarea>
              <button
                type="submit"
                className="w-full hover:bg-slate-600 bg-slate-500 rounded py-2 text-white font-medium"
              >
                ĐẶT HÀNG
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <OrderEmpty></OrderEmpty>;
      </>
    );
  }
};

export default OrderForm;
