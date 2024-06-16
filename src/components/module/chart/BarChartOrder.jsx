import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BarChartOrder = () => {
  const { orderList } = useSelector((state) => state.products);
  const getMoneyByMonth = () => {
    const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const tempResult = month.map((item) => ({
      name: `Tháng ${item}`,
      success: 0,
    }));
    orderList.map((item) => {
      if (item.deliveryStatus == true) {
        const orderMonth = item.createdAt.split("/")[1];
        tempResult[orderMonth - 1].success += item.totalPriceCarts;
      }
    });

    return tempResult;
  };
  return (
    <div style={{ width: "100%", height: 315 }}>
      <ResponsiveContainer>
        <BarChart
          // width={500}
          // height={300}
          data={getMoneyByMonth()}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="success" fill="#44c493" background={{ fill: "#eee" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartOrder;
