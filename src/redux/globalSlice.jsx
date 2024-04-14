import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  toggleCart: false,
};

export const globalSlice = createSlice({
  name: "globals",
  initialState: initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
    setToggleCart: (state, action) => {
      state.toggleCart = action.payload;
    },
  },
});

export const { setDarkMode, setToggleCart } = globalSlice.actions;

export default globalSlice.reducer;
