import React, { useEffect } from "react";
import { hom18 } from "../../assets/img/home";
import { FontAthiti, FontBarlow, FontParata } from "../../assets/style/font";
import HeaderFooter from "../layout/HeaderFooter";
import video from "../../assets/img/home/video1.webm";
import AOS from "aos";
const IntroducePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <HeaderFooter>
        <div className="flex mt-10 gap-x-8">
          <img src={hom18} alt="" className="w-1/2" data-aos="fade-up" />
          <FontBarlow className="w-1/2 mt-5">
            <div className="text-5xl mb-4" data-aos="fade-left">
              <p>
                <FontAthiti className="font-medium">Thay đổi </FontAthiti>
                <FontParata className="italic">Góc Nhìn -</FontParata>
              </p>
              <p className="text-right">
                <FontAthiti className="font-medium">Thay đổi</FontAthiti>
                <FontParata className="italic"> Thế Giới</FontParata>
              </p>
            </div>
            <div data-aos="fade-up">
              <p>
                Kính mắt không chỉ là một vật dụng giúp bảo vệ thị lực mà còn là
                một phụ kiện thời trang. Một chiếc kính mắt phù hợp có thể giúp
                bạn thay đổi góc nhìn, thể hiện phong cách và cá tính của bản
                thân. <br />
                EYE SPY mong muốn mang đến cho khách hàng những sản phẩm kính
                mắt chất lượng cao, phù hợp với nhu cầu và sở thích của từng
                người. EYE SPY tin rằng, một chiếc kính mắt phù hợp có thể giúp
                bạn thay đổi góc nhìn về thế giới xung quanh, mang đến cho bạn
                sự tự tin và thành công trong cuộc sống.
              </p>
              <p className="border-l-8 border-l-slate-950 pt-0 pb-3 my-4 ml-10 pl-10">
                EYE SPY cũng mong muốn góp phần thay đổi thế giới bằng cách nâng
                cao nhận thức về tầm quan trọng của việc bảo vệ thị lực.
              </p>
              <p>
                EYE SPY tin rằng, một đôi mắt khỏe mạnh là nền tảng cho một cuộc
                sống hạnh phúc và thành công. EYE SPY cam kết sẽ tiếp tục nỗ lực
                để mang đến cho khách hàng những sản phẩm và dịch vụ tốt nhất,
                góp phần thay đổi thế giới theo hướng tích cực hơn.
              </p>
            </div>
          </FontBarlow>
        </div>
        <div className="mt-20 gap-x-8">
          <video autoPlay loop muted className="w-full" src={video}></video>
          <FontBarlow className=" mt-5 flex">
            <div className="text-3xl mb-4 w-[35%]" data-aos="fade-right">
              <p>
                <FontParata className="italic">Eye Spy </FontParata>
                <FontAthiti>mang tới cho bạn...</FontAthiti>
              </p>
            </div>
            <div className="w-[65%]">
              <p>
                EYE SPY mong muốn góp phần nâng cao chất lượng cuộc sống của con
                người bằng cách mang đến những sản phẩm kính mắt chất lượng cao,
                giúp bảo vệ thị lực và nâng cao tầm nhìn của con người
              </p>
              <div className="flex gap-x-10">
                <div className="w-[47%]">
                  <p className="font-bold text-xl mt-4 mb-2">
                    Sứ mệnh của chúng tôi
                  </p>
                  <ul className="list-disc">
                    <li>
                      Đem đến cho khách hàng những sản phẩm và dịch vụ kính mắt
                      chất lượng cao, đáp ứng mọi nhu cầu và mong muốn của khách
                      hàng.
                    </li>
                    <li>
                      Góp phần nâng cao chất lượng cuộc sống của con người bằng
                      cách bảo vệ thị lực và nâng cao tầm nhìn.
                    </li>
                    <li>
                      Trở thành một địa chỉ mua sắm kính mắt uy tín, chất lượng,
                      được khách hàng tin tưởng và lựa chọn.
                    </li>
                  </ul>
                </div>
                <div className="w-[52%]">
                  <p className="font-bold text-xl mt-4 mb-2">
                    Tầm nhìn của chúng tôi
                  </p>
                  <ul className="list-disc">
                    <li>
                      Trở thành một thương hiệu kính mắt hàng đầu Việt Nam, được
                      khách hàng tin tưởng và lựa chọn.
                    </li>
                    <li>
                      Góp phần nâng cao chất lượng cuộc sống của con người bằng
                      cách bảo vệ thị lực và nâng cao tầm nhìn.
                    </li>
                    <li>Tạo ra giá trị bền vững cho xã hội.</li>
                  </ul>
                </div>
              </div>
            </div>
          </FontBarlow>
        </div>
      </HeaderFooter>
    </div>
  );
};

export default IntroducePage;
