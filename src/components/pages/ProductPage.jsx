import React, { useEffect } from "react";
import Banner from "../layout/Banner";
import HeaderFooter from "../layout/HeaderFooter";
import { Pagination } from "@mui/material";
import { useState } from "react";
import axios from "axios";
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
        {product.length > 0 &&
          product.map((item) => (
            <div key={item.id}>
              {item.name}
              {item.price}
            </div>
          ))}
        <Pagination
          count={pageSize}
          onChange={handleChange}
          size="large"
          showFirstButton={true}
          showLastButton={true}
        ></Pagination>
      </HeaderFooter>
    </div>
  );
};

export default ProductPage;
