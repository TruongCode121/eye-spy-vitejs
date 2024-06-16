import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchIsDeliveryStatusOrder } from "../../../redux/productSlice";
import { ButtonHome } from "../../button";
import useNumber from "../../hook/useNumber";
import CheckIcon from "@mui/icons-material/Check";
const DashboardIsDeliveryOrder = () => {
  const { orderList } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { convertToNumber } = useNumber();
  const handleDeliveryStatus = (row) => {
    Swal.fire({
      title: `${
        row.deliveryStatus
          ? `Hủy xác nhận đơn ${row.codeOrders}!`
          : `Xác nhận đơn ${row.codeOrders}!`
      }`,
      text: `${
        row.deliveryStatus
          ? `Đơn ${row.codeOrders} pending! `
          : `Đơn ${row.codeOrders} success!`
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          fetchIsDeliveryStatusOrder({
            id: row.id,
            address: row.address,
            phone: row.phone,
            email: row.email,
            fullname: row.fullname,
            codeOrders: row.codeOrders,
            createdAt: row.createdAt,
            statusOrder: row.statusOrder,
            deliveryStatus: !row.deliveryStatus,
            gender: row.gender,
            note: row.note,
            carts: row.carts,
            totalPriceCarts: row.totalPriceCarts,
          })
        );
        toast.success(`${row.codeOrders} success!`);
      }
    });
  };
  return (
    <div className="col-span-3 bg-white p-3 rounded">
      <div className="px-3 mb-2 text-orange-500 font-medium">
        Xác nhận đơn hàng:
      </div>
      <div>
        {orderList.map((ord) => {
          if (ord.deliveryStatus == false && ord.statusOrder == true) {
            return (
              <div
                key={ord.id}
                className="grid grid-cols-5 bg-orange-200 rounded mb-2 p-3  text-orange-900 font-medium"
              >
                <div>Đơn hàng: {ord.codeOrders}</div>
                <div>Email {ord.email}</div>
                <div>Ngày tạo: {ord.createdAt}</div>
                <div>Tổng Tiền: {convertToNumber(ord.totalPriceCarts)} đ</div>
                <div className="flex justify-center relative">
                  <ButtonHome
                    className="rounded absolute bg-green-500 text-white top-[50%] translate-y-[-50%] hover:bg-green-600"
                    onClick={() => {
                      handleDeliveryStatus(ord);
                    }}
                  >
                    <CheckIcon></CheckIcon>
                  </ButtonHome>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DashboardIsDeliveryOrder;
