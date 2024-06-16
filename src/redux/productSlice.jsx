import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  productsData: [],
  brands: [],
  materials: [],
  categorys: [],
  nameCate: "",
  carts: [],
  ImgProducts: [],
  ImgCategorys: [],
  totalPriceCarts: 0,
  orderList: [],
  productSold: [],
  // filterProductCate: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action) => {
      state.productsData = [...state.productsData, action.payload];
    },
    addToCart: (state, action) => {
      console.log("ID", action.payload);
      let indexCarts = state.carts.findIndex(
        (item) => item.product_id == action.payload
      );
      if (state.carts.length <= 0) {
        state.carts = [
          {
            product_id: action.payload,
            quantity: 1,
          },
        ];
      } else if (indexCarts < 0) {
        state.carts = [
          ...state.carts,
          { product_id: action.payload, quantity: 1 },
        ];
      } else {
        state.carts[indexCarts].quantity = state.carts[indexCarts].quantity + 1;
      }
      // localStorage.setItem("CARTS", JSON.stringify(carts));
      console.log("obj carts", state.carts);
    },
    setCart: (state, action) => {
      state.carts = action.payload;
    },
    deleteCart: (state, action) => {
      console.log("action", action.payload);
      let newCart = [...state.carts];
      state.carts = newCart.filter((item) => item.product_id != action.payload);
    },
    incrementCart: (state, action) => {
      console.log("decrementCart", action.payload);
      state.carts.forEach((item) => {
        if (item.product_id == action.payload) {
          item.quantity = item.quantity + 1;
        }
      });
      console.log("decrementCart", state.carts);
    },
    decrementCart: (state, action) => {
      console.log("decrementCart", action.payload);
      state.carts.forEach((item) => {
        if (item.product_id == action.payload) {
          item.quantity = item.quantity - 1;
        }
      });
      console.log("decrementCart", state.carts);
    },
    setImgProduct: (state, action) => {
      return {
        ...state,
        ImgProducts: action.payload,
      };
    },
    deleteImgProduct: (state, action) => {
      state.ImgProducts = state.ImgProducts.filter(
        (item) => item.url != action.payload
      );
    },
    setTotalPriceCarts: (state, action) => {
      let sumPriceCart = 0;
      let sumTotal = 0;
      state.carts.map((cart) => {
        let indexProduct = state.productsData.findIndex(
          (item) => item.id == cart.product_id
        );
        sumPriceCart = state.productsData[indexProduct]?.price * cart.quantity;
        sumTotal += sumPriceCart;
      });
      // dispatch(setTotalPriceCarts(sumTotal));
      // setTotalPriceCart(sumTotal);
      state.totalPriceCarts = sumTotal;
    },
    setImgCategory: (state, action) => {
      return {
        ...state,
        ImgCategorys: action.payload,
      };
    },
    deleteImgCategory: (state, action) => {
      state.ImgCategorys = state.ImgCategorys.filter(
        (item) => item.url != action.payload
      );
    },
    setNameCate: (state, action) => {
      return {
        ...state,
        nameCate: action.payload,
      };
    },
    setProductSold: (state, action) => {
      state.productSold = action.payload;
    },
    // setFilterProductCate: (state, action) => {
    //   state.filterProductCate = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // **********fetch*************
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("state,", state);
        state.productsData = action.payload;
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.materials = action.payload;
      })
      .addCase(fetchCategorys.fulfilled, (state, action) => {
        state.categorys = action.payload;
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        console.log("state,", state);
        state.orderList = action.payload;
      })
      // **********Add*************
      .addCase(fetchAddNewProduct.fulfilled, (state, action) => {
        state.productsData.unshift(action.payload);
      })
      .addCase(fetchOrderAddNew.fulfilled, (state, action) => {
        state.orderList.unshift(action.payload);
      })
      .addCase(fetchAddCategory.fulfilled, (state, action) => {
        // state.categorys = [...state.categorys, action.payload];
        state.categorys.unshift(action.payload);
      })
      .addCase(fetchAddBrand.fulfilled, (state, action) => {
        state.brands.unshift(action.payload);
      })
      .addCase(fetchAddMaterial.fulfilled, (state, action) => {
        state.materials.unshift(action.payload);
      })

      // **********Edit*************

      .addCase(fetchUpdateProducts.fulfilled, (state, action) => {
        let arr = action.meta.arg;

        let newArr = [...state.productsData];
        state.productsData = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              name: arr.name,
              category: arr.category,
              imageProduct: arr.imageProduct,
              brand: arr.brand,
              material: arr.material,
              includeDetail: arr.includeDetail,
              warehouse: arr.warehouse,
              price: arr.price,
              warrranty: arr.warrranty,
            };
          }
          return item;
        });
      })
      .addCase(fetchUpdateCategory.fulfilled, (state, action) => {
        let arr = action.meta.arg;

        let newArr = [...state.categorys];
        state.categorys = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              name: arr.name,
              imgCategory: arr.imgCategory,
            };
          }
          return item;
        });
      })
      .addCase(fetchUpdateBrand.fulfilled, (state, action) => {
        let arr = action.meta.arg;

        let newArr = [...state.brands];
        state.brands = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              name: arr.name,
            };
          }
          return item;
        });
      })
      .addCase(fetchUpdateMaterial.fulfilled, (state, action) => {
        let arr = action.meta.arg;

        let newArr = [...state.materials];
        state.materials = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              name: arr.name,
            };
          }
          return item;
        });
      })
      .addCase(fetchUpdateOrder.fulfilled, (state, action) => {
        console.log("fetchUpdateOrder", action.meta.arg);
        let arr = action.meta.arg;

        let newArr = [...state.orderList];
        state.orderList = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              address: arr.address,
              phone: arr.phone,
              email: arr.email,
              fullname: arr.fullname,
              codeOrders: arr.codeOrders,
              createdAt: arr.createdAt,
              statusOrder: arr.statusOrder,
              deliveryStatus: arr.deliveryStatus,
              gender: arr.gender,
              note: arr.note,
              carts: arr.carts,
              totalPriceCarts: arr.totalPriceCarts,
            };
          }
          return item;
        });
      })
      // **********Delete*************

      .addCase(fetchDeleteProducts.fulfilled, (state, action) => {
        state.productsData = state.productsData.filter(
          (product) => !action.meta.arg.includes(product.id)
        );
      })
      .addCase(fetchDeleteOrder.fulfilled, (state, action) => {
        state.orderList = state.orderList.filter(
          (order) => !action.meta.arg.includes(order.id)
        );
      })
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        state.categorys = state.categorys.filter(
          (cate) => cate.id != action.meta.arg
        );
      })
      .addCase(fetchDeleteBrand.fulfilled, (state, action) => {
        state.brands = state.brands.filter(
          (cate) => cate.id != action.meta.arg
        );
      })
      .addCase(fetchDeleteMaterial.fulfilled, (state, action) => {
        state.materials = state.materials.filter(
          (cate) => cate.id != action.meta.arg
        );
      })
      // **********Toggle*************

      .addCase(fetchIsDeliveryStatusOrder.fulfilled, (state, action) => {
        let arr = action.meta.arg;
        let newArr = [...state.orderList];
        state.orderList = newArr.map((item) => {
          if (item.id == arr.id) {
            item.deliveryStatus = arr.deliveryStatus;
          }
          return item;
        });
      })
      .addCase(fetchIsStatusOrder.fulfilled, (state, action) => {
        let arr = action.meta.arg;
        let newArr = [...state.orderList];
        state.orderList = newArr.map((item) => {
          if (item.id == arr.id) {
            item.statusOrder = arr.statusOrder;
          }
          return item;
        });
      })
      // **********Set*************
      .addCase(fetchSetOptionsProducts.fulfilled, (state, action) => {
        let arr = action.meta.arg;
        let arrProduct = [...state.productsData];
        state.productsData = arrProduct.map((item) => {
          let indexMeta = arr.findIndex((meta) => meta.id == item.id);
          if (item.id == arr[indexMeta]?.id) {
            // console.log(arr[indexMeta].category);
            item.category = arr[indexMeta].category;
            item.brand = arr[indexMeta].brand;
            item.material = arr[indexMeta].material;
          }
          return item;
        });
      });
    // .addCase(fetchSetWareHouseProduct.fulfilled, (state, action) => {
    //   let arr = action.meta.arg;
    //   let arrProduct = [...state.productsData];
    //   state.productsData = arrProduct.map((item) => {
    //     let indexMeta = arr.findIndex((meta) => meta.id == item.id);
    //     if (item.id == arr[indexMeta]?.id) {
    //       item.warehouse = arr[indexMeta].warehouse;
    //     }
    //     return item;
    //   });
    // });
    // **********Search*************
  },
});
export const {
  addNewProduct,
  setCart,
  addToCart,
  decrementCart,
  incrementCart,
  deleteCart,
  setImgProduct,
  deleteImgProduct,
  setNameCate,
  setImgCategory,
  deleteImgCategory,
  setTotalPriceCarts,
  setProductSold,
  // setFilterProductCate,
} = productSlice.actions;

