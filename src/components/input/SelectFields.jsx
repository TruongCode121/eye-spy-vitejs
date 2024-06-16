import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText, MenuItem, Select } from "@mui/material";

export default function SelectFields({
  Label,
  data,
  error,
  register,
  name,
  helperText,
  values,
  control,
  size,
}) {
  return (
    <>
      <FormControl error={error} sx={{ mb: 2, width: "100%" }}>
        <InputLabel id="demo-select-small-label">{Label}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          size={size}
          defaultValue={values}
          label={Label}
          {...register(name)}
        >
          {data?.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{helperText}</FormHelperText>
      </FormControl>
    </>
  );
}
