import React, { useEffect } from "react";
import Banner from "../layout/Banner";
import HeaderFooter from "../layout/HeaderFooter";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Pagination,
  Select,
  TablePagination,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import CheckIcon from "@mui/icons-material/Check";
import { toast } from "react-toastify";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import ProductListItem from "../module/products/ProductListItem";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FieldProductPage from "../field/FieldLeftProductPage";
import FieldLeftProductPage from "../field/FieldLeftProductPage";
import { SearchData } from "../search";
import useNumber from "../hook/useNumber";
const data = [
  {
    name: "Iris Bechtelar",
    position: "versus",
    id: "1",
  },
  {
    name: "Lloyd D'Amore",
    position: "about",
    id: "3",
  },
  {
    name: "Jenna McLaughlin",
    position: "pro",
    id: "4",
  },
  {
    name: "Miss Marlon Kuvalis",
    position: "towards",
    id: "5",
  },
  {
    name: "Dr. Monica Hayes",
    position: "beneath",
    id: "6",
  },
  {
    name: "Rufus Gleichner",
    position: "into",
    id: "7",
  },
  {
    name: "Shelley Ferry DDS",
    position: "but",
    id: "8",
  },
  {
    name: "Kay Mueller",
    position: "lest",
    id: "9",
  },
  {
    name: "Grace Considine III",
    position: "besides",
    id: "10",
  },
];
const CategoryStyles = styled.div`
  .active > .icon {
    background-color: #3b82f6;
  }
`;
function valuetext(value) {
  return `${value}`;
}

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const { convertToNumber } = useNumber();
  const categoryName = params.get("category");
  const newCategoryName = categoryName == null ? "" : categoryName;

  console.log(newCategoryName);
  const { categorys, nameCate, productsData, brands, materials } = useSelector(
    (state) => state.products
  );
  const [page, setPage] = useState(0);
  const [valueSort, setValueSort] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(12);
  const [nameBrand, setNameBrand] = React.useState("");
  const [nameMaterial, setNameMaterial] = React.useState("");
  const [valueSearch, setValueSearch] = React.useState("");
  const [value, setValue] = React.useState([0, 0]);
  const [checkGoods, setCheckGoods] = React.useState("");

  const handleChangeSelectCheck = (e) => {
    setCheckGoods(e.target.value);
  };
  const checkTheGoods = (data) => {
    let newArr = [];
    if (checkGoods == "success") {
      data.map((item) =>
        item.warehouse > 1 ? (newArr = [...newArr, item]) : ""
      );
      return newArr;
    } else if (checkGoods == "notValue") {
      data.map((item) =>
        item.warehouse < 2 ? (newArr = [...newArr, item]) : ""
      );
      return newArr;
    } else {
      return data;
    }
  };
  const handleChangeSelect = (e) => {
    setValueSort(e.target.value);
  };
  const dataSearch = (data, inputSearch) => {
    window.scrollTo(0, 420);
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

  const HandleFilCateBrandMaterial = (data = [], nameFil, status) => {
    let arr = [];
    if (data.length > 0) {
      if (nameFil != "") {
        switch (status) {
          case "CATEGORY":
            data.map((item) => {
              if (item.category == nameFil) {
                arr = [...arr, item];
              }
            });
            return arr;
          case "BRAND":
            data.map((item) => {
              if (item.brand == nameFil) {
                arr = [...arr, item];
              }
            });
            return arr;
          case "MATERIAL":
            data.map((item) => {
              if (item.material == nameFil) {
                arr = [...arr, item];
              }
            });
            return arr;
          default:
            return data;
        }
      } else {
        return data;
      }
    } else {
      return arr;
    }
  };
  console.log(value);
  const handleParamsNameCategory = (name) => {
    window.scrollTo(0, 420);
    if (categoryName != name) {
      navigate(`/products-page?category=${name}`);
    } else {
      navigate(`/products-page`);
    }
  };
  const handleChangeBrand = (name) => {
    window.scrollTo(0, 420);
    if (nameBrand != name) {
      setNameBrand(name);
    } else {
      setNameBrand("");
    }
  };
  const handleChangeMaterial = (name) => {
    window.scrollTo(0, 420);
    if (nameMaterial != name) {
      setNameMaterial(name);
    } else {
      setNameMaterial("");
    }
  };
  const handleFilPrice = () => {
    let newArr = [...productsData];
    if (value[1] > 0 || value[0] > 0) {
      let newFilPrice = newArr.filter(
        (item) => item.price >= value[0] && item.price <= value[1]
      );
      return newFilPrice;
    } else {
      return newArr;
    }
  };
  const maxTotalPrice = () => {
    let num = [];
    productsData.filter((item) => (num = [...num, item.price]));
    let max_val = num.reduce(function (acc, e) {
      return acc > e ? acc : e;
    });
    return max_val;
  };
  const handleSortProduct = (data) => {
    // let newArr = [...data];
    if (valueSort == "lowToHigh") {
      let lowToHigh = data?.sort((a, b) => a.price - b.price);
      return lowToHigh;
    } else if (valueSort == "highToLow") {
      let highToLow = data?.sort((a, b) => b.price - a.price);
      return highToLow;
    } else if (valueSort == "") {
      return data;
    }
  };
  console.log(valueSort);

  const products = checkTheGoods(
    dataSearch(
      HandleFilCateBrandMaterial(
        HandleFilCateBrandMaterial(
          HandleFilCateBrandMaterial(
            handleSortProduct(handleFilPrice()),
            nameMaterial,
            "MATERIAL"
          ),
          nameBrand,
          "BRAND"
        ),
        newCategoryName,
        "CATEGORY"
      ),
      valueSearch
    )
  );
  const resultProduct = products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePrice = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (newCategoryName != "" && valueSearch != "") {
      setPage(0);
    }
  }, [newCategoryName, valueSearch]);
  useEffect(() => {
    handleSortProduct();
  }, [valueSort]);
  return (
    <div className="dark:text-slate-50">
      <HeaderFooter>
        <div id="layout-product"></div>
        <Banner></Banner>
        <div className="flex gap-x-8 mt-10">
          <FieldLeftProductPage>
            <div className="flex justify-between border-b-2 items-center pb-2">
              <h3 className="font-medium  dark:border-slate-500 ">Price</h3>
              <div className="flex items-center justify-center text-[#1976D2]">
                {convertToNumber(value[0])}
                <ArrowRightAltIcon></ArrowRightAltIcon>
                {convertToNumber(value[1])} đ
              </div>
            </div>
            <Box sx={{ width: "100%" }}>
              <Slider
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChangePrice}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={maxTotalPrice()}
              />
            </Box>

            <FilterDataName
              data={categorys}
              handleChange={handleParamsNameCategory}
              header="Categorys"
              status={newCategoryName}
            ></FilterDataName>
            <FilterDataName
              data={brands}
              handleChange={handleChangeBrand}
              header="Brands"
              status={nameBrand}
            ></FilterDataName>
            <FilterDataName
              data={materials}
              handleChange={handleChangeMaterial}
              header="Material"
              status={nameMaterial}
            ></FilterDataName>
          </FieldLeftProductPage>
          <div className="w-full">
            <div className="sticky top-[103px] z-10">
              <div className="w-full shadow-sm px-2 bg-slate-50 dark:text-slate-900 rounded py-2 flex items-center justify-between sticky top-0">
                <div className="flex items-start w-2/3 gap-x-3">
                  <div className="w-full flex items-center gap-x-1">
                    <div className="flex flex-shrink-0">Sắp xếp theo</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        onChange={handleChangeSelect}
                        defaultValue=""
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        size="small"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {/* <MenuItem value={10}>Ten</MenuItem> */}
                        <MenuItem value="lowToHigh">Giá thấp đến cao</MenuItem>
                        <MenuItem value="highToLow">Giá cao đến Thấp</MenuItem>
                      </Select>
                    </FormControl>
                    <div className="flex-shrink-0">Tình trạng</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <Select
                        onChange={handleChangeSelectCheck}
                        defaultValue=""
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        size="small"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {/* <MenuItem value={10}>Ten</MenuItem> */}
                        <MenuItem value="success">Còn hàng</MenuItem>
                        <MenuItem value="notValue">Hết hàng</MenuItem>
                      </Select>
                    </FormControl>
                    <SearchData
                      label="Search name, category, brand, material products..."
                      setValueSearch={setValueSearch}
                      variant=""
                      className="w-full"
                    ></SearchData>
                  </div>
                </div>
                <div className="select-none w-1/2">
                  <TablePagination
                    rowsPerPageOptions={[12, 24, 36]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </div>
              </div>
            </div>
            <ProductListItem
              product={resultProduct}
              convertToNumber={convertToNumber}
            ></ProductListItem>
          </div>
        </div>
      </HeaderFooter>
    </div>
  );
};

