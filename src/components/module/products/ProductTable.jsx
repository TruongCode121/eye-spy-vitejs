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
import DescriptionIcon from "@mui/icons-material/Description";
import { headCells, headCellProducts } from "../../utils/data";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from "@mui/material";

import useSliceString from "../../hook/useSliceString";
import { SearchData } from "../../search";
import useSearch from "../../hook/useSearch";
import { ModalProduct } from "../../modal";
import {
  fetchDeleteProducts,
  fetchSetOptionsProducts,
} from "../../../redux/productSlice";
import DetailsIcon from "@mui/icons-material/Details";
import { useNavigate } from "react-router-dom";
import { ButtonHome } from "../../button";
import ProductFilter from "./ProductFilter";
import useNumber from "../../hook/useNumber";

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
        {headCellProducts.map((headCell) => (
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
  const { newSlice } = useSliceString();
  const {
    selectIds,
    numSelected,
    dispatch,
    setSelected,
    setPage,
    handleCloseFilter,
    handleOpenFilter,
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
        dispatch(fetchDeleteProducts(selectIds));
        setPage(0);
        setSelected([]);
        toast.success("Xóa thành công!");
      }
    });
  };
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
        <Tooltip title="Filter list">
          <IconButton onClick={handleOpenFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function ProductsTable() {
  const { dataAccount, inputSearch } = useSelector((state) => state.accounts);
  const { productsData, categorys, brands, materials, productSold, orderList } =
    useSelector((state) => state.products);
  const { auth } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.globals);
  const { convertToNumber } = useNumber();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const [valueSearch, setValueSearch] = React.useState("");
  const navigate = useNavigate();
  const [onFilter, setOnFilter] = React.useState(false);
  const [dataFilter, setDataFilter] = React.useState([]);
  const [valueSelect, setValueSelect] = React.useState("");

  // const handleWareHouseProduct = () => {
  //   let newSoldProduct = [...productSold];
  //   let newArr = [];

  //   let totalWareHouse = 0;
  //   newSoldProduct.length > 0 &&
  //     newSoldProduct.map((item) => {
  //       let indexProduct = productsData.findIndex(
  //         (pro) => pro.id == item.product_id
  //       );
  //       if (item.product_id == productsData[indexProduct]?.id) {
  //         totalWareHouse =
  //           productsData[indexProduct]?.warehouse - item.quantity;
  //         newArr = [
  //           ...newArr,
  //           {
  //             id: item.product_id,
  //             name: productsData[indexProduct]?.name,
  //             imageProduct: productsData[indexProduct]?.imageProduct,
  //             brand: productsData[indexProduct]?.brand,
  //             material: productsData[indexProduct]?.material,
  //             category: productsData[indexProduct]?.category,
  //             includeDetail: productsData[indexProduct]?.includeDetail,
  //             warehouse: totalWareHouse,
  //             price: productsData[indexProduct]?.price,
  //             warrranty: productsData[indexProduct]?.warrranty,
  //             createdAt: productsData[indexProduct]?.createdAt,
  //           },
  //         ];
  //       }
  //     });
  //   return newArr;
  // };

  // React.useEffect(() => {
  //   new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("sucess");
  //       dispatch(fetchSetWareHouseProduct(res));
  //     }, 500);
  //   });
  // }, [orderList]);
  const handleChange = (event) => {
    setValueSelect(event.target.value);
  };

  const handleCloseFilter = () => {
    setOnFilter(false);
  };

  const handleOpenFilter = () => {
    setOnFilter(true);
  };
  const handleSetOptionProduct = (status) => {
    let newArr = [...productsData];
    let arrOption = [];
    selected.length > 0 &&
      selected.filter((item) => {
        let indexProduct = newArr.findIndex((ind) => ind.id == item);

        arrOption = [
          ...arrOption,
          {
            id: item,
            name: newArr[indexProduct]?.name,
            imageProduct: newArr[indexProduct]?.imageProduct,
            brand:
              status == "brand" ? valueSelect : newArr[indexProduct]?.brand,
            material:
              status == "material"
                ? valueSelect
                : newArr[indexProduct]?.material,
            category:
              status == "category"
                ? valueSelect
                : newArr[indexProduct]?.category,
            includeDetail: newArr[indexProduct]?.includeDetail,
            warehouse: newArr[indexProduct]?.warehouse,
            price: newArr[indexProduct]?.price,
            warrranty: newArr[indexProduct]?.warrranty,
            createdAt: newArr[indexProduct]?.createdAt,
          },
        ];
      });

    Swal.fire({
      title: `Đặt lại ${status} cho ${selected.length} sản phẩm?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#1DC071",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đặt lại",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch(fetchSetOptionsProducts(arrOption));
        toast.success("Đặt lại thành công");
      }
    });
  };
  const setDataSeach = (data, inputSearch) => {
    let newArr = [];
    let valueSearch = inputSearch ? inputSearch.toUpperCase() : "";
    if (valueSearch.length > 0) {
      data.map((item) => {
        let textCategory = item.category;
        let txtCategoryUp = textCategory.toUpperCase();
        let txtSearchCategory = txtCategoryUp.includes(valueSearch);

        let textBrand = item.brand;
        let txtBrandUp = textBrand.toUpperCase();
        let txtSearchBrand = txtBrandUp.includes(valueSearch);

        let textMaterial = item.material;
        let txtMaterialUp = textMaterial.toUpperCase();
        let txtSearchMaterial = txtMaterialUp.includes(valueSearch);
        if (txtSearchCategory) {
          newArr = { status: "category", data: categorys };
        } else if (txtSearchBrand) {
          newArr = { status: "brand", data: brands };
        } else if (txtSearchMaterial) {
          newArr = { status: "material", data: materials };
        }
      });
      return newArr;
    } else {
      return newArr;
    }
  };

  const dataSearch = (data, inputSearch) => {
    let newArr = [];
    let valueSearch = inputSearch ? inputSearch.toUpperCase() : "";
    if (valueSearch.length > 0) {
      data.map((item) => {
        let textNameProduct = item.name;
        let txtNameProductUp = textNameProduct.toUpperCase();
        let txtSearch = txtNameProductUp.includes(valueSearch);

        let textCategory = item.category;
        let txtCategoryUp = textCategory.toUpperCase();
        let txtSearchCategory = txtCategoryUp.includes(valueSearch);

        let textBrand = item.brand;
        let txtBrandUp = textBrand.toUpperCase();
        let txtSearchBrand = txtBrandUp.includes(valueSearch);

        let textMaterial = item.material;
        let txtMaterialUp = textMaterial.toUpperCase();
        let txtSearchMaterial = txtMaterialUp.includes(valueSearch);
        if (
          txtSearch ||
          txtSearchCategory ||
          txtSearchBrand ||
          txtSearchMaterial
        ) {
          newArr = [...newArr, item];
        }
      });
      return newArr;
    } else {
      return data;
    }
  };
  const rows = dataSearch(dataFilter, valueSearch);
  const handleGetIdProduct = (id) => {
    navigate(`/detail-product?id=${id}`);
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
  let a = false;
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: darkMode == true ? "#1E293B " : "#fff",
        p: 2,
        borderRadius: 2,
      }}
    >
      <div className="flex items-center gap-x-10 justify-between">
        <ModalProduct></ModalProduct>
        <div className="flex w-2/3 justify-end gap-x-2">
          <div>
            {auth[0]?.position == "Dev" && (
              <div className={`flex gap-x-2`}>
                <Box sx={{ minWidth: 320 }}>
                  <FormControl
                    fullWidth
                    size="medium"
                    variant="standard"
                    sx={{
                      bgcolor: darkMode ? "#334155" : "",
                      borderRadius: "3px",
                    }}
                  >
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{
                        color: darkMode == true && "#fff",
                        fontSize: "15px",
                      }}
                    >
                      Option Product
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={valueSelect}
                      label="Option Product"
                      sx={{
                        color: darkMode == true && "#fff",
                      }}
                      onChange={handleChange}
                    >
                      <MenuItem value={""}>No value</MenuItem>
                      {setDataSeach(productsData, valueSearch).data?.length >
                        0 &&
                        setDataSeach(productsData, valueSearch).data.map(
                          (item) => (
                            <MenuItem key={item.id} value={item.name}>
                              {item.name}
                            </MenuItem>
                          )
                        )}
                    </Select>
                  </FormControl>
                </Box>
                {valueSelect != "" && (
                  <ButtonHome
                    onClick={() => {
                      handleSetOptionProduct(
                        setDataSeach(productsData, valueSearch).status
                      );
                    }}
                    className="bg-yellow-600 rounded text-yellow-50"
                  >
                    Đặt lại
                  </ButtonHome>
                )}
              </div>
            )}
          </div>
          <div className="w-1/2">
            <SearchData
              className="w-full"
              label="Search name, category, brand, material product..."
              setValueSearch={setValueSearch}
            ></SearchData>{" "}
          </div>
        </div>
      </div>
      {/* <div
        className={`flex justify-end transition-all duration-700 ${
          onFilter ? "h-14 mt-3 " : "h-0"
        }`}
      > */}
      <div
        className={`fixed top-[80px] right-0 transition-all duration-700 w-[300px] h-[100vh]  z-10  shadow  bg-white ${
          onFilter ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <ButtonHome
          className="w-full bg-teal-500 text-white hover:bg-teal-600 "
          onClick={handleCloseFilter}
        >
          Đóng
        </ButtonHome>

        <ProductFilter
          setPage={setPage}
          setDataFilter={setDataFilter}
        ></ProductFilter>
      </div>
      {/* </div> */}
      <Paper sx={{ my: 2 }}>
        <EnhancedTableToolbar
          selectIds={selected}
          dispatch={dispatch}
          numSelected={selected.length}
          setSelected={setSelected}
          setPage={setPage}
          handleOpenFilter={handleOpenFilter}
          handleCloseFilter={handleCloseFilter}
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
                    <TableCell align="left">
                      <div className="overflow-visible">{index + 1}</div>
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">
                      <img
                        src={row.imageProduct}
                        alt=""
                        className="w-20 h-20 rounded border-2 border-slate-600"
                      />
                    </TableCell>
                    <TableCell align="left">{row.brand}</TableCell>
                    <TableCell align="left">{row.material}</TableCell>
                    <TableCell align="left">
                      <div className=" flex justify-center py-1 rounded-full bg-slate-600 w-[40px] h-[40px] items-center text-white">
                        <Tooltip title={row.includeDetail} placement="top">
                          <DescriptionIcon></DescriptionIcon>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell align="left">
                      {row.warehouse < 0 ? 0 : row.warehouse}
                    </TableCell>
                    <TableCell align="left">
                      {convertToNumber(row.price)} đ
                    </TableCell>
                    <TableCell align="left">{row.warrranty}</TableCell>
                    <TableCell align="left">{row.createdAt}</TableCell>
                    <TableCell align="left">
                      <Stack direction="row" spacing={2}>
                        <div
                          className="border-1 px-3 rounded bg-teal-600 text-white flex items-center hover:bg-teal-500"
                          onClick={() => {
                            handleGetIdProduct(row.id);
                          }}
                        >
                          <DetailsIcon fontSize="small" />
                        </div>
                        <ModalProduct
                          color="warning"
                          textBtn={
                            <BorderColorIcon color="white" fontSize="small" />
                          }
                          data={row}
                        ></ModalProduct>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {dataAccount.accounts.length == 0 && (
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
