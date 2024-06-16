import React from "react";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BrandingWatermarkIcon from "@mui/icons-material/BrandingWatermark";
import SellIcon from "@mui/icons-material/Sell";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { addToCart } from "../../../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { undrawNodata } from "../../../assets/img/home";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import DnsIcon from "@mui/icons-material/Dns";
import CategoryIcon from "@mui/icons-material/Category";
import { Tooltip } from "@mui/material";
const ProductListItem = ({ product, convertToNumber }) => {
  const { detailProduct } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(detailProduct);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {product.length > 0 ? (
        product.map((item) => (
          <div
            key={item.id}
            className="border-2 dark:border-slate-800 dark:bg-slate-700  rounded-xl p-3 flex flex-col justify-between cursor-pointer "
          >
            <div>
              <NavLink to={`/detail-product?id=${item.id}`} target="_blank">
                <img
                  src={item.imageProduct}
                  alt=""
                  className="h-72 object-cover w-full rounded shadow-sm transition-all duration-500 hover:scale-95 "
                />
              </NavLink>

              <div className="text-slate-700 dark:text-slate-300 font-medium flex gap-x-2 justify-center items-center mt-2">
                {/* <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon> */}
                <span>{item.name}</span>
              </div>
            </div>
            <div>
              <div className="text-red-400 dark:text-white font-medium flex gap-x-2 items-center pt-2">
                <SellIcon></SellIcon>
                <span>{convertToNumber(item.price)} đ</span>
              </div>
              <div className="text-teal-500 dark:text-slate-300 font-medium flex gap-x-2 items-center border-y-2 py-2">
                <ToolTipOption title={item.category} className="bg-indigo-500">
                  <CategoryIcon sx={{ fontSize: "16px" }}></CategoryIcon>
                </ToolTipOption>
                <ToolTipOption title={item.brand} className="bg-orange-500">
                  <BrandingWatermarkIcon
                    sx={{ fontSize: "16px" }}
                  ></BrandingWatermarkIcon>
                </ToolTipOption>
                <ToolTipOption title={item.material} className="bg-yellow-400">
                  <DnsIcon sx={{ fontSize: "16px" }}></DnsIcon>
                </ToolTipOption>
              </div>

              {item.warehouse < 2 ? (
                <button
                  className="bg-red-500 hover:bg-red-600 w-full font-medium text-white rounded py-2 mt-2"
                  onClick={() => {
                    toast.error(`Hết Hàng`);
                  }}
                >
                  <RemoveShoppingCartIcon></RemoveShoppingCartIcon> Hêt hàng
                </button>
              ) : (
                <button
                  className="bg-teal-600 hover:bg-teal-500 flex items-center justify-center gap-x-3 w-full font-medium text-white rounded py-2 mt-2"
                  onClick={() => {
                    dispatch(addToCart(item.id));
                    toast.success(`Đã thêm --${item.name}-- vào giỏ hàng!`);
                  }}
                >
                  <FaCartPlus size={20}></FaCartPlus> Thêm giỏ hàng
                </button>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center flex-col items-center mt-4">
          <img
            src={undrawNodata}
            alt=""
            className="w-[400px] h-[350px] border-2 rounded"
          />
          <div>No data</div>
        </div>
      )}
    </div>
  );
};
export function ToolTipOption({ title, children, className }) {
  return (
    <Tooltip title={title} placement="top">
      <div
        className={`w-7 h-7 ${className} rounded-full text-white flex items-center justify-center`}
      >
        {/* <DnsIcon sx={{ fontSize: "16px" }}></DnsIcon> */}
        {children}
      </div>
    </Tooltip>
  );
}
export default ProductListItem;
