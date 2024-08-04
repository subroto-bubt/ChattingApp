import { configureStore } from "@reduxjs/toolkit";
import { loggedInUser } from "./Slices/LoginSlice";

const store = configureStore({
  reducer: {
    login: loggedInUser,
  },
});

export default store;
