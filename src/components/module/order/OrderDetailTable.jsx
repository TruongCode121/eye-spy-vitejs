import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import TablePagination from "@mui/material/TablePagination";
import useNumber from "../../hook/useNumber";

export default function OrderDetailTable({ data }) {
  const [page, setPage] = React.useState(0);
  const { convertToNumber } = useNumber();
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const { productsData } = useSelector((state) => state.products);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const resultCart = data.carts?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ bgcolor: "#E2E8F0", fontWeight: 700 }}>
            <TableRow>
              <TableCell align="left">
                <TextHeaderBold>Hình Ảnh</TextHeaderBold>
              </TableCell>
              <TableCell align="left">
                {" "}
                <TextHeaderBold>Tên Sản phẩm</TextHeaderBold>
              </TableCell>
              <TableCell align="left">
                <TextHeaderBold>Số Lượng</TextHeaderBold>
              </TableCell>
              <TableCell align="left">
                <TextHeaderBold>Đơn giá</TextHeaderBold>
              </TableCell>
              <TableCell align="left">
                <TextHeaderBold>Thành Tiền</TextHeaderBold>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {resultCart.map((row) => {
              let indexProduct = productsData.findIndex(
                (item) => item.id == row.product_id
              );
              return (
                <TableRow key={row.product_id} sx={{ minHeight: "100px" }}>
                  <TableCell align="center" className="w-32">
                    <img
                      src={productsData[indexProduct]?.imageProduct}
                      alt=""
                      className="w-20 h-20 border-1 rounded-full shadow"
                    />
                  </TableCell>
                  <TableCell align="left" className="w-[300px]">
                    {productsData[indexProduct]?.name}
                  </TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">
                    {convertToNumber(productsData[indexProduct]?.price)} đ
                  </TableCell>
                  <TableCell align="left">
                    {convertToNumber(
                      productsData[indexProduct]?.price * row.quantity
                    )}{" "}
                    đ
                  </TableCell>
                </TableRow>
              );
            })}
            {resultCart.length == 3 ? (
              ""
            ) : (
              <TableRow
                className={
                  resultCart.length == 1
                    ? "h-[223px]"
                    : resultCart.length == 2
                    ? "h-[113px]"
                    : ""
                }
              >
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            )}

            <TableRow>
              <TableCell colSpan={5}>
                <TablePagination
                  rowsPerPageOptions={[3, 6, 9]}
                  component="div"
                  count={data.carts?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  className="flex justify-end"
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
export const TextHeaderBold = ({ children }) => {
  return <span className="font-bold">{children}</span>;
};
