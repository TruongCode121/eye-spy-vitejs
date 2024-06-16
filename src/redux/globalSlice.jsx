import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  toggleCart: false,
};

export const globalSlice = createSlice({
  name: "globals",
  initialState: initialState,
  reducers: {
    toggleDarkMode: (state, { payload }) => {
      return {
        ...state,
        darkMode: payload,
      };
    },
    setToggleCart: (state, action) => {
      state.toggleCart = action.payload;
    },
  },
});

export const { toggleDarkMode, setToggleCart } = globalSlice.actions;

export default globalSlice.reducer;
