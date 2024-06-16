import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { undraw_shopping_app_flsj } from "../../../assets/img/home";
import { ButtonHome } from "../../button";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchIsStatusOrder } from "../../../redux/productSlice";
import { useDispatch } from "react-redux";
import OrderDetail from "../order/OrderDetail";

export default function CartMyOrder({ data }) {
  // const dispatch = useDispatch();
  // const cancelOrder = () => {
  //   Swal.fire({
  //     title: `Hủy đơn ${data.codeOrders}`,
  //     text: `Bạn sẽ phải đặt đơn mới nếu muốn mua lại những sản phẩm trong đơn này!`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#1DC071",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Hủy!",
  //     cancelButtonText: "Không",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       toast.success("Đã hủy");
  //       dispatch(
  //         fetchIsStatusOrder({
  //           id: data.id,
  //           address: data.address,
  //           phone: data.phone,
  //           email: data.email,
  //           fullname: data.fullname,
  //           codeOrders: data.codeOrders,
  //           createdAt: data.createdAt,
  //           statusOrder: !data.statusOrder,
  //           deliveryStatus: data.deliveryStatus,
  //           gender: data.gender,
  //           note: data.note,
  //           carts: data.carts,
  //           totalPriceCarts: data.totalPriceCarts,
  //         })
  //       );
  //     }
  //   });
  // };
  return (
    <div className="dark:bg-slate-600 shadow">
      <CardMedia
        sx={{ height: 100 }}
        image={undraw_shopping_app_flsj}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ color: "#3e3e3e" }}
        >
          Mã vận đơn: <span className="text-cyan-500"> {data.codeOrders}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          tổng tiền:{data.totalPriceCarts} đ
        </Typography>
        <Typography variant="body2" color="text.secondary">
          tình trạng:{" "}
          <span className="text-cyan-500">
            {data.statusOrder
              ? !data.deliveryStatus
                ? "Chờ xác nhận"
                : "Đã xác nhận"
              : "Hủy đơn"}
          </span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: <span className="text-cyan-500">{data.email}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ngày tạo: <span className="text-cyan-500">{data.createdAt}</span>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Số điện thoại: <span className="text-cyan-500">0{data.phone}</span>
        </Typography>
      </CardContent>
      <div className="flex justify-center px-3 pb-2">
        <OrderDetail data={data}></OrderDetail>
      </div>
      {/* {data.statusOrder == true && data.deliveryStatus == false ? (
        <div className="flex justify-between items-center px-3 pb-2">
          <OrderDetail data={data}></OrderDetail>
          <Button size="small" onClick={cancelOrder} color="error">
            Hủy đơn
          </Button>
        </div>
      ) : (
        <div className="flex justify-end px-3 pb-2">
          <OrderDetail data={data}></OrderDetail>
        </div>
      )} */}
    </div>
  );
}
