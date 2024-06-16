import React from "react";
import AreaResponsiveContainer from "../module/chart/AreaResponsiveContainer";
import BarChartOrder from "../module/chart/BarChartOrder";
import DashboardCards from "../module/dashboard/DashboardCards";
import DashboardTopProductSold from "../module/dashboard/DashboardTopProductSold";
import DashboardIsDeliveryOrder from "../module/dashboard/DashboardIsDeliveryOrder";
import DashboardChartOrder from "../module/dashboard/DashboardChartOrder";

const DashBoardPage = () => {
  return (
    <div>
      <div className="grid grid-cols-3 gap-3">
        <DashboardCards></DashboardCards>
        <div className=" bg-white p-2 col-span-2 rounded">
          <div className="px-3 mb-2 text-teal-600 font-medium">
            Doanh số 7 ngày gần nhất:
          </div>
          <AreaResponsiveContainer></AreaResponsiveContainer>
        </div>
        <DashboardChartOrder></DashboardChartOrder>
        <DashboardIsDeliveryOrder></DashboardIsDeliveryOrder>
        <DashboardTopProductSold></DashboardTopProductSold>
        <div className="col-span-2 bg-white p-3 rounded">
          <div className="px-3 mb-2 text-teal-600 font-medium">
            Doanh số các tháng:
          </div>
          <BarChartOrder></BarChartOrder>
        </div>
        {/* <div>
          <FormDate></FormDate>
        </div> */}
      </div>
    </div>
  );
};

export default DashBoardPage;
