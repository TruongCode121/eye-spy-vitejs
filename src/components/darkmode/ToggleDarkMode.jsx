import React from "react";
import PropTypes from "prop-types";
import SwitchDarkMode from "./SwitchDarkMode";
import { BsSunFill } from "react-icons/bs";
import { TbMoonStars } from "react-icons/tb";
const ToggleDarkMode = () => {
  const { darkMode, handleToggleDarkMode } = SwitchDarkMode();
  return (
    <div
      className={`w-16 h-[30px] mx-auto xs:mx-0 sm:mb-0 rounded-full cursor-pointer select-none
    ${
      darkMode
        ? "bg-gradient-to-bl from-slate-400 to-slate-800"
        : "bg-gradient-to-bl from-yellow-400 to-yellow-800"
    }
    `}
      onClick={handleToggleDarkMode}
    >
      <div
        className={`rounded-full w-6 h-6 bg-white
        transition-all duration-300
        translate-y-[3px] flex justify-center items-center
        ${
          darkMode
            ? "translate-x-[36px] text-black"
            : "text-yellow-500 translate-x-[4px]"
        }
        `}
      >
        {darkMode ? (
          <TbMoonStars size={15.6}></TbMoonStars>
        ) : (
          <BsSunFill size={15}></BsSunFill>
        )}
      </div>
    </div>
  );
};

ToggleDarkMode.propTypes = {
  on: PropTypes.bool,
  onCLick: PropTypes.func,
};
export default ToggleDarkMode;
// import React, { useState } from "react";
// import SwitchDarkMode from "../darkmode/SwitchDarkMode";
// import "./ToggleStyle.css";

// // Bài 21: stateless và stateful functional components
// // // stateless functional components:components nhưng ko sử dụng state
// // const Toggle = () => {
// //   return <div className="toggle"></div>;
// // };
// // // statefull functional components:components có sử dụng state
// // const Toggle2 = () => {
// //     // const [count, setcount] = useState();
// // return <div className="toggle2"></div>;
// // }
// // export default Toggle;
// // *****************************************
// // Bài 22: Tìm hiểu useState cơ bản phần 1
// function Toggle() {
//   const { darkMode, handleToggleDarkMode } = SwitchDarkMode();

//   // 1. enabling state: useState(initialize value)
//   // => initialize value: Boolean(true, false), number(1,2,3,4)
//   // string("","abc"), undefined, null, object{title:"frontend"},
//   // array[1,2,3,4]
//   // 2. initialize state: giá trị khởi tạo useState(false)
//   // 3. reading state
//   // 4. update state
//   //   const array = useState(false);
//   //   console.log(array); // [false, function]
//   //   console.log(array[0]);
//   //   console.log(array[1]);
//   //   const arr = [1, 2];
//   //   console.log(arr[1], arr[2]);
//   // Bài 23: Tìm hiểu useState cơ bản phần 2
//   const [on, setOn] = useState(false);
//   console.log(on);
//   const handleToggle = () => {
//     //setOn(callback) -> setOn(prevState) => !prevState
//     setOn((on) => !on);
//   };
//   return (
//     <div>
//       <div
//         className={`toggle ${darkMode ? "active" : ""}`}
//         onClick={handleToggleDarkMode}
//       >
//         <div className={`spinner ${darkMode ? "active" : ""}`}></div>
//       </div>
//     </div>
//   );
// }
// export default Toggle;
