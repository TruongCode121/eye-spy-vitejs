import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FontBarlow, FontParata } from "../../assets/style/font";
import { addToCart } from "../../redux/productSlice";
import { ButtonHome } from "../button";
import HeaderFooter from "../layout/HeaderFooter";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const DetailPage = () => {
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const productId = params.get("id");
  console.log("detail", detail);
  const getIdProduct = async () => {
    const res = await axios
      .get(`http://localhost:3000/products/${productId}`)
      .then((res) => {
        return res.data;
      });
    setDetail(res);
  };
  useEffect(() => {
    getIdProduct();
    window.scrollTo(0, 0);
  }, []);
  const convertToNumber = (number) => {
    let newNumber = new Intl.NumberFormat().format(number);
    return newNumber;
  };
  return (
    <HeaderFooter status={true}>
      <div className="flex justify-center bg-gradient-to-tr from-teal-400 to-pink-500 p-10">
        <div className="w-2/3 bg-white flex rounded p-10 gap-x-10">
          <img src={detail.imageProduct} alt="" className="w-[50%] h-[500px]" />
          <div className="w-1/2  relative">
            <NavLink
              to="/products-page"
              className="flex justify-end items-center  hover:text-teal-500"
            >
              <ArrowBackIcon sx={{ fontSize: "19px" }}></ArrowBackIcon>
              <span>Xem thêm sản phẩm</span>
            </NavLink>
            <div className="border-b-2 mb-2 pb-2">
              <FontParata className="text-4xl">{detail.name}</FontParata>
            </div>
            <div>
              <FontBarlow className="text-3xl text-red-500">
                {convertToNumber(detail.price)} đ
              </FontBarlow>
            </div>
            <SubDetail
              header="Danh mục:"
              dataName={detail.category}
            ></SubDetail>
            <div className="flex items-center gap-x-3">
              <SubDetail
                header="Thương hiệu:"
                dataName={detail.brand}
              ></SubDetail>
              <SubDetail
                header="Chất liệu:"
                dataName={detail.material}
              ></SubDetail>
              <SubDetail
                header="Tình trạng :"
                dataName={detail.warehouse >= 2 ? "Còn hàng" : "Hết hàng"}
              ></SubDetail>
            </div>
            <div className="flex gap-x-3">
              <SubDetail
                header=" Bảo hành:"
                dataName={detail.warrranty}
              ></SubDetail>
            </div>
            <SubDetail
              header="Mô tả:"
              dataName={detail.includeDetail}
              className="mb-14"
            ></SubDetail>
            <div className="absolute bottom-0 right-0">
              <div className="flex justify-end">
                <ButtonHome
                  className="bg-green-500 hover:bg-green-600 font-medium text-white rounded py-2 mt-2"
                  onClick={() => {
                    dispatch(addToCart(detail.id));
                    toast.success(`Đã thêm --${detail.name}-- vào giỏ hàng!`);
                  }}
                >
                  <AddShoppingCartIcon></AddShoppingCartIcon> Thêm giỏ hàng
                </ButtonHome>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderFooter>
  );
};
export const SubDetail = ({ header, dataName, className }) => {
  return (
    <div className={className}>
      <span className="font-bold text-sm"> {header} </span> <br />
      <div className="flex items-center my-2">
        <span className=" px-3 py-1 border-1 rounded font-medium">
          {dataName}
        </span>
      </div>
    </div>
  );
};
export default DetailPage;
