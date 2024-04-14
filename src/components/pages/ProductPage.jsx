import React, { useEffect } from "react";
import Banner from "../layout/Banner";
import HeaderFooter from "../layout/HeaderFooter";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import SellIcon from "@mui/icons-material/Sell";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../../redux/productSlice";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const data = [
  {
    name: "Iris Bechtelar",
    position: "versus",
    id: "1",
  },
  {
    name: "Lloyd D'Amore",
    position: "about",
    id: "3",
  },
  {
    name: "Jenna McLaughlin",
    position: "pro",
    id: "4",
  },
  {
    name: "Miss Marlon Kuvalis",
    position: "towards",
    id: "5",
  },
  {
    name: "Dr. Monica Hayes",
    position: "beneath",
    id: "6",
  },
  {
    name: "Rufus Gleichner",
    position: "into",
    id: "7",
  },
  {
    name: "Shelley Ferry DDS",
    position: "but",
    id: "8",
  },
  {
    name: "Kay Mueller",
    position: "lest",
    id: "9",
  },
  {
    name: "Grace Considine III",
    position: "besides",
    id: "10",
  },
];
const ProductPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(0);
  const { productsData } = useSelector((state) => state.products);

  const [age, setAge] = React.useState("");

  const handleChangeSelect = (e) => {
    setAge(e.target.value);
  };

  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const fetchDataProducts = async () => {
    const res = await axios.get(`http://localhost:3000/products?_page=${page}`);
    console.log(res.data.data);
    setProduct(res.data.data);
    setPageSize(res.data.pages);
  };
  const navigate = useNavigate();
  console.log(product);
  const handleChange = (e, p) => {
    console.log(e, p);
    setPage(p);
    window.location.href = "#layout-product";
  };
  useEffect(() => {
    fetchDataProducts();
  }, [page]);
  const getLinkImgProduct = (nameImg) => {
    const imageUrl = new URL(
      `../../assets/img/products/${nameImg}`,
      import.meta.url
    );
    return imageUrl;
  };
  const handleDetail = (id) => {
    alert(id);
  };
  return (
    <div>
      <HeaderFooter>
        <div id="layout-product"></div>
        <Banner></Banner>
        <div className="flex gap-x-8 mt-10">
          <div className="w-1/4">
            <div className="border-2 rounded-2xl p-3 sticky top-[103px]">
              <h3 className="font-medium border-b-2 pb-3">Brand</h3>
              <div className="mt-3">
                <div className="flex mb-2 items-center gap-x-1  border-2 rounded-full p-1">
                  <div className="flex justify-center items-center w-5 h-5 rounded-full border-2 bg-blue-500 text-white flex-shrink-0">
                    <CheckIcon sx={{ fontSize: "14px" }}></CheckIcon>
                  </div>
                  <span className="font-medium text-sm flex-shrink-0">
                    Latte Ally
                  </span>
                </div>
                <div className="flex   items-center gap-x-1  border-2  rounded-full p-1">
                  <div className="flex justify-center items-center w-5 h-5 rounded-full border-2 bg-blue-500 text-white flex-shrink-0">
                    <CheckIcon sx={{ fontSize: "14px" }}></CheckIcon>
                  </div>
                  <span className="font-medium text-sm flex-shrink-0">
                    Latte Ally
                  </span>
                </div>
              </div>
              <h3 className="font-medium border-b-2 pb-3 mt-3">Category</h3>
              <div className="mt-3 grid grid-cols-2 gap-x-2">
                <div className="flex  items-center gap-x-1  border-2  rounded-full p-1">
                  <div className="flex justify-center items-center w-5 h-5 rounded-full border-2 bg-blue-500 text-white flex-shrink-0">
                    <CheckIcon sx={{ fontSize: "14px" }}></CheckIcon>
                  </div>
                  <span className="font-medium text-sm flex-shrink-0">
                    Kính nữ
                  </span>
                </div>
                <div className="flex   items-center gap-x-1  border-2  rounded-full p-1">
                  <div className="flex justify-center items-center w-5 h-5 rounded-full border-2 bg-blue-500 text-white flex-shrink-0">
                    <CheckIcon sx={{ fontSize: "14px" }}></CheckIcon>
                  </div>
                  <span className="font-medium text-sm flex-shrink-0">
                    Kính nữ
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="sticky top-[103px] z-10">
              <div className="w-full shadow-sm px-2 bg-slate-100 py-2 flex items-center justify-between sticky top-0">
                <div className="flex items-center">
                  Sắp xếp theo{" "}
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      value={age}
                      onChange={handleChangeSelect}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      size="small"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {/* <MenuItem value={10}>Ten</MenuItem> */}
                      <MenuItem value={20}>Giá thấp đến cao</MenuItem>
                      <MenuItem value={30}>Giá cao đến Thấp</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <Pagination
                  count={pageSize}
                  onChange={handleChange}
                  size="large"
                  // showFirstButton={true}
                  // showLastButton={true}
                ></Pagination>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.length > 0 &&
                product.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 rounded-xl p-3 flex flex-col justify-between cursor-pointer "
                  >
                    <div>
                      <img
                        src={getLinkImgProduct(item.imageProduct)}
                        alt=""
                        onClick={() => {
                          handleDetail(item.id);
                        }}
                        className="h-72 object-cover w-full rounded shadow-sm transition-all duration-500 hover:scale-95 "
                      />
                      <div className=" flex flex-col gap-2 mt-3">
                        <div className="text-slate-700 font-medium flex gap-x-2 items-center border-b-2 pb-2">
                          <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>
                          <span>{item.name}</span>
                        </div>
                        <div className="text-blue-500 font-medium flex gap-x-2 items-center border-b-2 pb-2">
                          <BrandingWatermarkIcon></BrandingWatermarkIcon>
                          <span>{item.brand}</span>
                        </div>
                        <div className="text-yellow-500 font-medium flex gap-x-2 items-center">
                          <SellIcon></SellIcon>
                          <span>{item.price} vnd</span>
                        </div>
                      </div>
                    </div>
                    <button
                      className="bg-green-500 hover:bg-green-600 w-full font-medium text-white rounded py-2 mt-2"
                      onClick={() => {
                        dispatch(addToCart(item.id));
                        toast.success(`Đã thêm --${item.name}-- vào giỏ hàng!`);
                      }}
                    >
                      <AddShoppingCartIcon></AddShoppingCartIcon> Thêm giỏ hàng
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </HeaderFooter>
    </div>
  );
};

export default ProductPage;
