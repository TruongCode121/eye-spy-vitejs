import React from "react";
import { NavLink } from "react-router-dom";
import { undrawNodata } from "../../../assets/img/home";

const OrderEmpty = ({ title = "  Không có sản phẩm nào trong giỏ hàng!" }) => {
  return (
    <div className=" flex justify-center my-2">
      <div className="w-[600px] p-3 rounded bg-slate-500">
        <img
          src={undrawNodata}
          alt=""
          className="w-full rounded-2xl border-2"
        />
        <div className="text-white font-medium text-center my-2">{title}</div>
        <NavLink
          to={"/"}
          className="w-full text-center hover:bg-slate-200 bg-slate-100 rounded py-2 text-slate-700 font-medium"
          type="button"
        >
          QUAY VỀ TRANG CHỦ
        </NavLink>
        <div className="text-center text-white mt-2">
          Khi cần trợ giúp vui lòng gọi{" "}
          <span className="text-cyan-400">1900 232 460</span> hoặc 028.3622.1060{" "}
          <span className="text-cyan-400"> (7h30 - 22h)</span>
        </div>
      </div>
    </div>
  );
};

export default OrderEmpty;
