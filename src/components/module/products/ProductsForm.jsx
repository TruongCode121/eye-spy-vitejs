import { Typography, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { CpnButton } from "../../button";
import { InputFields, SelectFields } from "../../input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import {
  fetchAddNewAccounts,
  fetchUpdateAccounts,
} from "../../../redux/accountSlice";
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
const ProductsForm = ({ data, btnSubmit = "Create", closeModal }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [images, setImages] = useState(false);
  const fileRef = useRef(null);
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
  const handleSelectFile = () => {
    fileRef.current.click();
  };
  const onFileSelect = (e) => {
    // let newArr = [];
    const files = e.target.files[0];
    // if (files.length == 0) return;
    console.log("files", files);
  };
  console.log("images", images);
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
      dispatch(fetchAddNewAccounts(newAccount));
      toast.success("Thêm mới account thành công!");
      reset();
    }
  };
  return (
    <>
      <form action="" onSubmit={handleSubmit(handleAddNewAccount)}>
        <Stack sx={{ my: 2 }} bgcolor="lightblue" height={2}></Stack>
        <div className="mb-3">
          <div
            className="w-full p-2           
            border-dashed border-2 
          rounded cursor-pointer
          border-cyan-500"
            onClick={handleSelectFile}
          >
            <input
              type="file"
              multiple
              ref={fileRef}
              className="d-none"
              onChange={onFileSelect}
            />
            <h1 className="flex-col flex items-center text-xl gap-x-3 justify-center text-gray-600 font-medium">
              <CloudDoneIcon></CloudDoneIcon>
              <span>Choose file in computer!</span>
            </h1>
          </div>
          <div className="grid gap-x-4 mt-2  grid-cols-4 w-full ">
            {isDragging && (
              <div className="w-full h-20 bg-slate-500 rounded flex justify-end text-cyan-500">
                <CloseIcon
                  sx={{ fontSize: "17px", m: "3px", cursor: "pointer" }}
                ></CloseIcon>
              </div>
            )}
          </div>
        </div>
        <TextField
          label="Name product"
          defaultValue={data ? data.name : ""}
          {...register("name")}
          variant="standard"
          error={errors.name && true}
          helperText={errors.name && errors.name.message}
          sx={{ width: "100%", mb: 2 }}
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
      </form>
    </>
  );
};

export default ProductsForm;
