import React, { useEffect } from "react";
import HeaderFooter from "../layout/HeaderFooter";
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import Hom2 from "../../assets/img/home/hom2.webp";
import Hom1 from "../../assets/img/home/hom1.webp";
import {
  hom10,
  hom11,
  hom12,
  hom13,
  hom14,
  hom15,
  hom16,
  hom17,
  hom8,
  hom9,
} from "../../assets/img/home";
import { ButtonHome } from "../button";
import { pro3, pro4, pro7, pro8 } from "../../assets/img/products";
import video from "../../assets/img/home/video1.webm";
import { FlexBetween, FlexCenter } from "../../assets/style/cssCustom";
import { FontAthiti, FontBarlow, FontParata } from "../../assets/style/font";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import HomeCategory from "../module/home/HomeCategory";
const UL = styled.ul`
  li > img {
    border-radius: 100%;
  }
  p {
    text-align: center;
    margin-top: 20px;
  }
`;
const Pleft = styled.p`
  margin-bottom: 20px;
  font-family: "Barlow", serif;
`;

const DivStyless = styled.div`
  margin-top: 132px;
`;

const Top2 = styled.div`
  margin-top: DivStyless;
  img {
    width: 100%;
  }
`;
const Blog = styled.div`
  margin-top: 132px;
  .news {
    cursor: pointer;
  }
  img {
    width: 100%;
  }
  h3 {
    font-weight: bold;
    font-size: 18px;
    margin: 20px 0;
  }
  p {
    font-size: 13px;
  }
`;

