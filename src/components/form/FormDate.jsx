import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { ButtonHome } from "../button";
import moment from "moment";

const schema = yup.object({
  date: yup.string().required("Please enter email you!"),
});
const FormDate = () => {
  const {
    handleSubmit,
    reset,
    formState: { errors },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: "",
  });
  const HandleLogin = (values) => {
    let newDate = values.date;
    let dateArr = newDate.split("-");
    let dateFormat = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
    console.log(dateFormat);
  };
  return (
    <div className={`w-1/2 h-full `}>
      <form
        action=""
        onSubmit={handleSubmit(HandleLogin)}
        className="w-full px-8"
      >
        <div className="mb-4">
          <input type="date" {...register("date")} value="2050-02-20" />
          <div className="text-red-500 text-sm">
            {errors.date && errors.date.message}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <ButtonHome className="w-1/2 hover:to-slate-800 rounded-lg bg-gradient-to-r from-slate-700 to-slate-400 text-white text-lg">
            date
          </ButtonHome>
        </div>
      </form>
    </div>
  );
};

export default FormDate;
