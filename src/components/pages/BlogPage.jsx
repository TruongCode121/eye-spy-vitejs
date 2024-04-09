import React from "react";
import { banner2 } from "../../assets/img/home";
import Banner from "../layout/Banner";
import HeaderFooter from "../layout/HeaderFooter";

const BlogPage = () => {
  return (
    <div>
      <HeaderFooter>
        <Banner banner={banner2}></Banner>
        <div className="h-20 w-20  scrollbar scrollbar-thumb-red-500 border border-black overflow-y-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam cum
          amet id neque repellat aspernatur dolores facere magnam harum
          laudantium, consequatur tempore, expedita eum esse quia, est illum hic
          iure!
        </div>
      </HeaderFooter>
    </div>
  );
};

export default BlogPage;
