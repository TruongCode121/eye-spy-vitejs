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
import { imageDb } from "../../../firebase/config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import {
  fetchAddNewAccounts,
  fetchUpdateAccounts,
} from "../../../redux/accountSlice";
import { toast } from "react-toastify";
import {
  fetchAddNewProduct,
  fetchUpdateProducts,
} from "../../../redux/productSlice";
import useLocalStorage from "../../hook/useLocalStorage";
import { undrawNodata } from "../../../assets/img/home";
const schema = yup.object({
  name: yup.string().required("Enter name product!"),
  brand: yup.string().required("Please select brand!"),
  material: yup.string().required("Please select material!"),
  includeDetail: yup.string().required("Enter your includeDetail!"),
  warehouse: yup.number().required("enter number in warehoure!"),
  price: yup.number().required("enter price for product!"),
  warrranty: yup.string().required("Enter warrranty!"),
});
let date = new Date();
let year = date.getFullYear();
let month = date.getUTCMonth() + 1;
let day = date.getUTCDate();
const ProductsForm = ({ data, btnSubmit = "Create", closeModal }) => {
  const [img, setImg] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  // const [images, setImages] = useLocalStorage("IMAGES", []);
  // const [isDragging, setIsDragging] = useState(false);
  const fileRef = useRef(null);
  const { dataAccount, departments, positions } = useSelector(
    (state) => state.accounts
  );
  const { brands, materials } = useSelector((state) => state.products);
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
  const handleSelectFile = () => {
    fileRef.current.click();
  };
  const onFileSelect = (e) => {
    console.log("e.target.files[0]", e.target.files[0]);
    const imgRef = ref(imageDb, `files/${uuidv4()}`);
    uploadBytes(imgRef, e.target.files[0]);
    setTimeout(() => {
      fetchImgFirebase();
    }, 1000);
  };
  const dispatch = useDispatch();
  const handleAddNewProduct = (values) => {
    console.log("update item", values);
    if (imgUrl.length > 0) {
      closeModal();
    }
    if (data) {
      let id = data.id;
      let putAccount = {
        name: values.name,
        imageProduct: imgUrl,
        brand: values.brand,
        material: values.material,
        includeDetail: values.includeDetail,
        warehouse: values.warehouse,
        price: values.price,
        warrranty: values.warrranty,
        createdAt:
          data.createdAt == "" || data.createdAt == undefined
            ? `${day}/${month}/${year}`
            : data.createdAt,
      };
      dispatch(
        fetchUpdateProducts({
          id,
          name: values.name,
          imageProduct: imgUrl.length > 0 ? imgUrl : data.imageProduct,
          brand: values.brand,
          material: values.material,
          includeDetail: values.includeDetail,
          warehouse: values.warehouse,
          price: values.price,
          warrranty: values.warrranty,
          createdAt:
            data.createdAt == "" || data.createdAt == undefined
              ? `${day}/${month}/${year}`
              : data.createdAt,
        })
      );
      if (
        values.name != data.name ||
        imgUrl != data.imageProduct ||
        values.brand != data.brand ||
        values.material != data.material ||
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
        imageProduct: imgUrl,
        brand: values.brand,
        material: values.material,
        includeDetail: values.includeDetail,
        warehouse: values.warehouse,
        price: values.price,
        warrranty: values.warrranty,
        createdAt: `${day}/${month}/${year}`,
      };
      dispatch(fetchAddNewProduct(newAccount));
      toast.success("Thêm mới product thành công!");

      reset();
    }
  };
  const fetchImgFirebase = () => {
    listAll(ref(imageDb, "files")).then((imgs) => {
      console.log("imgs", imgs);
      imgs.items.map((item) => {
        getDownloadURL(item).then((url) => {
          setImgUrl(url);
        });
      });
    });
  };
  console.log(imgUrl);
  return (
    <div className="max-h-[80vh] overflow-auto scrollbar-thin scrollbar-corner-slate-800">
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
        {/* file upload */}
        <div className="mb-3 flex justify-center">
          <div
            className={`w-1/3 p-2 
            border-dashed border-2
          rounded cursor-pointer ${
            imgUrl.length == 0 ? "border-red-500" : "border-cyan-500"
          }
          `}
            onClick={handleSelectFile}
          >
            <img
              src={imgUrl ? imgUrl : data ? data.imageProduct : undrawNodata}
              alt="Not image product !"
              className="shadow mb-2"
            />
            <div>
              <input
                type="file"
                ref={fileRef}
                className="d-none"
                onChange={onFileSelect}
              />
              <button
                type="button"
                className="py-2 flex w-full items-center text-xl gap-x-3 justify-center font-medium bg-primary rounded text-white"
              >
                <CloudDoneIcon></CloudDoneIcon>
                <span>Upload</span>
              </button>
            </div>
          </div>
        </div>
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
        explicabo. Repellendus? Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Laudantium nihil incidunt quae cupiditate
        exercitationem qui animi eaque aperiam a quo impedit aspernatur,
        corrupti atque modi eos, nam autem explicabo. Repellendus?
        <br />
        <Typography sx={{ float: "right" }} component="div">
          <CpnButton>{btnSubmit}</CpnButton>
        </Typography>
      </form>
    </div>
  );
};

export default ProductsForm;
