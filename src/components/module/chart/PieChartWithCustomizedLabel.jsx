import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const PieChartWithCustomizedLabel = () => {
  const { orderList } = useSelector((state) => state.products);
  let valueA = orderList.filter((item) => item.deliveryStatus == true).length;
  let valueB = orderList.filter(
    (item) => item.deliveryStatus == false && item.statusOrder == true
  ).length;
  let valueC = orderList.filter((item) => item.statusOrder == false).length;
  const data = [
    { name: "Giao thành công", value: valueA },
    { name: "Chưa giao", value: valueB },
    { name: "Hủy Đơn", value: valueC },
    //   { name: "Group D", value: 200 },
  ];
  return (
    <PieChart width={400} height={200}>
      <Pie
        data={data}
        cx={200}
        cy={100}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default PieChartWithCustomizedLabel;