export function FilterDataName({ data, handleChange, status, header }) {
  return (
    <div>
      <h3 className="font-medium border-b-2  dark:border-slate-500 py-2 bg-slate-100 dark:text-slate-800">
        {header}
      </h3>
      <CategoryStyles className="mt-3 grid grid-cols-1 gap-x-2">
        {data.length > 0
          ? data.map((item) => (
              <div
                onClick={() => {
                  handleChange(item.name);
                }}
                className="flex items-center justify-between hover:bg-slate-100 hover:dark:bg-slate-600 rounded-full gap-x-1 dark:bg-slate-700 dark:border-slate-500 hover:border-blue-300 dark:hover:border-white p-1 cursor-pointer  mb-2 select-none"
                key={item.id}
              >
                <div className="font-medium text-sm flex-shrink-0 pl-1">
                  {item.name}
                </div>
                <div
                  className={`${
                    status == item.name ? "bg-blue-500 " : ""
                  } flex justify-center items-center w-5 h-5 rounded-full border-2  text-white flex-shrink-0`}
                >
                  {status == item.name && (
                    <CheckIcon sx={{ fontSize: "14px" }}></CheckIcon>
                  )}
                </div>
              </div>
            ))
          : ""}
      </CategoryStyles>
    </div>
  );
}

export default ProductPage;
