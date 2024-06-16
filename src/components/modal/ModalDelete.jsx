import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ButtonHome } from "../button";

const ModalDelete = ({ fetchDeleteRedux, data, children = "Delete" }) => {
  const dispatch = useDispatch();
  const handleDelCate = () => {
    Swal.fire({
      title: `Xóa ${data.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(fetchDeleteRedux(data.id));
        toast.success("Xóa thành công!");
      }
    });
  };
  return (
    <>
      <ButtonHome
        onClick={handleDelCate}
        className="border-red-500 border-1 rounded-md text-red-700"
      >
        {children}
      </ButtonHome>
    </>
  );
};

export default ModalDelete;
