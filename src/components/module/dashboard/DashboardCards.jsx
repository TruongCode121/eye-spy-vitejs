import React from "react";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TodayIcon from "@mui/icons-material/Today";
import { useSelector } from "react-redux";
import useNumber from "../../hook/useNumber";
import moment from "moment";
const DashboardCards = () => {
  const { orderList } = useSelector((state) => state.products);
  const { convertToNumber } = useNumber();
  const handleRevenue = () => {
    let newArr = [];
    let totalRevenue = 0;
    orderList.map((item) => {
      if (item.deliveryStatus == true) {
        newArr = [...newArr, item.totalPriceCarts];
      }
    });
    totalRevenue = newArr.length > 0 ? newArr.reduce((a, b) => a + b) : 0;
    return convertToNumber(totalRevenue);
  };
  const totalRevenueInDay = () => {
    let newArr = [];
    let totalRevenue = 0;
    orderList.map((item) => {
      if (
        item.statusOrder == true &&
        item.deliveryStatus == true &&
        item.createdAt == moment().format("DD/MM/YYYY")
      ) {
        newArr = [...newArr, item.totalPriceCarts];
      }
    });
    totalRevenue = newArr.length > 0 ? newArr.reduce((a, b) => a + b) : 0;
    return convertToNumber(totalRevenue);
  };
  const totalOrderInDay = () => {
    let newArr = [];
    let totalOrder = 0;
    orderList.map((item) => {
      if (
        item.statusOrder == true &&
        item.createdAt == moment().format("DD/MM/YYYY")
      ) {
        newArr = [...newArr, item];
      }
    });
    totalOrder = newArr.length;
    return totalOrder;
  };
  return (
    <>
      <Cards func={handleRevenue}></Cards>
      <Cards
        func={totalRevenueInDay}
        className="from-indigo-700 to-indigo-400"
        title="Doanh Thu Hôm Nay"
      >
        <TrendingUpIcon sx={{ fontSize: "36px" }}></TrendingUpIcon>
      </Cards>
      <Cards
        func={totalOrderInDay}
        className="from-orange-600 to-orange-300 "
        title="Đơn Hàng Hôm Nay"
      >
        <TodayIcon sx={{ fontSize: "36px" }}></TodayIcon>
      </Cards>
    </>
  );
};

export function Cards({
  className = "from-teal-700 to-teal-500",
  title = "Tổng Doanh Thu",
  func,
  childrend = <LeaderboardIcon sx={{ fontSize: "36px" }}></LeaderboardIcon>,
}) {
  return (
    <div
      className={`bg-gradient-to-r ${className} text-white rounded flex justify-between items-center p-4`}
    >
      <div className="text-left">
        <p className="text-2xl font-medium">{title}</p>
        <p>{func()} đ</p>
      </div>
      <div className="p-3 rounded-full bg-white text-slate-700">
        {childrend}
      </div>
    </div>
  );
}
export default DashboardCards;
