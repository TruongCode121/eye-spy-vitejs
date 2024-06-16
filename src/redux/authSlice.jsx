import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
