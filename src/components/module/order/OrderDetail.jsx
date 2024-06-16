import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FontBarlow, FontParata } from "../../../assets/style/font";
import OrderDetailTable from "./OrderDetailTable";
import useNumber from "../../hook/useNumber";
import { qrpay } from "../../../assets/img/home";
import { ButtonHome } from "../../button";
import { useDispatch } from "react-redux";
import { fetchIsStatusOrder } from "../../../redux/productSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function OrderDetail({ data, textBtn = "Chi tiết", className }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { convertToNumber } = useNumber();
  const dispatch = useDispatch();
  const cancelOrder = () => {
    handleClose();
    Swal.fire({
      title: `Hủy đơn ${data.codeOrders}`,
      text: `Bạn sẽ phải đặt đơn mới nếu muốn mua lại những sản phẩm trong đơn này!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Hủy!",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.success("Đã hủy");
        dispatch(
          fetchIsStatusOrder({
            id: data.id,
            address: data.address,
            phone: data.phone,
            email: data.email,
            fullname: data.fullname,
            codeOrders: data.codeOrders,
            createdAt: data.createdAt,
            statusOrder: !data.statusOrder,
            deliveryStatus: data.deliveryStatus,
            gender: data.gender,
            note: data.note,
            carts: data.carts,
            totalPriceCarts: data.totalPriceCarts,
          })
        );
      } else {
        handleOpen();
      }
    });
  };
  return (
    <div>
      <ButtonHome
        onClick={handleOpen}
        className={`bg-slate-500 text-white rounded hover:bg-slate-700 ${className}`}
      >
        {textBtn}
      </ButtonHome>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="div">
            <div className="text-center">CHI TIẾT ĐƠN HÀNG</div>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            component="div"
          >
            <div className="flex gap-x-3">
              <div className="w-2/3">
                <div className="bg-slate-200 flex justify-between p-3 items-center rounded ">
                  <div className="font-bold text-slate-600">
                    Đơn hàng: <span>{data.codeOrders}</span> -
                    <span className="font-medium text-sm ml-2">
                      Ngày tạo: {data.createdAt}
                    </span>
                  </div>
                  {data.deliveryStatus ? (
                    <div className="bg-green-500 text-white rounded inline-block px-2 py-1">
                      Đã xác nhận
                    </div>
                  ) : !data.deliveryStatus && data.statusOrder ? (
                    <div className="bg-slate-500 text-white rounded inline-block px-2 py-1">
                      Chờ xác nhận
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white rounded inline-block px-2 py-1">
                      Đơn đã hủy
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <OrderDetailTable data={data}></OrderDetailTable>
                </div>
              </div>
              <div className="w-1/3 ">
                <div className=" border-1 rounded">
                  <div className="bg-slate-200 py-2 px-3 rounded-t  text-slate-600">
                    KHÁCH HÀNG
                  </div>
                  <div className="px-3 pt-2">
                    {data.gender == "female" ? "Chị - " : "Anh - "}
                    <span className="font-bold">{data.fullname}</span>
                  </div>
                  <div className=" px-3 ">
                    Sđt - <span className="text-slate-400 ">0{data.phone}</span>
                  </div>
                  <div className=" px-3  pb-2">
                    Địa chỉ{" - "}
                    <span className="text-slate-400 ">{data.address}</span>
                  </div>
                </div>
                <div className=" border-1 rounded mt-3">
                  <div className="bg-slate-200 py-2 px-3 rounded-t  text-slate-600">
                    GHI CHÚ
                  </div>
                  <div className="px-3 py-2 h-[150px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent overflow-y-auto overflow-x-hidden">
                    {data.note}
                  </div>
                </div>
                <div className=" border-1 rounded mt-3">
                  <div className="bg-slate-200 py-2 px-3 rounded-t  text-slate-600">
                    THANH TOÁN
                  </div>
                  <div className="px-3 pt-2 pb-1 flex justify-between ">
                    <p className="text-slate-400">Tiền mặt:</p>{" "}
                    <div className="font-bold text-red-500">
                      {convertToNumber(data.totalPriceCarts)} đ
                    </div>
                  </div>
                  <div className="px-3 pb-2 flex justify-between ">
                    <p className="text-slate-400">Quét Mã QR:</p>{" "}
                    <img src={qrpay} alt="" className="w-20 h-20" />
                  </div>
                </div>
                <div className="mt-[11px] flex gap-x-2 justify-end">
                  {!data.deliveryStatus && data.statusOrder ? (
                    <ButtonHome
                      className="bg-teal-800 text-red-50 rounded hover:bg-teal-700"
                      onClick={cancelOrder}
                    >
                      Hủy đơn
                    </ButtonHome>
                  ) : (
                    ""
                  )}
                  <ButtonHome
                    className="bg-red-500 text-red-50 rounded hover:bg-red-600"
                    onClick={handleClose}
                  >
                    Đóng
                  </ButtonHome>
                </div>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
