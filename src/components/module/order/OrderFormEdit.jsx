import { TextField } from "@mui/material";
import React from "react";
import { RadioFileds } from "../../input";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchUpdateOrder } from "../../../redux/productSlice";
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
  createdAt: yup.string().required("Choose created At!"),
});
const OrderFormEdit = ({ data, closeModal }) => {
  const dispatch = useDispatch();
  const handleFormatDate = () => {
    let dateData = data.createdAt;
    let newDate = dateData.split("/");
    return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
  };
  console.log(handleFormatDate());
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: "",
  });
  const handleEditOrder = (values) => {
    // console.log(data);
    // console.log(values);
    let newDate = values.createdAt;
    let dateArr = newDate.split("-");
    let dateFormat = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
    dispatch(
      fetchUpdateOrder({
        id: data.id,
        address: values.address,
        phone: values.phone,
        email: values.email,
        fullname: values.fullname,
        codeOrders: data.codeOrders,
        createdAt: dateFormat,
        statusOrder: data.statusOrder,
        deliveryStatus: data.deliveryStatus,
        gender: values.gender,
        note: values.note,
        carts: data.carts,
        totalPriceCarts: data.totalPriceCarts,
      })
    );
    toast.success(`UpdateOrder id: ${data.id} success`);
    closeModal();
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleEditOrder)}>
        <RadioFileds
          defaultValue={data ? data.gender : ""}
          register={register}
        ></RadioFileds>

        <TextField
          sx={{
            my: 1,
            width: "100%",
          }}
          id="outlined-basic"
          label="Họ và tên..."
          variant="outlined"
          defaultValue={data ? data.fullname : ""}
          {...register("fullname")}
          error={errors.fullname && true}
          helperText={errors.fullname && errors.fullname.message}
        />
        <TextField
          sx={{ my: 1, width: "100%" }}
          id="outlined-basic"
          label="Email..."
          defaultValue={data ? data.email : ""}
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
          defaultValue={data ? `0${data.phone}` : ""}
          {...register("phone")}
          error={errors.phone && true}
          helperText={errors.phone && errors.phone.message}
        />
        <TextField
          sx={{ my: 1, width: "100%" }}
          id="outlined-basic"
          label="Địa chỉ giao hàng"
          variant="outlined"
          defaultValue={data ? `${data.address}` : ""}
          {...register("address")}
          error={errors.address && true}
          helperText={errors.address && errors.address.message}
        />
        <textarea
          name="ghiChu"
          className=" w-full bg-white border-2 p-1 rounded mt-2"
          placeholder="Ghi chú đơn hàng VD: thời gian,địa chỉ nhận hàng chi tiết."
          id=""
          defaultValue={data ? data.note : ""}
          {...register("note")}
          cols="30"
          rows="5"
        ></textarea>
        {/* value="2050-02-20"  */}
        <input
          type="date"
          {...register("createdAt")}
          className="form-control mt-[10px] mb-3"
          defaultValue={handleFormatDate()}
        />
        <button
          type="submit"
          className="w-full hover:bg-teal-600 bg-teal-500 rounded py-2 text-white font-medium"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default OrderFormEdit;
