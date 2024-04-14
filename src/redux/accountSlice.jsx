import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useDispatch } from "react-redux";
// http://localhost:8000/accounts
// http://localhost:8000/departments
// http://localhost:8000/position
import { urls } from "../fakeApis";
const initialState = {
  dataAccount: { status: "idle", accounts: [] },
  departments: [],
  positions: [],
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState: initialState,
  reducers: {
    addNewAccount: (state, action) => {
      return {
        ...state,
        dataAccount: [...state.dataAccount, action.payload],
      };
    },
    setDataAccount: (state, action) => {
      return {
        ...state,
        dataAccount: action.payload,
      };
    },
    updateAccount: (state, action) => {
      const arr = [...state.dataAccount];
      return {
        ...state,
        dataAccount: arr.map((account) => {
          if (account.id == action.payload.id) {
            return {
              ...account,
              email: action.payload.email,
              username: action.payload.username,
              fullname: action.payload.fullname,
              department: action.payload.department,
              position: action.payload.position,
            };
          }
          return account;
        }),
      };
    },
    setPage: (state, action) => {
      return {
        ...state,
        page: action.payload,
      };
    },
    setOpenModal: (state, action) => {
      return {
        ...state,
        openModal: action.payload,
      };
    },
    deleteAccount: (state, action) => {
      state.dataAccount = state.dataAccount.filter(
        (account) => !action.payload.includes(account.id)
      );
    },
    delAccount: (state, action) => {
      state.dataAccount = state.dataAccount.filter(
        (account) => account.id != action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccount.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAccount.fulfilled, (state, action) => {
        console.log("state,", state);
        state.dataAccount.accounts = action.payload;
        state.dataAccount.status = "idle";
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.departments = action.payload;
      })
      .addCase(fetchPositon.fulfilled, (state, action) => {
        state.positions = action.payload;
      })
      .addCase(fetchAddNewAccounts.fulfilled, (state, action) => {
        state.dataAccount.accounts = [
          ...state.dataAccount.accounts,
          action.payload,
        ];
        state.dataAccount.status = "idle";
      })
      .addCase(fetchUpdateAccounts.fulfilled, (state, action) => {
        let arr = action.meta.arg;
        console.log("arr", arr);
        let newArr = [...state.dataAccount.accounts];
        state.dataAccount.accounts = newArr.map((item) => {
          if (item.id == arr.id) {
            return {
              ...item,
              email: arr.email,
              username: arr.username,
              fullname: arr.fullname,
              department: arr.department,
              position: arr.position,
            };
          }
          return item;
        });
      })
      .addCase(fetchDeleteAccounts.fulfilled, (state, action) => {
        console.log("action.meta.arg", action.meta.arg);
        state.dataAccount.accounts = state.dataAccount.accounts.filter(
          (account) => !action.meta.arg.includes(account.id)
        );
      });
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewAccount,
  updateAccount,
  setDataAccount,
  setOpenModal,
  setPage,
  deleteAccount,
  delAccount,
} = accountSlice.actions;

export default accountSlice.reducer;

export const fetchAccount = createAsyncThunk(
  "accounts/fetchAccounts",
  async () => {
    const res = await fetch(`http://localhost:3000/accounts`);
    const data = await res.json();
    // console.log("respon", data);
    return data;
  }
);

export const fetchDepartment = createAsyncThunk(
  "accounts/fetchDepartment",
  async () => {
    const res = await fetch(`http://localhost:3000/departments`);
    const data = await res.json();
    // console.log("respon", data);
    return data;
  }
);
export const fetchPositon = createAsyncThunk(
  "accounts/fetchPositon",
  async () => {
    const res = await fetch(`http://localhost:3000/position`);
    const data = await res.json();
    // console.log("respon", data);
    return data;
  }
);
export const fetchAddNewAccounts = createAsyncThunk(
  `"accounts/addNewAccounts"`,
  async (newAccounts) => {
    const res = await fetch(`http://localhost:3000/accounts`, {
      method: "POST",
      body: JSON.stringify(newAccounts),
    });
    const newAcc = await res.json();
    // console.log("RES", newAcc);
    return newAcc;
  }
);
export const fetchUpdateAccounts = createAsyncThunk(
  `"accounts/updateAccount"`,
  async (newAccounts) => {
    axios
      .put(`http://localhost:3000/accounts/${newAccounts.id}`, newAccounts)
      .then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
  }
);
export const fetchDeleteAccounts = createAsyncThunk(
  `accounts/DeleteAccount`,
  async (listID) => {
    listID.map((id) => {
      axios.delete(`http://localhost:3000/accounts/${id}`).then((res) => {
        console.log("res.data;", res.data);
        return res.data;
      });
    });
  }
);
