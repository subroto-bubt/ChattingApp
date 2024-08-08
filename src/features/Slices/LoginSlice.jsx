import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: JSON.parse(localStorage.getItem("user")) || null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.loggedIn = action.payload;
    },
    logOutUser: (state) => {
      state.loggedIn = null;
    },
  },
});

export const { loggedInUser, logOutUser } = userSlice.actions;
export default userSlice.reducer;
