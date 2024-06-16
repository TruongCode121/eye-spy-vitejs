import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ButtonHome } from "../button";
import HeaderFooter from "../layout/HeaderFooter";
import CartMyOrder from "../module/cart/CartMyOrder";
import MyOrder from "../module/order/MyOrder";
import OrderCancel from "../module/order/OrderCancel";
import OrderEmpty from "../module/order/orderEmpty";
import OrderForm from "../module/order/OrderForm";
import OrderSuccess from "../module/order/OrderSuccess";

const OrderPage = () => {
  const [filter, setFilter] = useState("order");
  const { auth } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.products);
  const [newDataSearch, setNewDataSearch] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const filterOrder = (stt) => {
    setFilter(stt);
  };
  const [valueSearch, setValueSearch] = React.useState("");

  const dataSearch = (data, inputSearch) => {
    let newArr = [];
    let valueSearch = inputSearch.length > 0 ? inputSearch.toUpperCase() : "";
    if (valueSearch.length > 0) {
      data.map((item) => {
        let textEmail = item.email;
        let textPhone = item.phone;
        let txtEmailUp = textEmail.toUpperCase();

        // let txtSearch = txtEmailUp.includes(valueSearch);
        if (txtEmailUp == valueSearch || textPhone == valueSearch) {
          newArr = [...newArr, item];
        }
      });
      // setDataOrder(newArr);

      setNewDataSearch(newArr);
    } else {
      setNewDataSearch(newArr);
    }
  };
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };
  // let newData = dataSearch(orderList, valueSearch);
  useEffect(() => {
    dataSearch(orderList, valueSearch);
  }, [valueSearch, orderList]);
  console.log(newDataSearch);
  return (
    <div>
      <HeaderFooter status={true}>
        <div className="flex gap-x-2 items-center justify-between">
          <div className="flex gap-x-2 m-8">
            <ButtonHome
              className={`${filter === "order" ? "bg-black text-white" : ""}`}
              onClick={() => {
                filterOrder("order");
              }}
            >
              <span className="dark:text-white">Đặt hàng</span>
            </ButtonHome>
            <ButtonHome
              className={`${filter === "myOrder" ? "bg-black text-white" : ""}`}
              onClick={() => {
                filterOrder("myOrder");
              }}
            >
              <span className="dark:text-white"> Đơn chờ xác nhận</span>
            </ButtonHome>
            <ButtonHome
              className={`${
                filter === "orderSuccess" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                filterOrder("orderSuccess");
              }}
            >
              <span className="dark:text-white"> Đơn đã xác nhận</span>
            </ButtonHome>

            <ButtonHome
              className={`${
                filter === "orderCancel" ? "bg-black text-white" : ""
              }`}
              onClick={() => {
                filterOrder("orderCancel");
              }}
            >
              <span className="dark:text-white"> Đơn hủy </span>
            </ButtonHome>
          </div>
          <div className="w-1/2">
            {auth.length == 0 ? (
              <div className="w-2/3 ml-auto  dark:bg-slate-300 rounded-t mr-8">
                <TextField
                  // error
                  id="outlined-error-helper-text"
                  label="Nhập email hoặc số điện thoại đặt hàng..."
                  variant="filled"
                  size="small"
                  onChange={handleChangeSearch}
                  sx={{ width: "100%" }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        {filter === "order" && (
          <OrderForm filterOrder={filterOrder}></OrderForm>
        )}

        {filter === "myOrder" && auth.length > 0 ? (
          <MyOrder></MyOrder>
        ) : filter === "myOrder" &&
          auth.length == 0 &&
          newDataSearch.length > 0 ? (
          <div className="grid grid-cols-5 mx-8 gap-4">
            {newDataSearch.map((order) => {
              if (order.deliveryStatus == false && order.statusOrder == true)
                return <CartMyOrder data={order} key={order.id}></CartMyOrder>;
            })}
          </div>
        ) : filter === "myOrder" ? (
          <OrderEmpty title="Không tìm thấy đơn hàng của bạn"></OrderEmpty>
        ) : (
          ""
        )}
        {/* Đơn hoàn thành */}
        {filter === "orderSuccess" && auth.length > 0 ? (
          <OrderSuccess></OrderSuccess>
        ) : filter === "orderSuccess" &&
          auth.length == 0 &&
          newDataSearch.length > 0 ? (
          <div className="grid grid-cols-5 mx-8 gap-4">
            {newDataSearch.map((order) => {
              if (order.deliveryStatus == true && order.statusOrder == true)
                return <CartMyOrder data={order} key={order.id}></CartMyOrder>;
            })}
          </div>
        ) : filter === "orderSuccess" ? (
          <OrderEmpty title="Không tìm thấy đơn hàng của bạn"></OrderEmpty>
        ) : (
          ""
        )}
        {/* Đơn hủy */}
        {filter === "orderCancel" && auth.length > 0 ? (
          <OrderCancel></OrderCancel>
        ) : filter === "orderCancel" &&
          auth.length == 0 &&
          newDataSearch.length > 0 ? (
          <div className="grid grid-cols-5 mx-8 gap-4">
            {newDataSearch.map((order) => {
              if (order.statusOrder == false)
                return <CartMyOrder data={order} key={order.id}></CartMyOrder>;
            })}
          </div>
        ) : filter === "orderCancel" ? (
          <OrderEmpty title="Không tìm thấy đơn hàng của bạn"></OrderEmpty>
        ) : (
          ""
        )}
        <br />
      </HeaderFooter>
    </div>
  );
};

export default OrderPage;
