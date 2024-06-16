import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { undraw_Done_re_oak4 } from "../../../assets/img/home";
import { useDispatch } from "react-redux";
import { imageDb } from "../../../firebase/config";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { deleteAvatar } from "../../../redux/accountSlice";
import Overplay from "../../layout/Overplay";
import { deleteImgCategory, setImgCategory } from "../../../redux/productSlice";
const ImgStore = ({
  data,
  imgUrl,
  className = "",
  imgListRedux,
  handleSelectImg,
  folderFirebase = "categorys",
  onModal,
  setOnModal,
}) => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  const handleSelectFile = () => {
    fileRef.current.click();
  };
  const onFileSelect = (e) => {
    const imgRef = ref(imageDb, `${folderFirebase}/${uuidv4()}`);
    uploadBytes(imgRef, e.target.files[0]);
    setTimeout(() => {
      fetchImgFirebase();
    }, 1000);
  };
  const fetchImgFirebase = () => {
    listAll(ref(imageDb, `${folderFirebase}`)).then((imgs) => {
      console.log("imgs", imgs);
      let newArr = [];
      imgs.items.map((item) => {
        getDownloadURL(item).then((url) => {
          newArr = [...newArr, { url: url }];
          dispatch(setImgCategory(newArr));
        });
      });
    });
  };
  const DeleteImgFireBase = (url) => {
    dispatch(deleteImgCategory(url));
    const deleteRef = ref(imageDb, `${folderFirebase}/${url.slice(91, 127)}`);
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Delete succes!");
      })
      .catch((err) => alert(err));
  };
  return (
    <div className="mb-2 relative">
      <Overplay toggle={onModal} onClick={setOnModal}></Overplay>
      <div
        className={`${
          onModal ? "inline-block" : "d-none"
        } fixed top-10 left-[50%] translate-x-[-50%] ${
          className ? className : " w-[50%]"
        } bg-white rounded-lg shadow-2xl p-2 z-10`}
      >
        <div className="relative">
          <div className="text-slate-600 font-medium flex justify-center">
            Choose image for product!
          </div>

          <button
            type="button"
            className="h-8 w-8 flex justify-center items-center cursor-pointer text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-full mb-2 absolute right-[-20px] top-[-20px]"
            onClick={() => {
              setOnModal(false);
            }}
          >
            <CloseIcon></CloseIcon>
          </button>
        </div>
        <div className="overflow-auto mt-2 max-h-[400px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent rounded shadow">
          <div className="grid grid-cols-5 gap-2   mt-2 px-2 py-3 bg-white ">
            {imgListRedux?.length > 0 &&
              imgListRedux.map((item) => (
                <div
                  value={item.url}
                  key={item.url}
                  className="flex justify-center relative hover:scale-95 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt=""
                    onClick={() => {
                      handleSelectImg(item.url);
                    }}
                    className="w-full h-24 rounded border-2 hover:shadow-lg"
                  />
                  <div
                    onClick={() => {
                      DeleteImgFireBase(item.url);
                    }}
                    className="bg-slate-100 rounded-full absolute top-1 right-1 hover:bg-red-500 hover:text-white flex items-center justify-center p-[2px]"
                  >
                    <CloseIcon sx={{ fontSize: "18px" }}></CloseIcon>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="mt-2">
          <input
            type="file"
            ref={fileRef}
            className="d-none"
            onChange={onFileSelect}
          />
          <button
            type="button"
            onClick={handleSelectFile}
            className="py-2 flex w-full hover:bg-blue-700 items-center text-xl gap-x-3 justify-center font-medium bg-blue-500 rounded text-white"
          >
            <CloudDoneIcon></CloudDoneIcon>
            <span>Upload</span>
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-40 h-40 border-2 cursor-pointer  rounded-full p-2 flex justify-center items-center hover:shadow-lg">
          <img
            src={imgUrl.length > 0 ? imgUrl : data ? data : undraw_Done_re_oak4}
            alt=""
            onClick={() => {
              setOnModal(true);
            }}
            className="w-full h-full object-cover  rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ImgStore;
