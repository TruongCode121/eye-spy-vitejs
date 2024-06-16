import { TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
const SearchData = ({ label, setValueSearch, className = "w-1/3" }) => {
  const { darkMode } = useSelector((state) => state.globals);
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };
  return (
    <>
      <TextField
        id="standard-basic"
        label={label}
        InputLabelProps={{ style: { color: darkMode == true && "#fff" } }}
        variant="standard"
        className={`${className}`}
        onChange={handleChangeSearch}
        inputProps={{
          style: {
            color: darkMode == true && "#fff",
            bgcolor: darkMode == true && "#334155",
          },
        }}
        sx={{
          bgcolor: darkMode == true && "#334155",
        }}
      />
    </>
  );
};

export default SearchData;
