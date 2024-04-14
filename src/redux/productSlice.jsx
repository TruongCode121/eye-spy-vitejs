import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  productsData: [],
  brands: [],
  materials: [],
  carts: [],
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
    deleteCart: (state, action) => {
      console.log("action", action.payload);
      state.carts = state.carts.filter(
        (item) => !item.product_id.includes(action.payload)
      );
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("state,", state);
        state.productsData = action.payload;
      })
      .addCase(fetchAddNewProduct.fulfilled, (state, action) => {
        state.productsData = [...state.productsData, action.payload];
      })
      .addCase(fetchBrand.fulfilled, (state, action) => {
        state.brands = action.payload;
      })
      .addCase(fetchMaterial.fulfilled, (state, action) => {
        state.materials = action.payload;
      })
      .addCase(fetchDeleteProducts.fulfilled, (state, action) => {
        console.log("action.meta.arg", action.meta.arg);
        state.productsData = state.productsData.filter(
          (product) => !action.meta.arg.includes(product.id)
        );
      })
      .addCase(fetchUpdateProducts.fulfilled, (state, action) => {
        let arr = action.meta.arg;
        console.log("arr fetchUpdateProducts", arr);
        let newArr = [...state.productsData];
        state.productsData = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              name: arr.name,
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
      });
    //   .addCase(fetchDeleteAccounts.fulfilled, (state, action) => {
    //     console.log("action.meta.arg", action.meta.arg);
    //     state.dataAccount.accounts = state.dataAccount.accounts.filter(
    //       (account) => !action.meta.arg.includes(account.id)
    //     );
    //   });
  },
});

export const {
  addNewProduct,
  addToCart,
  decrementCart,
  incrementCart,
  deleteCart,
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
