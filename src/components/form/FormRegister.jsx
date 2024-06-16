import { TextField } from "@mui/material";
import React, { useState } from "react";
import { ButtonHome } from "../button";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { Stack } from "@mui/system";
import AccountsAvatarStore from "../module/accounts/AccountsAvatarStore";
import { PasswordFileds, RadioFileds } from "../input";
import { FontParata } from "../../assets/style/font";
import { fetchAddNewAccounts } from "../../redux/accountSlice";
import Overplay from "../layout/Overplay";

const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter email you!"),
  gender: yup.string().required("Please choose gender for you!"),
  password: yup
    .string()
    .min(8, "Your password must be at least 8 characters or greater")
    .required("please enter your password"),
  fullname: yup.string().required("Fullname can not be empty!"),
  department: yup.string().required("Please select department!"),
  position: yup.string().required("Please select position!"),
});
const FormRegister = ({ toggle }) => {
  const [img, setImg] = useState("");
  const [onListImg, setOnListImg] = useState(false);
  const { avatars, dataAccount } = useSelector((state) => state.accounts);
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
      department: "No person",
      position: "Client",
      createdAt: `${moment().format("DD/MM/YYYY")}`,
    },
  });
  console.log(img);
  const handleAddNewAccount = (values) => {
    let accounts = [...dataAccount.accounts];
    let checkEmail = [];
    accounts.map((item) => {
      if (item.email.includes(values.email)) {
        checkEmail = [...checkEmail, item];
      }
    });

    console.log("checkEmail", checkEmail);

    if (checkEmail.length > 0) {
      toast.warning("Email đã được đăng ký!");
    } else {
      if (img.length > 0) {
        values.avatar = `${img}`;
        dispatch(fetchAddNewAccounts(values));
        toast.success("Đăng ký thành công!");
        reset();
        setImg("");
      } else {
        toast.warning("Chọn ảnh avatar!");
      }
    }
  };
  const handleSelectImgProduct = (link) => {
    setImg(link);
    setOnListImg(false);
  };
  return (
    <div
      className={`w-1/2 h-full absolute top-[50%] px-8 -translate-y-[40%] left-0 transition-all duration-500  ${
        toggle == false ? "translate-x-[-100%]" : "translate-x-0 z-10"
      }`}
    >
      <form action="" onSubmit={handleSubmit(handleAddNewAccount)}>
        <FontParata className="text-4xl mb-4">Register Account</FontParata>
        <Stack sx={{ my: 1 }} bgcolor="lightblue" height={2}></Stack>
        <div className="flex gap-x-3">
          <AccountsAvatarStore
            img={img}
            onListImg={onListImg}
            setOnListImg={setOnListImg}
            avatars={avatars}
            handleSelectImgProduct={handleSelectImgProduct}
          ></AccountsAvatarStore>
          <div className="w-full">
            <TextField
              label="Fullname"
              variant="standard"
              {...register("fullname")}
              error={errors.fullname && true}
              helperText={errors.fullname && errors.fullname.message}
              sx={{ width: "100%" }}
            ></TextField>
            <RadioFileds
              register={register}
              helperText={errors.gender && errors.gender.message}
            ></RadioFileds>
          </div>
        </div>

        <TextField
          label="Email"
          variant="standard"
          {...register("email")}
          error={errors.email && true}
          sx={{ width: "100%", mb: 2 }}
          helperText={errors.email ? errors.email.message : ""}
        ></TextField>
        <PasswordFileds
          register={register}
          error={errors.password && true}
          helperText={errors.password && errors.password.message}
        ></PasswordFileds>
        <div className="w-full flex justify-center">
          <ButtonHome className="w-1/2 hover:to-slate-800 rounded-lg bg-gradient-to-r from-slate-700 to-slate-400 text-white text-lg">
            Register
          </ButtonHome>
        </div>
        {/* </Stack> */}
      </form>
    </div>
  );
};

export default FormRegister;
