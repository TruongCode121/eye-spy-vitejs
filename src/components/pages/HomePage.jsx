import React from "react";
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
  hom20,
  hom3,
  hom4,
  hom5,
  hom6,
  hom7,
  hom8,
  hom9,
  home,
} from "../../assets/img/home";
import { ButtonHome } from "../button";
import { charmant, pro3, pro4, pro7, pro8 } from "../../assets/img/products";
import video from "../../assets/img/home/video1.webm";
import { FlexBetween, FlexCenter } from "../../assets/style/cssCustom";
const FontParata = styled.span`
  font-family: "Prata", serif;
  font-weight: 400;
  font-style: normal;
  line-height: 1.5;
`;
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
  return (
    <div>
      <HeaderFooter>
        {/* banner */}
        <div className={`${FlexBetween} items-center `}>
          <div className="w-3/5 flex flex-col gap-y-10">
            <p>
              <FontParata className="text-5xl">
                Nâng tầm trải nghiệm mua sắm kính mắt của bạn
              </FontParata>
            </p>
            <div className={`${FlexBetween} items-center`}>
              <div className="w-2/3">
                <Pleft>
                  EYE SPY là cửa hàng kính mắt chuyên cung cấp các sản phẩm kính
                  mắt chính hãng từ các thương hiệu nổi tiếng trên thế giới. Với
                  đội ngũ nhân viên tư vấn chuyên nghiệp và tận tâm, EYE SPY
                  luôn mang đến cho khách hàng những trải nghiệm mua sắm tốt
                  nhất.
                </Pleft>
                <ButtonHome> Kho sản phẩm </ButtonHome>
              </div>
              <div>
                <img src={Hom2} alt="" />
              </div>
            </div>
          </div>
          <div className="w-6/12">
            <img src={Hom1} alt="" className="w-full" />
          </div>
        </div>
        {/* top1 */}
        <DivStyless className="mt-32">
          <UL className="grid grid-cols-6 gap-x-10">
            <li>
              <img src={hom3} alt="" />
              <p>Kính Nam</p>
            </li>
            <li>
              <img src={hom4} alt="" />
              <p>Kính Nữ</p>
            </li>
            <li>
              <img src={hom5} alt="" />
              <p>Kính Trẻ Em</p>
            </li>
            <li>
              <img src={hom6} alt="" />
              <p>Kính Râm</p>
            </li>
            <li>
              <img src={hom7} alt="" />
              <p>Contact Lense</p>
            </li>
            <li>
              <img src={home} alt="" />
              <p>Mắt Kính Cho Máy Tính</p>
            </li>
          </UL>
        </DivStyless>
        <Top2 className={`mt-32 ${FlexBetween}`}>
          <div className="w-1/3 ">
            <div className=" sticky top-[100px]">
              <p>Bộ sưu tập</p>
              <h2>Khám phá Eye Catcher</h2>
              <Pleft>
                Dù bạn đang tìm kiếm một cặp kính mới để đeo hàng ngày hay một
                cặp kính đặc biệt cho buổi tiệc, bộ sưu tập Eye Catcher đều có
                cả! Từ kiểu dáng mắt mèo cổ điển đến những kiểu dáng nổi bật, bộ
                sưu tập này sẽ hoàn toàn phù hợp với cá tính của bạn.
              </Pleft>
              <ButtonHome> Mua Ngay</ButtonHome>
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
            {/* charmant,
  RayBanSquareTitan,
  TomfordCateye,
  VogueCateye, */}

            <div className="grid grid-cols-4 mt-10 gap-x-5">
              <div className="shadow">
                <img src={charmant} alt="" />
              </div>
              <div className="shadow">
                <img src={charmant} alt="" />
              </div>
              <div className="shadow">
                <img src={charmant} alt="" />
              </div>
              <div className="shadow">
                <img src={charmant} alt="" />
              </div>
            </div>
          </div>
        </Top2>

        <DivStyless className={FlexCenter}>
          <video autoPlay loop muted className="w-[55%]" src={video}></video>

          <div className="">
            <p>Về EYE SPY</p>
            <h2>Thay đổi Góc Nhìn - Thay đổi Thế Giới </h2>
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
            <ButtonHome> Tìm hiểu về EYE SPY</ButtonHome>
          </div>
        </DivStyless>

        <DivStyless className="flex justify-between gap-x-10 items-center">
          <div className="w-[43%]">
            <h2>Khách hàng nói gì về Eye Spy?</h2>
            <Pleft>
              <span className="italic">
                "Mention Mr manners opinion if garrets enabled. To occasional
                dissimilar impossible sentiments. Do fortune account written
                prepare invited no passage"
              </span>
              <FontParata>-Tên khách hàng-</FontParata>
            </Pleft>
          </div>
          <div className="w-[54%] grid gap-y-5">
            <div className="flex gap-x-5">
              <div className="flex items-end w-10/12">
                <img src={hom8} alt="" />
              </div>
              <div className="flex items-end w-8/12">
                <img src={hom9} alt="" />
              </div>
              <div className="w-full">
                <img src={hom10} alt="" />
              </div>
            </div>
            <div className="flex gap-x-5">
              <div className="w-8/12">
                <img src={hom11} alt="" />
              </div>
              <div className="w-6/12">
                <img src={hom12} alt="" />
              </div>
              <div className="w-7/12">
                <img src={hom13} alt="" />
              </div>
              <div className="w-full">
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
            <div className="h-[1px] bg-black w-full"></div>
            <h2 className="text-4xl mb-2 flex-shrink-0">
              Mới nhất tại Eye Spy
            </h2>
            <div className="h-[1px] bg-black w-full"></div>
          </div>
          <div className="flex justify-content-between items-center gap-x-10">
            <div className="news">
              <img src={hom15} alt="" className={blogHover} />
              <h3>Khai trương cơ sở Eye Spy thứ 6 tại Cầu Giấy</h3>
              <p>
                Ngày 18/10/2023, EYE SPY đã chính thức khai trương cơ sở thứ 6
                tại số 256 Cầu Giấy, Hà Nội. Đây là cơ sở mới nhất của EYE SPY
                nằm ở vị trí đắc địa, thuận tiện cho khách hàng di chuyển. Tại
                buổi khai trương, EYE SPY đã giới thiệu đến khách hàng các sản
                phẩm mắt kính mới nhất của thương hiệu, cùng với các chương
                trình ưu đãi hấp dẫn.
              </p>
            </div>
            <div className="news">
              <img src={hom16} alt="" className={blogHover} />
              <h3>Khai trương cơ sở Eye Spy thứ 6 tại Cầu Giấy</h3>
              <p>
                Ngày 18/10/2023, EYE SPY đã chính thức khai trương cơ sở thứ 6
                tại số 256 Cầu Giấy, Hà Nội. Đây là cơ sở mới nhất của EYE SPY
                nằm ở vị trí đắc địa, thuận tiện cho khách hàng di chuyển. Tại
                buổi khai trương, EYE SPY đã giới thiệu đến khách hàng các sản
                phẩm mắt kính mới nhất của thương hiệu, cùng với các chương
                trình ưu đãi hấp dẫn.
              </p>
            </div>
            <div className="news">
              <img src={hom17} alt="" className={blogHover} />

              <h3>Khai trương cơ sở Eye Spy thứ 6 tại Cầu Giấy</h3>
              <p>
                Ngày 18/10/2023, EYE SPY đã chính thức khai trương cơ sở thứ 6
                tại số 256 Cầu Giấy, Hà Nội. Đây là cơ sở mới nhất của EYE SPY
                nằm ở vị trí đắc địa, thuận tiện cho khách hàng di chuyển. Tại
                buổi khai trương, EYE SPY đã giới thiệu đến khách hàng các sản
                phẩm mắt kính mới nhất của thương hiệu, cùng với các chương
                trình ưu đãi hấp dẫn.
              </p>
            </div>
          </div>
        </Blog>
      </HeaderFooter>
    </div>
  );
};

export default HomePage;
