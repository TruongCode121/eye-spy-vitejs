import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { headCellOrders } from "../../utils/data";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Skeleton, Stack } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import { SearchData } from "../../search";
import useSearch from "../../hook/useSearch";
import { ModalOrder } from "../../modal";
import {
  fetchDeleteOrder,
  fetchDeleteProducts,
  fetchIsDeliveryStatusOrder,
  setProductSold,
} from "../../../redux/productSlice";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { ButtonHome } from "../../button";
import useNumber from "../../hook/useNumber";
import OrderDetail from "./OrderDetail";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCellOrders.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const {
    selectIds,
    numSelected,
    dispatch,
    setSelected,
    setPage,
    setOnfilter,
    onfilter,
    setDataFil,
  } = props;

  const handleDeleteAll = () => {
    Swal.fire({
      title: `Xóa ${numSelected > 1 ? numSelected : ""} sản phẩm?`,
      text: `Bạn sẽ không thể khôi phục ${
        numSelected == 1 ? "" : numSelected
      } sản phẩm có id: ${selectIds
        .map((item) => {
          return item;
        })
        .join(" ## ")}`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(fetchDeleteOrder(selectIds));
        setPage(0);
        setSelected([]);
        toast.success("Xóa thành công!");
      }
    });
  };
  const [txtFilter, setTxtFilter] = React.useState("");
  const { orderList } = useSelector((state) => state.products);
  const handleFilterOrderTxt = (status) => {
    if (txtFilter != status) {
      setTxtFilter(status);
    } else {
      setTxtFilter("");
    }
  };

  const handleResultOrder = () => {
    switch (txtFilter) {
      case "success":
        return orderList.filter((item) => item.deliveryStatus == true);
      case "pending":
        return orderList.filter(
          (item) => item.deliveryStatus == false && item.statusOrder == true
        );
      case "cancel":
        return orderList.filter((item) => item.statusOrder == false);

      default:
        return orderList;
    }
  };
  React.useEffect(() => {
    setDataFil(handleResultOrder());
  }, [txtFilter, orderList]);
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Data Account
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteAll}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <div
          className={` flex items-center gap-x-3 ${
            onfilter ? "translate-x-0" : "translate-x-[91%]"
          } transition-all duration-500`}
        >
          <div
            className={`transition-all duration-500 ${onfilter ? "" : "mr-10"}`}
          >
            <Tooltip title="Filter list">
              <IconButton
                onClick={() => {
                  setOnfilter(!onfilter);
                }}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </div>

          <ButtonHome
            onClick={() => {
              handleFilterOrderTxt("success");
            }}
            className={`${
              txtFilter == "success" ? "bg-green-500 text-white" : ""
            } border-1 border-green-500 text-green-600 rounded`}
          >
            Success
          </ButtonHome>
          <ButtonHome
            onClick={() => {
              handleFilterOrderTxt("pending");
            }}
            className={`${
              txtFilter == "pending" ? "bg-slate-500 text-white" : ""
            } border-1 border-slate-500 text-slate-600 rounded`}
          >
            Pending
          </ButtonHome>
          <ButtonHome
            onClick={() => {
              handleFilterOrderTxt("cancel");
            }}
            className={`${
              txtFilter == "cancel" ? "bg-red-500 text-white" : ""
            } border-1 border-red-500 text-red-600 rounded`}
          >
            Cancel
          </ButtonHome>
        </div>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function OrderManage() {
  const { dataAccount, inputSearch } = useSelector((state) => state.accounts);
  const { orderList, productsData, productSold } = useSelector(
    (state) => state.products
  );

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = React.useState("");
  const [onfilter, setOnfilter] = React.useState(false);
  const [dataFil, setDataFil] = React.useState([]);
  const { convertToNumber } = useNumber();
  const dataSearch = (data, inputSearch) => {
    let newArr = [];
    let valueSearch = inputSearch.length > 0 ? inputSearch.toUpperCase() : "";
    if (valueSearch.length > 0) {
      data.map((item) => {
        let textCodeOrder = item.codeOrders;
        let txtCodeOrderUp = textCodeOrder.toUpperCase();
        let txtSearch = txtCodeOrderUp.includes(valueSearch);

        let textEmail = item.email;
        let txtEmailUp = textEmail.toUpperCase();
        let txtSearchEmail = txtEmailUp.includes(valueSearch);

        if (txtSearch || txtSearchEmail || item.phone == valueSearch) {
          newArr = [...newArr, item];
        }
      });
      return newArr;
    } else {
      return data;
    }
  };
  const rows = dataSearch(dataFil, valueSearch);

  // const bestSeller = () => {
  //   let arrCartOrder = [];
  //   let newArr1 = [];
  //   let newArr3 = [];

  //   orderList.map((item) => {
  //     if (item.statusOrder == true) {
  //       item.carts.map((cart) => (arrCartOrder = [...arrCartOrder, cart]));
  //     }
  //   });

  //   arrCartOrder.map((item) => (newArr1 = [...newArr1, item.product_id]));
  //   let arr2 = [...new Set(newArr1)];

  //   arr2.map((item) => {
  //     newArr3 = [
  //       ...newArr3,
  //       {
  //         product_id: item,
  //         quantity: 0,
  //       },
  //     ];
  //   });

  //   arrCartOrder.map((item) => {
  //     let indexArr3 = newArr3.findIndex(
  //       (cart) => cart.product_id == item.product_id
  //     );
  //     if (item.product_id == newArr3[indexArr3].product_id) {
  //       newArr3[indexArr3].quantity += item.quantity;
  //     }
  //   });
  //   console.log(newArr3);
  //   return newArr3;
  // };

  const handleDeliveryStatus = (row) => {
    Swal.fire({
      title: `${
        row.deliveryStatus
          ? `Hủy xác nhận đơn ${row.codeOrders}!`
          : `Xác nhận đơn ${row.codeOrders}!`
      }`,
      text: `${
        row.deliveryStatus
          ? `Đơn ${row.codeOrders} pending! `
          : `Đơn ${row.codeOrders} success!`
      }`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "OK!",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(
          fetchIsDeliveryStatusOrder({
            id: row.id,
            address: row.address,
            phone: row.phone,
            email: row.email,
            fullname: row.fullname,
            codeOrders: row.codeOrders,
            createdAt: row.createdAt,
            statusOrder: row.statusOrder,
            deliveryStatus: !row.deliveryStatus,
            gender: row.gender,
            note: row.note,
            carts: row.carts,
            totalPriceCarts: row.totalPriceCarts,
          })
        );
        toast.success(`${row.codeOrders} success!`);
      }
    });
  };

  React.useEffect(() => {
    if (valueSearch.length > 0) {
      setPage(0);
    }
  }, [valueSearch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  // const visibleRows = React.useMemo(
  //   () =>
  //     stableSort(rows, getComparator(order, orderBy)).slice(
  //       page * rowsPerPage,
  //       page * rowsPerPage + rowsPerPage
  //     ),
  //   [order, orderBy, page, rowsPerPage]
  // );
  const visibleRows = stableSort(rows, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        p: 2,
        borderRadius: 2,
      }}
    >
      <div className="flex items-center gap-x-10 ">
        <SearchData
          label="Search codeOrder, Email, Phone..."
          setValueSearch={setValueSearch}
        ></SearchData>
      </div>

      <Paper sx={{ my: 2, overflow: "hidden" }}>
        <EnhancedTableToolbar
          selectIds={selected}
          dispatch={dispatch}
          setOnfilter={setOnfilter}
          onfilter={onfilter}
          numSelected={selected.length}
          setSelected={setSelected}
          setPage={setPage}
          setDataFil={setDataFil}
          // fetchListData={fetchListData}
        />
        <TableContainer>
          <Table
            // sx={{ width: "100%" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    // aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    // selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        onClick={(event) => handleClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      sx={{ width: "10%" }}
                    >
                      <div className="h-[300px] my-2 overflow-auto scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent ">
                        <div className="bg-cyan-500 text-white text-center mb-2 font-bold p-1 rounded">
                          Total Price: <br />
                          {convertToNumber(row.totalPriceCarts)}.đ
                        </div>
                        <div className="">
                          {row.carts?.map((cart) => {
                            let indexProduct = productsData.findIndex(
                              (item) => item.id == cart.product_id
                            );
                            return (
                              <div
                                key={cart.product_id}
                                className="border-2 mb-2 p-2 bg-white rounded"
                              >
                                <div className="">
                                  <div>
                                    <img
                                      src={
                                        productsData[indexProduct]?.imageProduct
                                      }
                                      alt=""
                                      className="border-2"
                                    />
                                    {productsData[indexProduct]?.name}
                                  </div>
                                  <div>
                                    <div>Quantity: {cart.quantity}</div>
                                    <div>
                                      Price:{" "}
                                      {convertToNumber(
                                        productsData[indexProduct]?.price
                                      )}{" "}
                                      đ
                                    </div>
                                    <div>
                                      Total:{" "}
                                      {convertToNumber(
                                        productsData[indexProduct]?.price *
                                          cart.quantity
                                      )}{" "}
                                      đ
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {row.gender == "male" ? "Anh" : "Chị"}
                    </TableCell>
                    <TableCell align="left">{row.fullname}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">0{row.phone}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.note}</TableCell>
                    <TableCell align="left">{row.codeOrders}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    <TableCell align="left">
                      {row.statusOrder ? (
                        <div
                          className={`rounded p-1 inline-block font-bold text-white ${
                            row.deliveryStatus
                              ? "bg-green-600 "
                              : "bg-slate-500"
                          }`}
                        >
                          {row.deliveryStatus ? "Success" : "Pending"}
                        </div>
                      ) : (
                        <div
                          className={` text-white rounded font-bold inline-block p-1 ${
                            row.statusOrder
                              ? "bg-yellow-500"
                              : "bg-red-500 Cancel"
                          }`}
                        >
                          Cancel
                        </div>
                      )}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="column" spacing={2}>
                        {row.statusOrder ? (
                          <div className="flex">
                            <div
                              onClick={() => {
                                handleDeliveryStatus(row);
                              }}
                              className={`border-1 px-[20px] rounded-md py-[6px] ${
                                row.deliveryStatus
                                  ? " border-green-600 text-green-600 "
                                  : "border-slate-600 text-slate-600"
                              }`}
                            >
                              <AssignmentTurnedInIcon></AssignmentTurnedInIcon>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                        {row.statusOrder ? (
                          <ModalOrder data={row}></ModalOrder>
                        ) : (
                          ""
                        )}

                        <OrderDetail
                          data={row}
                          textBtn="Xem"
                          className="w-16"
                        ></OrderDetail>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {orderList.length == 0 && (
                <TableRow>
                  <TableCell colSpan={13}>
                    <Box sx={{ width: "100%" }}>
                      <Skeleton sx={{ height: "50px" }} />
                      <Skeleton sx={{ height: "50px" }} animation="wave" />
                      <Skeleton sx={{ height: "50px" }} animation={false} />
                    </Box>
                  </TableCell>
                </TableRow>
              )}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={13} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
