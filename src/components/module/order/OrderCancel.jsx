import React from "react";
import { useSelector } from "react-redux";
import CartMyOrder from "../cart/CartMyOrder";

const OrderCancel = () => {
  const { orderList } = useSelector((state) => state.products);
  console.log(orderList);
  const { auth } = useSelector((state) => state.auth);
  return (
    <div className="grid grid-cols-5 gap-4 mb-10 mx-8">
      {orderList.length > 0
        ? orderList.map((order) => {
            if (
              order.email == auth[0]?.email &&
              order.deliveryStatus == false &&
              order.statusOrder == false
            )
              return <CartMyOrder data={order} key={order.id}></CartMyOrder>;
          })
        : ""}
    </div>
  );
};

export default OrderCancel;
