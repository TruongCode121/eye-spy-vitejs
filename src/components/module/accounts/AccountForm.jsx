import { Typography, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CpnButton } from "../button";
import { InputFields, SelectFields } from "../../input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  fetchAddNewAccounts,
  fetchUpdateAccounts,
} from "../../redux/accountSlice";
import { toast } from "react-toastify";
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter email you!"),
  username: yup
    .string()
    .min(8, "Your username must be at least 8 characters or greater")
    .required("Enter your username!"),
  fullname: yup.string().required("Fullname can not be empty!"),
  department: yup.string().required("Please select department!"),
  position: yup.string().required("Please select position!"),
});
let date = new Date();
let year = date.getFullYear();
let month = date.getUTCMonth() + 1;
let day = date.getUTCDate();
const AccountForm = ({ data, btnSubmit = "Create", closeModal }) => {
  const { dataAccount, departments, positions } = useSelector(
    (state) => state.accounts
  );

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
    closeModal();
    console.log("update item", values);
    if (data) {
      let id = data.id;
      let putAccount = {
        email: values.email,
        username: values.username,
        fullname: values.fullname,
        department: values.department,
        position: values.position,
        createdAt:
          data.createdAt == "" || data.createdAt == undefined
            ? `${day}/${month}/${year}`
            : data.createdAt,
      };
      dispatch(
        fetchUpdateAccounts({
          id,
          email: values.email,
          username: values.username,
          fullname: values.fullname,
          department: values.department,
          position: values.position,
          createdAt:
            data.createdAt == "" || data.createdAt == undefined
              ? `${day}/${month}/${year}`
              : data.createdAt,
        })
      );
      if (
        values.email != data.email ||
        values.username != data.username ||
        values.fullname != data.fullname ||
        values.department != data.department ||
        values.position != data.position
      ) {
        toast.success("Update item success!");
      } else {
        toast.warning("No change value!");
      }
    } else {
      let newAccount = {
        id: uuidv4(),
        email: values.email,
        username: values.username,
        fullname: values.fullname,
        department: values.department,
        position: values.position,
        createdAt: `${day}/${month}/${year}`,
      };
      console.log("newAccount", newAccount);
      // dispatch(addNewAccount(newAccount));
      dispatch(fetchAddNewAccounts(newAccount));
      // callApiPostData(accountURL, newAccount);
      // handleAsyncfunction();
      // dispatch(
      //   addNewAccount({
      //     id: uuidv4(),
      //     email: values.email,
      //     username: values.username,
      //     fullname: values.fullname,
      //     department: values.department,
      //     position: values.position,
      //     createdate: `${day}-${month}-${year}`,
      //   })
      // );
      toast.success("Thêm mới account thành công!");
      reset();
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(handleAddNewAccount)}>
        <Stack sx={{ my: 2 }} bgcolor="lightblue" height={2}></Stack>
        <TextField
          label="Email"
          variant="standard"
          defaultValue={data ? data.email : ""}
          {...register("email")}
          error={errors.email && true}
          sx={{ width: "100%", mb: 2 }}
          helperText={errors.email ? errors.email.message : ""}
        ></TextField>
        <TextField
          label="Username"
          defaultValue={data ? data.username : ""}
          {...register("username")}
          variant="standard"
          error={errors.username && true}
          helperText={errors.username && errors.username.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
        <TextField
          label="Fullname"
          variant="standard"
          defaultValue={data ? data.fullname : ""}
          {...register("fullname")}
          error={errors.fullname && true}
          helperText={errors.fullname && errors.fullname.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
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
        <Typography sx={{ float: "right" }} component="div">
          <CpnButton>{btnSubmit}</CpnButton>
        </Typography>
        {/* </Stack> */}
      </form>
    </>
  );
};

export default AccountForm;