const blogHover = ` hover:scale-105 transition-all duration-500`;
const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="dark:text-white" data-aos-easing="ease-in-out">
      <HeaderFooter>
        {/* banner */}
        <div className={`${FlexBetween} items-center `}>
          <div className="w-3/5 flex flex-col gap-y-10">
            <div data-aos="fade-right">
              <FontParata className="text-5xl">
                Nâng tầm trải nghiệm mua sắm kính mắt của bạn
              </FontParata>
            </div>
            <div className={`${FlexBetween} items-center`} data-aos="fade-up">
              <div className="w-2/3">
                <FontBarlow className="mb-4">
                  EYE SPY là cửa hàng kính mắt chuyên cung cấp các sản phẩm kính
                  mắt chính hãng từ các thương hiệu nổi tiếng trên thế giới. Với
                  đội ngũ nhân viên tư vấn chuyên nghiệp và tận tâm, EYE SPY
                  luôn mang đến cho khách hàng những trải nghiệm mua sắm tốt
                  nhất.
                </FontBarlow>

                <NavLink to="/products-page">
                  <ButtonHome>
                    <FontAthiti>Kho sản phẩm </FontAthiti>
                  </ButtonHome>
                </NavLink>
              </div>
              <div>
                <img src={Hom2} alt="" />
              </div>
            </div>
          </div>
          <div className="w-6/12" data-aos="fade-left">
            <img src={Hom1} alt="" className="w-full" />
          </div>
        </div>
        {/* top1 */}
        <DivStyless>
          <HomeCategory></HomeCategory>
        </DivStyless>
        <Top2 className={`mt-32 ${FlexBetween}`}>
          <div className="w-1/3 ">
            <div className="sticky top-[110px]">
              <span>Bộ sưu tập</span>
              <FontAthiti></FontAthiti>
              <h2 className="text-3xl font-medium mb-4 mt-3">
                <FontAthiti>Khám phá </FontAthiti>
                <FontParata className="italic"> Eye Catcher</FontParata>
              </h2>
              <Pleft>
                Dù bạn đang tìm kiếm một cặp kính mới để đeo hàng ngày hay một
                cặp kính đặc biệt cho buổi tiệc, bộ sưu tập Eye Catcher đều có
                cả! Từ kiểu dáng mắt mèo cổ điển đến những kiểu dáng nổi bật, bộ
                sưu tập này sẽ hoàn toàn phù hợp với cá tính của bạn.
              </Pleft>

              <NavLink to="/products-page">
                <ButtonHome>Mua Ngay</ButtonHome>{" "}
              </NavLink>
            </div>
          </div>
          <div className="w-2/3 ">
            <div className="grid grid-cols-2 gap-8">
              <div className="shadow-2xl">
                <img src={pro8} alt="" />
              </div>
              <div>
                <img src={pro3} alt="" />
              </div>
              <div>
                <img src={pro7} alt="" />
              </div>
              <div className="shadow-2xl ">
                <img src={pro4} alt="" />
              </div>
            </div>
          </div>
        </Top2>
        <DivStyless className={FlexCenter}>
          <video autoPlay loop muted className="w-[55%]" src={video}></video>

          <div className="" data-aos="fade-up">
            <FontAthiti>Về EYE SPY</FontAthiti>

            <h2 className="text-3xl font-medium mb-3 mt-2">
              <FontAthiti>Thay đổi </FontAthiti>
              <FontParata className="italic"> Góc Nhìn</FontParata>{" "}
              <span className="text-base mx-2">-</span>
              <FontAthiti>Thay đổi </FontAthiti>
              <FontParata className="italic"> Thế Giới</FontParata>
            </h2>
            <Pleft>
              <span className="italic">
                "When you change the way you look at things, the things you look
                at change"
              </span>
              . Thị giác là một trong những giác quan quan trọng nhất của con
              người, quyết định cách chúng ta nhìn nhận và trải nghiệm thế giới.
              Một cặp kính mắt phù hợp sẽ giúp khách hàng có được tầm nhìn tốt
              hơn, từ đó thay đổi góc nhìn và cách họ nhìn nhận thế giới.
            </Pleft>
            <NavLink to="/introduce-page">
              <ButtonHome> Tìm hiểu về EYE SPY</ButtonHome>
            </NavLink>
          </div>
        </DivStyless>
        <DivStyless className="flex justify-between gap-x-10 items-center">
          <div className="w-[43%] text-center" data-aos="fade-up">
            <h2 className="text-3xl font-medium mb-4">
              <FontParata className="italic"> Khách hàng </FontParata>{" "}
              <FontAthiti className="ml-2"> nói gì về </FontAthiti>{" "}
              <FontParata className="italic">Eye Spy? </FontParata>{" "}
            </h2>
            <Pleft>
              <span className="italic mb-2">
                "Mention Mr manners opinion if garrets enabled. To occasional
                dissimilar impossible sentiments. Do fortune account written
                prepare invited no passage"
              </span>
              <FontParata>-Tên khách hàng-</FontParata>
            </Pleft>
          </div>
          <div className="w-[54%] grid gap-y-5">
            <div className="flex gap-x-5">
              <div className="flex items-end w-10/12" data-aos="zoom-in-down">
                <img src={hom8} alt="" />
              </div>
              <div className="flex items-end w-8/12" data-aos="zoom-in-down">
                <img src={hom9} alt="" />
              </div>
              <div className="w-full" data-aos="zoom-in-down">
                <img src={hom10} alt="" />
              </div>
            </div>
            <div className="flex gap-x-5">
              <div className="w-8/12" data-aos="zoom-in">
                <img src={hom11} alt="" />
              </div>
              <div className="w-6/12" data-aos="zoom-in">
                <img src={hom12} alt="" />
              </div>
              <div className="w-7/12" data-aos="zoom-in">
                <img src={hom13} alt="" />
              </div>
              <div className="w-full" data-aos="zoom-in">
                <img
                  src={hom14}
                  alt=""
                  className="h-[200px] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </DivStyless>
        <Blog>
          <div className="flex items-center gap-x-10 justify-center px-52 mb-4">
            <div
              className="h-[1px] bg-black w-full"
              data-aos="zoom-in-down"
            ></div>
            <h2 className="text-4xl mb-2 flex-shrink-0" data-aos="zoom-in-down">
              Mới nhất tại Eye Spy
            </h2>
            <div
              className="h-[1px] bg-black w-full"
              data-aos="zoom-in-down"
            ></div>
          </div>
          <div className="flex justify-content-between items-center gap-x-10">
            <div className="news" data-aos="fade-down">
              <img src={hom15} alt="" className={blogHover} />
              <h3>Khai trương cơ sở Eye Spy thứ 6 tại Cầu Giấy</h3>
              <span>
                Ngày 18/10/2023, EYE SPY đã chính thức khai trương cơ sở thứ 6
                tại số 256 Cầu Giấy, Hà Nội. Đây là cơ sở mới nhất của EYE SPY
                nằm ở vị trí đắc địa, thuận tiện cho khách hàng di chuyển. Tại
                buổi khai trương, EYE SPY đã giới thiệu đến khách hàng các sản
                phẩm mắt kính mới nhất của thương hiệu, cùng với các chương
                trình ưu đãi hấp dẫn.
              </span>
            </div>
            <div className="news" data-aos="fade-down">
              <img src={hom16} alt="" className={blogHover} />
              <h3>Khai trương cơ sở Eye Spy thứ 6 tại Cầu Giấy</h3>
              <span>
                Ngày 18/10/2023, EYE SPY đã chính thức khai trương cơ sở thứ 6
                tại số 256 Cầu Giấy, Hà Nội. Đây là cơ sở mới nhất của EYE SPY
                nằm ở vị trí đắc địa, thuận tiện cho khách hàng di chuyển. Tại
                buổi khai trương, EYE SPY đã giới thiệu đến khách hàng các sản
                phẩm mắt kính mới nhất của thương hiệu, cùng với các chương
                trình ưu đãi hấp dẫn.
              </span>
            </div>
            <div className="news" data-aos="fade-down">
              <img src={hom17} alt="" className={blogHover} />

              <h3>Khai trương cơ sở Eye Spy thứ 6 tại Cầu Giấy</h3>
              <span>
                Ngày 18/10/2023, EYE SPY đã chính thức khai trương cơ sở thứ 6
                tại số 256 Cầu Giấy, Hà Nội. Đây là cơ sở mới nhất của EYE SPY
                nằm ở vị trí đắc địa, thuận tiện cho khách hàng di chuyển. Tại
                buổi khai trương, EYE SPY đã giới thiệu đến khách hàng các sản
                phẩm mắt kính mới nhất của thương hiệu, cùng với các chương
                trình ưu đãi hấp dẫn.
              </span>
            </div>
          </div>
        </Blog>
      </HeaderFooter>
    </div>
  );
};

export default HomePage;
