import { TextField } from "@mui/material";
import React from "react";
import { ButtonHome } from "../button";

const FormContracts = () => {
  return (
    <>
      <form action="">
        <div className="text-white text-2xl pb-3">
          Để lại thông tin cho chúng tôi :
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Họ tên"
            variant="filled"
            sx={{ bgcolor: "#fff", width: "100%" }}
          />
        </div>
        <div className="my-3">
          <TextField
            id="filled-basic"
            label="Số điện thoại"
            variant="filled"
            sx={{ bgcolor: "#fff", width: "100%" }}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Email"
            variant="filled"
            sx={{ bgcolor: "#fff", width: "100%" }}
          />
        </div>
        <div className="flex justify-end">
          <ButtonHome className="mt-3 bg-white inline-block">
            Gửi thông tin
          </ButtonHome>
        </div>
      </form>
    </>
  );
};

export default FormContracts;
