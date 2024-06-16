// import * as React from "react";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";

// function valuetext(value) {
//   return `${value}°C`;
// }

// export default function RangeSlider() {
//   return (
//     <Box sx={{ width: "100%" }}>
//       <Slider
//         aria-label="Small steps"
//         defaultValue={0}
//         getAriaValueText={valuetext}
//         step={100000}
//         marks
//         min={0}
//         max={10000000}
//         valueLabelDisplay="auto"
//       />
//     </Box>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState([20, 100000]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        max={1000000}
      />
    </Box>
  );
}
