import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import categoriesReducer from "./slice/categoriesSlice";

const reducer = {
  auth: authReducer,
  categories: categoriesReducer
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
