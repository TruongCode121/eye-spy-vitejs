import React from "react";
import { banner2 } from "../../assets/img/home";
import Banner from "../layout/Banner";
import HeaderFooter from "../layout/HeaderFooter";

const BlogPage = () => {
  return (
    <div>
      <HeaderFooter>
        <Banner banner={banner2}></Banner>
      </HeaderFooter>
    </div>
  );
};

export default BlogPage;
