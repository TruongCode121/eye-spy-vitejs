import {
  Typography,
  Stack,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { ButtonHome } from "../../button";
import { InputFields, SelectFields } from "../../input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import {
  fetchAddNewProduct,
  fetchUpdateProducts,
  setImgProduct,
} from "../../../redux/productSlice";
import Overplay from "../../layout/Overplay";
import ListImgModal from "./ListImgModal";
import moment from "moment";
const schema = yup.object({
  name: yup.string().required("Enter name product!"),
  brand: yup.string().required("Please select brand!"),
  material: yup.string().required("Please select material!"),
  category: yup.string().required("Please select category!"),
  includeDetail: yup.string().required("Enter your includeDetail!"),
  warehouse: yup.number().required("enter number in warehoure!"),
  price: yup.number().required("enter price for product!"),
  warrranty: yup.string().required("Enter warrranty!"),
});
const ProductsForm = ({ data, btnSubmit = "Create", closeModal }) => {
  const [img, setImg] = useState("");
  const [onListImg, setOnListImg] = useState(false);
  const dispatch = useDispatch();
  const { brands, materials, categorys, ImgProducts } = useSelector(
    (state) => state.products
  );
  console.log("brands", brands);
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

  const handleAddNewProduct = (values) => {
    console.log("update item", values);
    if (data) {
      let id = data.id;
      dispatch(
        fetchUpdateProducts({
          id,
          name: values.name,
          imageProduct: img.length > 0 ? img : data.imageProduct,
          brand: values.brand,
          material: values.material,
          category: values.category,
          includeDetail: values.includeDetail,
          warehouse: values.warehouse,
          price: values.price,
          warrranty: values.warrranty,
          createdAt:
            data.createdAt == "" || data.createdAt == undefined
              ? `${moment().format("DD/MM/YYYY")}`
              : data.createdAt,
        })
      );
      if (
        values.name != data.name ||
        img != data.imageProduct ||
        values.brand != data.brand ||
        values.material != data.material ||
        values.category != data.category ||
        values.includeDetail != data.includeDetail ||
        values.warehouse != data.warehouse ||
        values.price != data.price ||
        values.warrranty != data.warrranty
      ) {
        toast.success("Update product success!");
        closeModal();
      } else {
        toast.warning("No change value!");
      }
    } else {
      let newAccount = {
        id: uuidv4(),
        name: values.name,
        imageProduct: img,
        brand: values.brand,
        material: values.material,
        category: values.category,
        includeDetail: values.includeDetail,
        warehouse: values.warehouse,
        price: values.price,
        warrranty: values.warrranty,
        createdAt: `${moment().format("DD/MM/YYYY")}`,
      };
      if (img == "") {
        toast.warning("Choose Img product!");
      } else {
        dispatch(fetchAddNewProduct(newAccount));
        toast.success("Thêm mới product thành công!");
        closeModal();
        reset();
      }
    }
  };
  console.log(ImgProducts);
  console.log(img);
  // const getLinkImgProduct = (nameImg) => {
  //   const imageUrl = new URL(
  //     `../../../assets/img/products/${nameImg}`,
  //     import.meta.url
  //   );
  //   return imageUrl;
  // };
  const handleSelectImgProduct = (link) => {
    setImg(link);
    setOnListImg(false);
  };
  return (
    <div
      className={`max-h-[80vh] ${
        onListImg ? "overflow-hidden " : "overflow-auto "
      }scrollbar-thin scrollbar-corner-slate-800`}
    >
      <Overplay
        toggle={onListImg}
        status={false}
        onClick={setOnListImg}
      ></Overplay>
      <form action="" onSubmit={handleSubmit(handleAddNewProduct)}>
        <Stack sx={{ my: 2 }} bgcolor="lightblue" height={2}></Stack>
        <TextField
          label="Name product"
          defaultValue={data ? data.name : ""}
          {...register("name")}
          variant="standard"
          error={errors.name && true}
          helperText={errors.name && errors.name.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
        <SelectFields
          Label={"Select a category"}
          data={categorys}
          status=""
          values={data ? data.category : ""}
          register={register}
          name="category"
          error={errors.category && true}
          helperText={errors.category && errors.category.message}
        ></SelectFields>
        <div className="flex gap-x-3 items-center">
          <ListImgModal
            data={data}
            img={img}
            onListImg={onListImg}
            setOnListImg={setOnListImg}
            ImgProducts={ImgProducts}
            handleSelectImgProduct={handleSelectImgProduct}
          ></ListImgModal>
          <div className="w-full">
            <SelectFields
              Label={"Select a brand"}
              data={brands}
              status=""
              values={data ? data.brand : ""}
              register={register}
              name="brand"
              error={errors.brand && true}
              helperText={errors.brand && errors.brand.message}
            ></SelectFields>
            <SelectFields
              Label={"Select a material"}
              data={materials}
              status=""
              values={data ? data.material : ""}
              register={register}
              name="material"
              error={errors.material && true}
              helperText={errors.material && errors.material.message}
            ></SelectFields>
          </div>
        </div>
        <TextField
          label="IncludeDetail"
          variant="standard"
          defaultValue={data ? data.includeDetail : ""}
          {...register("includeDetail")}
          error={errors.includeDetail && true}
          helperText={errors.includeDetail && errors.includeDetail.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
        <TextField
          label="Warehouse"
          variant="standard"
          defaultValue={data ? data.warehouse : ""}
          {...register("warehouse")}
          error={errors.warehouse && true}
          helperText={errors.warehouse && errors.warehouse.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
        <TextField
          label="Price"
          variant="standard"
          defaultValue={data ? data.price : ""}
          {...register("price")}
          error={errors.price && true}
          helperText={errors.price && errors.price.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
        <TextField
          label="Warrranty"
          variant="standard"
          defaultValue={data ? data.warrranty : ""}
          {...register("warrranty")}
          error={errors.warrranty && true}
          helperText={errors.warrranty && errors.warrranty.message}
          sx={{ width: "100%", mb: 2 }}
        ></TextField>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
        nihil incidunt quae cupiditate exercitationem qui animi eaque aperiam a
        quo impedit aspernatur, corrupti atque modi eos, nam autem explicabo.
        Repellendus? Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Laudantium nihil incidunt quae cupiditate exercitationem qui animi eaque
        aperiam a quo impedit aspernatur, corrupti atque modi eos, nam autem
        explicabo. Repellendus?
        <br />
        <div className="flex justify-end">
          <ButtonHome className="flex justify-center bg-green-500 text-white rounded hover:bg-green-600 ">
            {data ? "Save" : "Create"}
          </ButtonHome>
        </div>
      </form>
    </div>
  );
};

export default ProductsForm;
