import { TextField } from "@mui/material";
import React from "react";
const SearchData = ({ label, setValueSearch }) => {
  const handleChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };
  return (
    <div className="w-1/3">
      <TextField
        id="standard-basic"
        label={label}
        variant="standard"
        className="w-full"
        onChange={handleChangeSearch}
      />
    </div>
  );
};

export default SearchData;
