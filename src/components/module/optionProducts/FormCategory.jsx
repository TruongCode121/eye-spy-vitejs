import React, { useState } from "react";
import { TextField } from "@mui/material";
import { ButtonHome } from "../../button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ImgStore from "./ImgStore";
import { v4 as uuidv4 } from "uuid";
import * as yup from "yup";
const schema = yup.object({
  name: yup.string().required("Please enter name category!"),
});
import {
  deleteImgCategory,
  fetchAddCategory,
  fetchUpdateCategory,
  setImgCategory,
} from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const FormCategory = ({ data, closeModal }) => {
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
  const { ImgCategorys } = useSelector((state) => state.products);
  const [imgUrl, setImgUrl] = useState("");
  const [onModal, setOnModal] = useState(false);
  const dispatch = useDispatch();
  const ActionForm = (value) => {
    closeModal();
    if (data) {
      dispatch(
        fetchUpdateCategory({
          id: data.id,
          imgCategory: imgUrl.length > 0 ? imgUrl : data.imgCategory,
          name: value.name,
        })
      );
      toast("Update sucess!");
    } else {
      value.id = uuidv4();
      value.imgCategory = imgUrl;
      console.log(value);
      dispatch(fetchAddCategory(value));
      toast("Add new sucess!");
    }
  };
  const handleSelectImg = (urlImg) => {
    setImgUrl(urlImg);
    setOnModal(false);
  };
  console.log(imgUrl);
  return (
    <div className="mt-3">
      <form action="" onSubmit={handleSubmit(ActionForm)}>
        <ImgStore
          imgUrl={imgUrl}
          className="w-full"
          handleSelectImg={handleSelectImg}
          deleteImgRedux={deleteImgCategory}
          setImgRedux={setImgCategory}
          imgListRedux={ImgCategorys}
          setImgUrl={setImgUrl}
          onModal={onModal}
          setOnModal={setOnModal}
          data={data ? data.imgCategory : ""}
        ></ImgStore>
        <TextField
          id="outlined-basic"
          label="Category name"
          variant="outlined"
          {...register("name")}
          error={errors.name && true}
          helperText={errors.name && errors.name.message}
          sx={{ width: "100%" }}
          defaultValue={data ? data.name : ""}
        />
        <div className="flex justify-end mt-3">
          <ButtonHome
            className={`rounded text-white
             ${
               data
                 ? "bg-green-500  hover:bg-green-600"
                 : "bg-indigo-500   hover:bg-indigo-600"
             }
                `}
          >
            {data ? "Save" : "Add New "}
          </ButtonHome>
        </div>
      </form>
    </div>
  );
};

export default FormCategory;