export default productSlice.reducer;
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch(`http://localhost:3000/products`);
    const data = await res.json();
    console.log("respon", data);
    return data;
  }
);
export const fetchBrand = createAsyncThunk("products/fetchBrand", async () => {
  const res = await fetch(`http://localhost:3000/brands`);
  const data = await res.json();
  // console.log("respon", data);
  return data;
});
export const fetchMaterial = createAsyncThunk(
  "products/fetchMaterial",
  async () => {
    const res = await fetch(`http://localhost:3000/materials`);
    const data = await res.json();
    // console.log("respon", data);
    return data;
  }
);
export const fetchCategorys = createAsyncThunk(
  "products/fetchCategorys",
  async () => {
    const res = await fetch(`http://localhost:3000/categorys`);
    const data = await res.json();
    // console.log("respon", data);
    return data;
  }
);
export const fetchAddNewProduct = createAsyncThunk(
  `"products/addNewProduct"`,
  async (newAccounts) => {
    const res = await fetch(`http://localhost:3000/products`, {
      method: "POST",
      body: JSON.stringify(newAccounts),
    });
    const newAcc = await res.json();
    // console.log("RES", newAcc);
    return newAcc;
  }
);
export const fetchSetOptionsProducts = createAsyncThunk(
  `"products/setOptionsProducts"`,
  async (newOption) => {
    newOption.map((item) => {
      axios
        .put(`http://localhost:3000/products/${item.id}`, item)
        .then((res) => {
          return res.data;
        });
    });
  }
);
// export const fetchSetWareHouseProduct = createAsyncThunk(
//   `products/fetchSetWareHouseProduct`,
//   async (newProduct) => {
//     newProduct.map((item) => {
//       axios
//         .put(`http://localhost:3000/products/${item.id}`, item)
//         .then((res) => {
//           return res.data;
//         });
//     });
//   }
// );
export const fetchUpdateProducts = createAsyncThunk(
  `"products/updateAccount"`,
  async (newProducts) => {
    axios
      .put(`http://localhost:3000/products/${newProducts.id}`, newProducts)
      .then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
  }
);

