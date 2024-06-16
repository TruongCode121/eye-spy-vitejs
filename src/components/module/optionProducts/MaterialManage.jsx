import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  fetchAddMaterial,
  fetchDeleteMaterial,
  fetchUpdateMaterial,
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
const MaterialManage = () => {
  const { materials } = useSelector((state) => state.products);
  return (
    <div className="bg-white p-3 rounded">
      <BasicModal
        className="bg-indigo-500 text-white rounded hover:bg-indigo-600"
        header="Create new material"
        textButton="Add new material"
        labelInput="Material name"
        fetchAddRedux={fetchAddMaterial}
      ></BasicModal>
      <br />
      <Manage headerRow={headerData}>
        {materials?.map((row, index) => (
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
                <BasicModal
                  className="bg-orange-500 text-white rounded hover:bg-orange-600"
                  header="Create new material"
                  textButton="Edit"
                  fetchUpdateRedux={fetchUpdateMaterial}
                  data={row}
                ></BasicModal>
                <ModalDelete
                  data={row}
                  fetchDeleteRedux={fetchDeleteMaterial}
                ></ModalDelete>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Manage>
    </div>
  );
};

export default MaterialManage;
