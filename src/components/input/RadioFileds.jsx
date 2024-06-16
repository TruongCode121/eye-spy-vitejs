import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

const RadioFileds = ({ register, helperText, defaultValue }) => {
  return (
    <div className="flex items-center">
      <FormControl sx={{ display: "block" }}>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          defaultValue={defaultValue}
        >
          <FormControlLabel
            value="male"
            control={<Radio />}
            label="Anh"
            // defaultValue={defaultValue}
            {...register("gender")}
          />
          <FormControlLabel
            value="female"
            control={<Radio />}
            label="Chị"
            // defaultValue={defaultValue}
            {...register("gender")}
          />
        </RadioGroup>
      </FormControl>
      <FormHelperText sx={{ color: "#D32F2F" }}>{helperText}</FormHelperText>
    </div>
  );
};

export default RadioFileds;
