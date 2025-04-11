// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./Slice/InstituteSlice";

const store = configureStore({
  reducer: {
    institute: instituteReducer,
  },
});

export default store;
