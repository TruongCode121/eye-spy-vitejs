import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeaderFooter from "../layout/HeaderFooter";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { TextField } from "@mui/material";
import NotFoundPage from "./NotFoundPage";
const InforUserPage = () => {
  const { auth } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (auth.length == 0) return <NotFoundPage></NotFoundPage>;
  return (
    <HeaderFooter status={true}>
      <div className="w-[50vw] mx-auto my-10">
        <form action="" className="shadow p-5 rounded border-2">
          <div className="text-lg border-b-2 mb-3 pb-2">
            Infor use of the
            <span className="font-medium"> {auth[0].fullname}</span>
          </div>
          <div className="flex justify-between">
            <div className="my-3 flex justify-center w-1/2">
              <img
                src={auth[0].avatar}
                alt=""
                className="border-2 rounded-full"
              />
            </div>
            <form className="w-1/2">
              <LabelInfor
                label="Username"
                dataName={auth[0].fullname}
                sttEdit={true}
              ></LabelInfor>
              <LabelInfor
                label="Email"
                dataName={auth[0].email}
                sttEdit={true}
              ></LabelInfor>
              <LabelInfor
                label="Password"
                dataName={auth[0].password}
                sttEdit={true}
              ></LabelInfor>
              <button
                type="button"
                className="bg-orange-500 justify-center flex items-center w-full py-3 rounded text-xl font-medium text-white"
              >
                Cập nhật
              </button>
            </form>
          </div>
          <div className="columns-2 gap-3 border-t-2 mt-4 pt-4">
            <LabelInfor
              label="Department"
              dataName={auth[0].department}
            ></LabelInfor>
            <LabelInfor
              label="Position"
              dataName={auth[0].position}
            ></LabelInfor>
            <LabelInfor
              label="CreatedAt"
              dataName={auth[0].createdAt}
            ></LabelInfor>
          </div>
        </form>
      </div>
    </HeaderFooter>
  );
};

export const LabelInfor = ({ label, dataName, sttEdit = false }) => {
  const [onEdit, setOnEdit] = useState(sttEdit);
  return (
    <label
      htmlFor="email"
      className={`font-medium ${
        onEdit ? "" : "bg-slate-100"
      }  flex items-center justify-between gap-x-2 mb-2  rounded text-slate-500 ${
        sttEdit == true ? "py-2" : "px-3  py-4 "
      } `}
    >
      {onEdit ? (
        <TextField
          id="outlined-basic"
          color="warning"
          label={label}
          variant="outlined"
          value={dataName}
          sx={{ width: "100%" }}
          focused
        />
      ) : (
        <span>
          {label}: {dataName}
        </span>
      )}
    </label>
  );
};

export default InforUserPage;
