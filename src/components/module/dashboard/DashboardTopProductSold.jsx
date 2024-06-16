import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import PaymentsIcon from "@mui/icons-material/Payments";
import useNumber from "../../hook/useNumber";
import { Tooltip } from "@mui/material";
import { setProductSold } from "../../../redux/productSlice";
const DashboardTopProductSold = () => {
  const { productSold, productsData, orderList } = useSelector(
    (state) => state.products
  );
  const { convertToNumber } = useNumber();
  const dispatch = useDispatch();
  const handleBestSellerProduct = () => {
    let newArr = [...productSold];
    let arr = newArr.sort((a, b) => b.quantity - a.quantity);
    let limitArr = arr.slice(0, 20);
    return limitArr;
  };
  const bestSeller = () => {
    let arrCartOrder = [];
    let newArr1 = [];
    let newArr3 = [];

    orderList.map((item) => {
      if (item.statusOrder == true) {
        item.carts.map((cart) => (arrCartOrder = [...arrCartOrder, cart]));
      }
    });

    arrCartOrder.map((item) => (newArr1 = [...newArr1, item.product_id]));
    let arr2 = [...new Set(newArr1)];

    arr2.map((item) => {
      newArr3 = [
        ...newArr3,
        {
          product_id: item,
          quantity: 0,
        },
      ];
    });

    arrCartOrder.map((item) => {
      let indexArr3 = newArr3.findIndex(
        (cart) => cart.product_id == item.product_id
      );
      if (item.product_id == newArr3[indexArr3].product_id) {
        newArr3[indexArr3].quantity += item.quantity;
      }
    });
    console.log(newArr3);
    return newArr3;
  };
  React.useEffect(() => {
    dispatch(setProductSold(bestSeller()));
  }, []);
  return (
    <div className="col-span-1 bg-white p-3 rounded">
      <div className="px-3 mb-2 text-teal-600 font-medium">
        Top Sản phẩm bán chạy
      </div>
      <div className="h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent">
        <div className="grid grid-cols-3 bg-slate-400 py-2 rounded-t mb-2 font-medium text-white sticky top-0">
          <div className="px-1">Ảnh</div>
          <div>Thông tin</div>
          <div className="text-center">Doanh thu</div>
        </div>
        {handleBestSellerProduct().length > 0 &&
          handleBestSellerProduct().map((item) => {
            let indexs = productsData.findIndex(
              (pro) => pro.id == item.product_id
            );
            if (item.product_id == productsData[indexs]?.id) {
              return (
                <div
                  key={item.product_id}
                  className="grid grid-cols-3 mb-2 p-1 rounded bg-gray-100"
                >
                  <img
                    src={
                      productsData[indexs]?.imageProduct
                        ? productsData[indexs]?.imageProduct
                        : undrawNodata
                    }
                    alt=""
                    className="w-20 h-20 rounded"
                  />
                  <div className="flex flex-col gap-1 text-slate-500">
                    <Tooltip title={productsData[indexs]?.name} placement="top">
                      <div className="flex cursor-pointer gap-x-2">
                        <div className="bg-lime-500 rounded-full w-6 h-6 flex-shrink-0 text-white flex justify-center items-center ">
                          <DriveFileRenameOutlineIcon
                            sx={{ fontSize: "14px" }}
                          ></DriveFileRenameOutlineIcon>
                        </div>

                        <div className="w-[150px] text-nowrap truncate ">
                          {productsData[indexs]?.name}
                        </div>
                      </div>
                    </Tooltip>
                    <div className="flex gap-x-2 ">
                      <div className="bg-indigo-500 rounded-full w-6 h-6 text-white flex justify-center items-center">
                        <ConfirmationNumberIcon
                          sx={{ fontSize: "14px" }}
                        ></ConfirmationNumberIcon>
                      </div>
                      {item.quantity}
                    </div>
                    <div className="flex gap-x-2">
                      <div className="bg-teal-500 rounded-full w-6 h-6 text-white flex justify-center items-center">
                        <PaymentsIcon sx={{ fontSize: "14px" }}></PaymentsIcon>
                      </div>
                      {convertToNumber(productsData[indexs]?.price)} đ
                    </div>
                  </div>

                  <div className=" flex justify-center items-center">
                    <div className="inline-block text-green-600  px-2 py-1 rounded-md">
                      {convertToNumber(
                        productsData[indexs]?.price * item.quantity
                      )}{" "}
                      đ
                    </div>
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};

export default DashboardTopProductSold;
