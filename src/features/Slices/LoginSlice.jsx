import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "Login",
  initialState: {
    loggedIn: null,
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
