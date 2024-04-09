import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleMenu: false,
};

export const adminSlice = createSlice({
  name: "admins",
  initialState: initialState,
  reducers: {
    setToggleMenu: (state, action) => {
      state.toggleMenu = action.payload;
    },
  },
});

export const { setToggleMenu } = adminSlice.actions;

export default adminSlice.reducer;
