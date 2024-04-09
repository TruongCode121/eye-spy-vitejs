import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsData: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action) => {
      state.productsData = [...state.productsData, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      console.log("state,", state);
      state.productsData = action.payload;
    });
    //   .addCase(fetchDepartment.fulfilled, (state, action) => {
    //     state.departments = action.payload;
    //   })
    //   .addCase(fetchPositon.fulfilled, (state, action) => {
    //     state.positions = action.payload;
    //   })
    //   .addCase(fetchAddNewAccounts.fulfilled, (state, action) => {
    //     state.dataAccount.accounts = [
    //       ...state.dataAccount.accounts,
    //       action.payload,
    //     ];
    //     state.dataAccount.status = "idle";
    //   })
    //   .addCase(fetchUpdateAccounts.fulfilled, (state, action) => {
    //     let arr = action.meta.arg;
    //     console.log("arr", arr);
    //     let newArr = [...state.dataAccount.accounts];
    //     state.dataAccount.accounts = newArr.map((item) => {
    //       if (item.id == arr.id) {
    //         return {
    //           ...item,
    //           email: arr.email,
    //           username: arr.username,
    //           fullname: arr.fullname,
    //           department: arr.department,
    //           position: arr.position,
    //         };
    //       }
    //       return item;
    //     });
    //   })
    //   .addCase(fetchDeleteAccounts.fulfilled, (state, action) => {
    //     console.log("action.meta.arg", action.meta.arg);
    //     state.dataAccount.accounts = state.dataAccount.accounts.filter(
    //       (account) => !action.meta.arg.includes(account.id)
    //     );
    //   });
  },
});

export const { addNewProduct } = productSlice.actions;

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
