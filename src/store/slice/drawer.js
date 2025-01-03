import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawer: window.innerWidth >= 601,
};

export const drawer = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    updateDrawer: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { updateDrawer } = drawer.actions;

export const selectdrawer = (state) => state.drawer;

export default drawer.reducer;
