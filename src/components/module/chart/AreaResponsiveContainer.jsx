import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaResponsiveContainer = () => {
  const { orderList } = useSelector((state) => state.products);

  const getDayInWeek = (num) => {
    return moment().add(num, "days").format("DD/MM/YYYY");
  };

  // const getMoneyByMonth = () => {
  //   const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  //   const tempResult = month.map((item) => ({
  //     name: `Tháng ${item}`,
  //     success: 0,
  //   }));
  //   orderList.map((item) => {
  //     const orderMonth = parseInt(item.createdAt.split("/")[1]);
  //     tempResult[orderMonth - 1].success += item.totalPriceCarts;
  //   });

  //   return tempResult;
  // };
  // console.log(getMoneyByMonth());
  const getMoneyInDay = (num) => {
    let newMoney = [];
    orderList.map((item) => {
      if (item.createdAt == getDayInWeek(num) && item.deliveryStatus == true) {
        newMoney = [...newMoney, item.totalPriceCarts];
      }
    });
    return newMoney.length > 0 ? newMoney.reduce((a, b) => a + b) : 0;
  };
  const getMoneyPending = (num) => {
    let newMoney = [];
    orderList.map((item) => {
      if (
        item.createdAt == getDayInWeek(num) &&
        item.deliveryStatus == false &&
        item.statusOrder == true
      ) {
        newMoney = [...newMoney, item.totalPriceCarts];
      }
    });
    return newMoney.length > 0 ? newMoney.reduce((a, b) => a + b) : 0;
  };
  let newArr = [];
  for (let i = -6; i < 1; i++) {
    newArr = [
      ...newArr,
      {
        name: getDayInWeek(i),
        pending: getMoneyPending(i),
        success: getMoneyInDay(i),
      },
    ];
  }
  return (
    <div style={{ width: "100%", height: 315 }}>
      <ResponsiveContainer>
        <AreaChart
          data={newArr}
          margin={{
            top: 10,
            right: 30,
            left: 25,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            stackId="1"
            dataKey="success"
            stroke="#10877D"
            fill="#10877D"
          />
          <Area
            type="monotone"
            stackId="1"
            dataKey="pending"
            stroke="#a0a8a8"
            fill="#a0a8a8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaResponsiveContainer;
