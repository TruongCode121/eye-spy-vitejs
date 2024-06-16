import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddBrand,
  fetchDeleteBrand,
  fetchUpdateBrand,
} from "../../../redux/productSlice";
import { ButtonHome } from "../../button";
import { BasicModal, ModalDelete } from "../../modal";
import Manage from "./Manage";
const headerData = [
  {
    name: "Stt",
  },
  {
    name: "Name",
  },
  {
    name: "Action",
  },
];
// fetchAddBrand
// fetchAddMaterial
const BrandManage = () => {
  const { brands } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  return (
    <div className="bg-white p-3 rounded">
      {/* <ModalCategory></ModalCategory> */}
      <BasicModal
        className="bg-indigo-500 text-white rounded hover:bg-indigo-600"
        header="Create new brand"
        textButton="Add new brand"
        fetchAddRedux={fetchAddBrand}
        labelInput="Brand name"
      ></BasicModal>
      <br />
      <Manage headerRow={headerData}>
        {brands?.map((row, index) => (
          <TableRow
            key={row.id}
            // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            {/* <TableCell component="th" scope="row">
              <img
                src={row.imgCategory}
                alt="imgCategory"
                className="w-20 h-20 rounded-full"
              />
            </TableCell> */}
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell component="th" scope="row">
              <div className="flex items-center gap-x-3">
                {/* <ModalCategory
                  data={row}
                  header={`Edit Category id: ${row.id}`}
                  txtBtn="Edit"
                ></ModalCategory> */}
                {/* fetchUpdateBrand
fetchUpdateMaterial */}
                <BasicModal
                  className="bg-cyan-500 text-white rounded hover:bg-cyan-600"
                  header="Create new brand"
                  textButton="Edit"
                  labelInput="Brand name"
                  fetchUpdateRedux={fetchUpdateBrand}
                  data={row}
                ></BasicModal>
                <ModalDelete
                  data={row}
                  fetchDeleteRedux={fetchDeleteBrand}
                ></ModalDelete>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Manage>
    </div>
  );
};

export default BrandManage;
