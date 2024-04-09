import React from "react";
import { banner1 } from "../../assets/img/home";

const Banner = ({ banner = banner1 }) => {
  return (
    <div>
      <img src={banner} alt="" width="100%" />
    </div>
  );
};

export default Banner;
