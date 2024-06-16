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
import { deleteAvatar, setAvatars } from "../../../redux/accountSlice";
import Overplay from "../../layout/Overplay";
const AccountsAvatarStore = ({
  data,
  img,
  onListImg,
  setOnListImg,
  avatars,
  handleSelectImgProduct,
}) => {
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const handleSelectFile = () => {
    fileRef.current.click();
  };
  const onFileSelect = (e) => {
    //     console.log("e.target.files[0]", e.target.files[0]?.name);
    // let newFile = e.target.files[0];
    //     setFile(e.target.files[0]?.name);

    // const imgRef = ref(imageDb, `files/${uuidv4()}`);
    // uploadBytes(imgRef, newFile);
    // fetchImgFirebase();
    const imgRef = ref(imageDb, `avatars/${uuidv4()}`);
    uploadBytes(imgRef, e.target.files[0]);
    setTimeout(() => {
      fetchImgFirebase();
    }, 1000);
  };
  const fetchImgFirebase = () => {
    listAll(ref(imageDb, "avatars")).then((imgs) => {
      console.log("imgs", imgs);
      let newArr = [];
      imgs.items.map((item) => {
        getDownloadURL(item).then((url) => {
          newArr = [...newArr, { url: url }];
          dispatch(setAvatars(newArr));
        });
      });
    });
  };
  const DeleteImgFireBase = (url) => {
    //     alert(url);
    dispatch(deleteAvatar(url));
    const deleteRef = ref(imageDb, `avatars/${url.slice(89, 125)}`);
    deleteObject(deleteRef)
      .then(() => {
        toast.success("Delete succes!");
      })
      .catch((err) => alert(err));
    //     let imageRef = imageDb.refFromURL(url);
    //     imageRef.delete();
  };

  return (
    <div className="mb-2">
      <div
        className={`${
          onListImg ? "inline-block" : "d-none"
        } absolute top-10 left-[50%] translate-x-[-50%] w-[90%] bg-white rounded-lg shadow-2xl p-2 z-10 `}
      >
        <div className="relative">
          <div className="text-slate-600 font-medium flex justify-center mb-2">
            Choose image for product!
          </div>

          <button
            type="button"
            className="h-8 w-8 flex justify-center items-center cursor-pointer text-slate-500 bg-slate-100 hover:bg-slate-200 rounded-full mb-2 absolute right-[-20px] top-[-20px]"
            onClick={() => {
              setOnListImg(false);
            }}
          >
            <CloseIcon></CloseIcon>
          </button>
        </div>
        <div className="overflow-auto  h-[300px] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent rounded shadow">
          <div className="grid grid-cols-5 gap-2 p-2 bg-white ">
            {avatars?.length > 0 &&
              avatars.map((item) => (
                <div
                  value={item.url}
                  key={item.url}
                  className="flex justify-center relative hover:scale-95 transition-all duration-500 cursor-pointer"
                >
                  <img
                    src={item.url}
                    alt=""
                    onClick={() => {
                      handleSelectImgProduct(item.url);
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
        <div className="w-40 h-40 border-2 cursor-pointer  rounded-full p-3 flex justify-center items-center hover:shadow-lg">
          <img
            src={
              img.length > 0 ? img : data ? data.avatar : undraw_Done_re_oak4
            }
            alt=""
            onClick={() => {
              setOnListImg(true);
            }}
            className="w-full h-full object-cover  rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountsAvatarStore;