export const fetchDeleteProducts = createAsyncThunk(
  `products/fetchDeleteProducts`,
  async (listID) => {
    listID.map((id) => {
      axios.delete(`http://localhost:3000/products/${id}`).then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
    });
  }
);
export const fetchOrderList = createAsyncThunk(
  "products/fetchOrderList",
  async () => {
    const res = await fetch(`http://localhost:3000/orderLists`);
    const data = await res.json();
    // console.log("respon", data);
    return data;
  }
);

export const fetchOrderAddNew = createAsyncThunk(
  `products/fetchOrderAddNew`,
  async (newOrder) => {
    const res = await fetch(`http://localhost:3000/orderLists`, {
      method: "POST",
      body: JSON.stringify(newOrder),
    });
    const newAcc = await res.json();
    // console.log("RES", newAcc);
    return newAcc;
  }
);
export const fetchUpdateOrder = createAsyncThunk(
  `products/fetchUpdateOrder`,
  async (newOrder) => {
    axios
      .put(`http://localhost:3000/orderLists/${newOrder.id}`, newOrder)
      .then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
  }
);
export const fetchDeleteOrder = createAsyncThunk(
  `products/fetchDeleteOrder`,
  async (listID) => {
    listID.map((id) => {
      axios.delete(`http://localhost:3000/orderLists/${id}`).then((res) => {
        return res.data;
      });
    });
  }
);
export const fetchIsDeliveryStatusOrder = createAsyncThunk(
  `products/fetchIsDeliveryStatusOrder`,
  async (newOrder) => {
    axios
      .put(`http://localhost:3000/orderLists/${newOrder.id}`, newOrder)
      .then((res) => {
        return res.data;
      });
  }
);
export const fetchIsStatusOrder = createAsyncThunk(
  `products/fetchIsStatusOrder`,
  async (newOrder) => {
    axios
      .put(`http://localhost:3000/orderLists/${newOrder.id}`, newOrder)
      .then((res) => {
        return res.data;
      });
  }
);
export const fetchAddCategory = createAsyncThunk(
  `products/fetchAddCategory`,
  async (newCategory) => {
    const res = await fetch(`http://localhost:3000/categorys`, {
      method: "POST",
      body: JSON.stringify(newCategory),
    });
    const newAcc = await res.json();
    // console.log("RES", newAcc);
    return newAcc;
  }
);
export const fetchAddBrand = createAsyncThunk(
  `products/fetchAddBrand`,
  async (newBrand) => {
    const res = await fetch(`http://localhost:3000/brands`, {
      method: "POST",
      body: JSON.stringify(newBrand),
    });
    const newAcc = await res.json();
    // console.log("RES", newAcc);
    return newAcc;
  }
);
export const fetchUpdateBrand = createAsyncThunk(
  `products/fetchUpdateBrand`,
  async (newBrand) => {
    axios
      .put(`http://localhost:3000/brands/${newBrand.id}`, newBrand)
      .then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
  }
);
export const fetchAddMaterial = createAsyncThunk(
  `products/fetchAddMaterial`,
  async (newMaterial) => {
    const res = await fetch(`http://localhost:3000/materials`, {
      method: "POST",
      body: JSON.stringify(newMaterial),
    });
    const newAcc = await res.json();
    // console.log("RES", newAcc);
    return newAcc;
  }
);
export const fetchUpdateMaterial = createAsyncThunk(
  `products/fetchUpdateMaterial`,
  async (newMaterial) => {
    axios
      .put(`http://localhost:3000/materials/${newMaterial.id}`, newMaterial)
      .then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
  }
);
export const fetchDeleteBrand = createAsyncThunk(
  `products/fetchDeleteBrand`,
  async (id) => {
    axios.delete(`http://localhost:3000/brands/${id}`).then((res) => {
      console.log("res.data;", res.data);
      return res.data;
    });
  }
);
export const fetchDeleteMaterial = createAsyncThunk(
  `products/fetchDeleteMaterial`,
  async (id) => {
    axios.delete(`http://localhost:3000/materials/${id}`).then((res) => {
      console.log("res.data;", res.data);
      return res.data;
    });
  }
);
export const fetchUpdateCategory = createAsyncThunk(
  `products/fetchUpdateCategory`,
  async (newCategory) => {
    axios
      .put(`http://localhost:3000/categorys/${newCategory.id}`, newCategory)
      .then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
  }
);
export const fetchDeleteCategory = createAsyncThunk(
  `products/fetchDeleteCategory`,
  async (id) => {
    axios.delete(`http://localhost:3000/categorys/${id}`).then((res) => {
      console.log("res.data;", res.data);
      return res.data;
    });
  }
);
