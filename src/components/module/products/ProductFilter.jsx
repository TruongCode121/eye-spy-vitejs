import React, { useEffect } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonHome } from "../../button";
import { SelectFields } from "../../input";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import { useState } from "react";

const ProductFilter = ({ setDataFilter, setPage }) => {
  const { brands, materials, categorys, productsData } = useSelector(
    (state) => state.products
  );
  const [nameCate, setNameCate] = useState("");
  const [nameBrand, setNameBrand] = useState("");
  const [nameMaterial, setNameMaterial] = useState("");
  const handleFilterCate = (name) => {
    if (nameCate != name) {
      setNameCate(name);
    } else {
      setNameBrand("");
      setNameMaterial("");
      setNameCate("");
    }
  };
  const handleFilterBrand = (name) => {
    if (nameBrand != name) {
      setNameBrand(name);
    } else {
      setNameBrand("");
    }
  };
  const handleFilterMaterial = (name) => {
    if (nameMaterial != name) {
      setNameMaterial(name);
    } else {
      setNameMaterial("");
    }
  };
  console.log(nameMaterial);
  const FetchFilDataProduct = () => {
    let newArr = [];
    if (nameCate.length > 0) {
      productsData.map((item) => {
        if (item.category == nameCate) {
          newArr = [...newArr, item];
        }
      });
      let newArr2 = [];
      if (nameBrand.length > 0) {
        newArr.map((item) => {
          if (item.brand == nameBrand) {
            newArr2 = [...newArr2, item];
          }
        });

        let newArr3 = [];
        if (nameMaterial.length > 0) {
          newArr2.map((item) => {
            if (item.material == nameMaterial) {
              newArr3 = [...newArr3, item];
            }
          });
          setDataFilter(newArr3);
        } else {
          setDataFilter(newArr2);
        }
      } else {
        setDataFilter(newArr);
      }
    } else {
      setDataFilter(productsData);
    }
  };
  useEffect(() => {
    FetchFilDataProduct();
    setPage(0);
  }, [nameCate, nameBrand, nameMaterial]);
  useEffect(() => {
    if (nameCate.length > 0) {
      FetchFilDataProduct();
    } else {
      setDataFilter(productsData);
    }
  }, [productsData]);
  return (
    <div className="mt-2">
      <div
        className={`
          scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-transparent 
         dark:bg-slate-800 h-[85vh] overflow-auto`}
      >
        <DataFilter
          title="- Category"
          data={categorys}
          nameFil={nameCate}
          handleClickFunction={handleFilterCate}
        ></DataFilter>
        <div
          className={` transition-all duration-500 ${
            nameCate != "" ? "translate-x-[0]" : "translate-x-[-100%]"
          }`}
        >
          <DataFilter
            title={"- Brand"}
            data={brands}
            nameFil={nameBrand}
            handleClickFunction={handleFilterBrand}
          ></DataFilter>
        </div>
        <div
          className={` transition-all duration-500 ${
            nameBrand != "" ? "translate-x-[0]" : "translate-x-[-100%]"
          }`}
        >
          <DataFilter
            title="- Materials"
            data={materials}
            nameFil={nameMaterial}
            handleClickFunction={handleFilterMaterial}
          ></DataFilter>{" "}
        </div>
      </div>
    </div>
  );
};

export function DataFilter({ data, nameFil, handleClickFunction, title }) {
  return (
    <div>
      <div className="font-medium select-none dark:text-white">{title}</div>
      <div className="p-2">
        {data.length > 0
          ? data.map((item) => (
              <div
                onClick={() => {
                  handleClickFunction(item.name);
                }}
                className="flex items-center justify-between  gap-x-1 dark:bg-slate-500 dark:text-white border-2 dark:border-slate-500 hover:border-blue-300 dark:hover:border-white rounded-full p-1 cursor-pointer  mb-2 select-none"
                key={item.id}
              >
                <div className="font-medium text-sm flex-shrink-0 pl-1">
                  {item.name}
                </div>
                <div
                  className={`${
                    nameFil == item.name ? "bg-blue-500 " : ""
                  } flex justify-center items-center w-5 h-5 rounded-full border-2  text-white flex-shrink-0`}
                >
                  {nameFil == item.name && (
                    <CheckIcon sx={{ fontSize: "14px" }}></CheckIcon>
                  )}
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default ProductFilter;
