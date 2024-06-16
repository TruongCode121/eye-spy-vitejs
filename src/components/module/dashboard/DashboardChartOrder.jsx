import React from "react";
import PieChartWithCustomizedLabel from "../chart/PieChartWithCustomizedLabel";
import RunningWithErrorsIcon from "@mui/icons-material/RunningWithErrors";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import SubtitlesOffIcon from "@mui/icons-material/SubtitlesOff";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useSelector } from "react-redux";
const DashboardChartOrder = () => {
  const { orderList } = useSelector((state) => state.products);
  const filterValue = (data = [], status) => {
    switch (status) {
      case "valueA":
        return data.filter((item) => item.deliveryStatus == true).length;
      case "valueB":
        return data.filter(
          (item) => item.deliveryStatus == false && item.statusOrder == true
        ).length;
      default:
        return data.filter((item) => item.statusOrder == false).length;
    }
  };

  return (
    <div className=" px-16 bg-white  rounded-t-full rounded-b">
      <div className="flex justify-center">
        <PieChartWithCustomizedLabel></PieChartWithCustomizedLabel>
      </div>
      <div className="font-medium flex items-center gap-x-1 mb-2">
        <RunningWithErrorsIcon
          sx={{ fontSize: "20px" }}
        ></RunningWithErrorsIcon>
        Tỉ lệ đơn hàng
      </div>

      <div className="border-b-2 border-b-[#0088FE] text-[#0088FE] flex justify-between">
        <span className="flex gap-x-2 items-center">
          <CheckBoxIcon sx={{ fontSize: "20px" }}></CheckBoxIcon>Đơn đã xác
          nhận:
        </span>
        <span className="text-slate-700 font-medium">
          {filterValue(orderList, "valueA")}
        </span>
      </div>
      <div className="border-b-2 border-b-[#00C49F] text-[#00C49F] my-3 flex justify-between">
        <span className="flex gap-x-2 items-center">
          <PendingActionsIcon sx={{ fontSize: "20px" }}></PendingActionsIcon>{" "}
          Đơn chờ xác nhận:
        </span>
        <span className="text-slate-700 font-medium">
          {filterValue(orderList, "valueB")}
        </span>
      </div>
      <div className="border-b-2 border-b-[#FFBB28] text-[#FFBB28] flex justify-between">
        <span className="flex gap-x-2 items-center">
          <SubtitlesOffIcon sx={{ fontSize: "20px" }}></SubtitlesOffIcon>
          Đơn khách hủy:
        </span>
        <span className="text-slate-700 font-medium">
          {filterValue(orderList, "")}
        </span>
      </div>
    </div>
  );
};

export default DashboardChartOrder;
