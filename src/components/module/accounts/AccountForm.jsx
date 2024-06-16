import { Typography, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonHome } from "../../button";
import { PasswordFileds, RadioFileds, SelectFields } from "../../input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import AccountsAvatarStore from "./AccountsAvatarStore";
import Overplay from "../../layout/Overplay";
import {
  fetchAddNewAccounts,
  fetchUpdateAccounts,
} from "../../../redux/accountSlice";
import moment from "moment";
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
const AccountForm = ({ data, btnSubmit = "Create", closeModal, toggle }) => {
  const { avatars, departments, positions, dataAccount } = useSelector(
    (state) => state.accounts
  );
  const [img, setImg] = useState("");
  const [onListImg, setOnListImg] = useState(false);
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

  const dispatch = useDispatch();
  const handleAddNewAccount = (values) => {
    let accounts = [...dataAccount.accounts];
    let checkEmail = [];
    accounts.map((item) => {
      if (item.email.includes(values.email)) {
        checkEmail = [...checkEmail, item];
      }
    });
    if (data) {
      if (
        img != data.imageProduct ||
        values.email != data.email ||
        values.gender != data.gender ||
        values.fullname != data.fullname ||
        values.password != data.password ||
        values.department != data.department ||
        values.position != data.position
      ) {
        toast.success("Update item success!");
        dispatch(
          fetchUpdateAccounts({
            id: data.id,
            avatar: img.length > 0 ? img : data.avatar,
            email: values.email,
            gender: values.gender,
            password: values.password,
            fullname: values.fullname,
            department: values.department,
            position: values.position,
            createdAt:
              data.createdAt == "" || data.createdAt == undefined
                ? `${moment().format("DD/MM/YYYY")}`
                : data.createdAt,
          })
        );
      } else {
        toast.warning("No change value!");
      }
      closeModal();
    } else {
      let newAccount = {
        id: uuidv4(),
        avatar: img,
        email: values.email,
        gender: values.gender,
        fullname: values.fullname,
        password: values.password,
        department: values.department,
        position: values.position,
        createdAt: `${moment().format("D/M/YYYY")}`,
      };
      if (checkEmail.length > 0) {
        toast.warning("Email đã được đăng ký!");
      } else {
        if (img.length > 0) {
          dispatch(fetchAddNewAccounts(newAccount));
          toast.success("Thêm mới account thành công!");
          closeModal();
          reset();
        } else {
          toast.error("Chưa có ảnh avatar!");
        }
      }
    }
  };
  const handleSelectImgProduct = (link) => {
    setImg(link);
    setOnListImg(false);
  };
  console.log("img", img);
  return (
    <>
      <Overplay
        toggle={onListImg}
        status={false}
        onClick={setOnListImg}
      ></Overplay>
      <Stack sx={{ my: 2 }} bgcolor="lightblue" height={2}></Stack>
      <AccountsAvatarStore
        data={data}
        img={img}
        onListImg={onListImg}
        setOnListImg={setOnListImg}
        avatars={avatars}
        handleSelectImgProduct={handleSelectImgProduct}
      ></AccountsAvatarStore>
      <form
        className={` ${
          toggle == false ? "translate-x-[-100%]" : "translate-x-0 z-10"
        }`}
        action=""
        onSubmit={handleSubmit(handleAddNewAccount)}
      >
        <TextField
          label="Fullname"
          variant="standard"
          defaultValue={data ? data.fullname : ""}
          {...register("fullname")}
          error={errors.fullname && true}
          helperText={errors.fullname && errors.fullname.message}
          sx={{ width: "100%" }}
        ></TextField>
        <RadioFileds
          defaultValue={data ? data.gender : ""}
          register={register}
          helperText={errors.gender && errors.gender.message}
        ></RadioFileds>

        <TextField
          label="Email"
          variant="standard"
          defaultValue={data ? data.email : ""}
          {...register("email")}
          error={errors.email && true}
          sx={{ width: "100%", mb: 2 }}
          helperText={errors.email ? errors.email.message : ""}
        ></TextField>
        <PasswordFileds
          defaultValue={data ? data.password : ""}
          register={register}
          error={errors.password && true}
          helperText={errors.password && errors.password.message}
        ></PasswordFileds>
        <br />
        <SelectFields
          Label={"Select a Department"}
          data={departments}
          status=""
          values={data ? data.department : ""}
          register={register}
          name="department"
          error={errors.department && true}
          helperText={errors.department && errors.department.message}
        ></SelectFields>
        <br />
        <SelectFields
          Label={"Select a Postion"}
          data={positions}
          status="position"
          register={register}
          name="position"
          values={data ? data.position : ""}
          error={errors.position && true}
          helperText={errors.position && errors.position.message}
        ></SelectFields>
        <div className="flex justify-end">
          <ButtonHome className="flex justify-center bg-green-500 text-white rounded hover:bg-green-600 ">
            {data ? "Save" : "Create"}
          </ButtonHome>
        </div>
        {/* </Stack> */}
      </form>
    </>
  );
};

export default AccountForm;
