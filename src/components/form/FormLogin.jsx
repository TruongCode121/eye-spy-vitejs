import { yupResolver } from "@hookform/resolvers/yup";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { FontParata } from "../../assets/style/font";
import { ButtonHome } from "../button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/authSlice";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const schema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email address!")
    .required("Please enter email you!"),
  password: yup.string().required("Please enter password for you!"),
});
const FormLogin = ({ toggle }) => {
  const { dataAccount } = useSelector((state) => state.accounts);
  const { auth } = useSelector((state) => state.auth);
  const accountList = dataAccount.accounts;

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  console.log("accountList", accountList);
  const HandleLogin = (values) => {
    let newArr = [...accountList];
    let newAuth = newArr.filter((item) => {
      if (values.email === item.email && values.password === item.password) {
        return item;
      } else {
        return null;
      }
    });
    if (newAuth.length > 0) {
      navigate("/");
      toast("login Success!");
      dispatch(setAuth(newAuth));
    } else {
      toast.warning("log in fail!");
    }
    // console.log("Lea54@gmail.com", newAuth);
  };
  console.log(auth);
  return (
    <div
      className={`w-1/2 h-full absolute top-[50%] translate-y-[-30%] right-0 transition-all duration-500  ${
        toggle == true ? "translate-x-[100%]" : "translate-x-0 z-10"
      }`}
    >
      <form
        action=""
        onSubmit={handleSubmit(HandleLogin)}
        className="w-full px-8"
      >
        <div className="flex justify-center">
          <FontParata className="text-4xl mb-4">Welcome Back</FontParata>
        </div>
        <div className="mb-4">
          <TextField
            label="Email"
            focused
            color="primary"
            sx={{ width: "100%", color: "#D32F2F" }}
            {...register("email")}
            error={errors.email && true}
            helperText={errors.email && errors.email.message}
          />
        </div>
        {/* <div className="my-4">
          <TextField
            type={"password"}
            label="Password"
            focused
            color="primary"
            {...register("password")}
            sx={{ width: "100%" }}
            error={errors.password && true}
            helperText={errors.password && errors.password.message}
          />
        </div> */}
        <FormControl
          // sx={{ width: "100%" }}
          variant="outlined"
          focused
          error={errors.password && true}
          sx={(errors.password && { color: "#D32F2F" }, { width: "100%" })}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            focused={`${true}`}
          />
          <FormHelperText sx={{ color: "#D32F2F" }}>
            {errors.password && errors.password.message}
          </FormHelperText>
        </FormControl>
        <div className="text-blue-500  text-right my-3 cursor-pointer">
          <span className="hover:border-b-2 hover:border-b-blue-400">
            forgot password ?
          </span>
        </div>
        <div className="w-full flex justify-center">
          <ButtonHome className="w-1/2 hover:to-slate-800 rounded-lg bg-gradient-to-r from-slate-700 to-slate-400 text-white text-lg">
            Sig In
          </ButtonHome>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
