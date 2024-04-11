import React, { useEffect } from "react";
import Banner from "../layout/Banner";
import HeaderFooter from "../layout/HeaderFooter";
import { Pagination } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import SellIcon from "@mui/icons-material/Sell";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
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
  const [product, setProduct] = useState([]);
  const fetchDataProducts = async () => {
    const res = await axios.get(`http://localhost:3000/products?_page=${page}`);
    console.log(res.data.data);
    setProduct(res.data.data);
    setPageSize(res.data.pages);
  };
  console.log(product);
  const handleChange = (e, p) => {
    console.log(e, p);
    setPage(p);
  };
  useEffect(() => {
    fetchDataProducts();
  }, [page]);
  return (
    <div>
      <HeaderFooter>
        <Banner></Banner>
        <div className="flex gap-x-8">
          <div className="w-1/4 bg-orange-500"></div>
          <div>
            <div className="flex justify-center mt-4">
              <Pagination
                count={pageSize}
                onChange={handleChange}
                size="large"
                // showFirstButton={true}
                // showLastButton={true}
              ></Pagination>
            </div>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.length > 0 &&
                product.map((item) => (
                  <div
                    key={item.id}
                    className="border-2 rounded-xl p-3 flex flex-col justify-between"
                  >
                    <div>
                      <img
                        src={item.imageProduct}
                        alt=""
                        className="h-72 object-cover w-full rounded"
                      />
                      <div className=" flex flex-col gap-2 mt-3">
                        <div className="text-slate-500 font-medium flex gap-x-2 items-center border-b-2 pb-2">
                          <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>
                          <span>{item.name}</span>
                        </div>
                        <div className="text-blue-700 font-medium flex gap-x-2 items-center border-b-2 pb-2">
                          <BrandingWatermarkIcon></BrandingWatermarkIcon>
                          <span>{item.brand}</span>
                        </div>
                        <div className="text-yellow-500 font-medium flex gap-x-2 items-center">
                          <SellIcon></SellIcon>
                          <span>{item.price} vnd</span>
                        </div>
                      </div>
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 w-full font-medium text-white rounded py-2 mt-2">
                      <AddShoppingCartIcon></AddShoppingCartIcon> Shopping cart
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
