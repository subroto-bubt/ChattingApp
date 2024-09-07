import { createSlice } from "@reduxjs/toolkit";

export const ActiveSingleSlice = createSlice({
  name: "single",
  initialState: {
    active: JSON.parse(localStorage.getItem("active")) || null,
  },
  reducers: {
    ActiveSingle: (state, action) => {
      state.active = action.payload;
    },
    DeactiveSlingle: (state) => {
      state.active = null;
    },
  },
});

export const { ActiveSingle, DeactiveSlingle } = ActiveSingleSlice.actions;
export default ActiveSingleSlice.reducer;
