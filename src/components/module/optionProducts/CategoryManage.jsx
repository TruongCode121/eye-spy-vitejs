import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalCategory, ModalDelete } from "../../modal";
import Manage from "./Manage";
import { fetchDeleteCategory } from "../../../redux/productSlice";
import AddIcon from "@mui/icons-material/Add";
import { ButtonHome } from "../../button";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const headerData = [
  {
    name: "Stt",
  },
  {
    name: "Img Category",
  },
  {
    name: "Name",
  },
  {
    name: "Action",
  },
];
const CategoryManage = () => {
  const { categorys } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const handleDelCate = (data) => {
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
        dispatch(fetchDeleteCategory(data.id));
        toast.success("Xóa thành công!");
      }
    });
  };
  return (
    <div className="bg-white p-3 rounded">
      <ModalCategory></ModalCategory>
      <br />
      <Manage headerRow={headerData}>
        {categorys?.map((row, index) => (
          <TableRow
            key={row.id}
            // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell component="th" scope="row">
              <img
                src={row.imgCategory}
                alt="imgCategory"
                className="w-20 h-20 rounded-full"
              />
            </TableCell>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell component="th" scope="row">
              <div className="flex items-center gap-x-3">
                <ModalCategory
                  data={row}
                  header={`Edit Category id: ${row.id}`}
                  txtBtn="Edit"
                ></ModalCategory>
                <ModalDelete
                  data={row}
                  fetchDeleteRedux={fetchDeleteCategory}
                ></ModalDelete>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Manage>
    </div>
  );
};

export default CategoryManage;
