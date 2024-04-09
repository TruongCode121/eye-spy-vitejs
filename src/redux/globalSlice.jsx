import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

export const globalSlice = createSlice({
  name: "globals",
  initialState: initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = globalSlice.actions;

export default globalSlice.reducer;
