import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Pagination } from "swiper/modules";
import "swiper/css";
// import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { setNameCate } from "../../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
const UL = styled.ul`
  li > img {
    border-radius: 100%;
  }
  p {
    text-align: center;
    margin-top: 20px;
  }
`;
const HomeCategory = () => {
  const { categorys, productsData } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterCate = (name) => {
    navigate(`/products-page?category=${name}`);
  };
  //   useEffect(() => {
  //     AOS.init({ duration: 1000 });
  //   }, []);
  return (
    <div>
      {/* <UL className="grid grid-cols-6 gap-x-10">
        {categorys?.length > 0
          ? categorys.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  handleFilterCate(item.name);
                }}
                data-aos="fade-down"
                className="cursor-pointer flex justify-center flex-col mt-3"
              >
                <img src={item.imgCategory} alt="" />
                <p>{item.name}</p>
              </li>
            ))
          : ""}
      </UL> */}
      <Swiper
        slidesPerView={6}
        spaceBetween={70}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {categorys?.length > 0
          ? categorys.map((item) => (
              <SwiperSlide key={item.id}>
                <li
                  onClick={() => {
                    handleFilterCate(item.name);
                  }}
                  data-aos="fade-down"
                  className="cursor-pointer"
                >
                  <img
                    src={item.imgCategory}
                    alt=""
                    className="rounded-full h-[250px] w-[250px] object-cover"
                  />
                  <p className="text-center mt-2">{item.name}</p>
                </li>
              </SwiperSlide>
            ))
          : ""}
      </Swiper>
    </div>
  );
};

export default HomeCategory;
