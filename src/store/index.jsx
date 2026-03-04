import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import categoriesReducer from "./slice/categoriesSlice";
import clientSlice from './slice/clientSlice'

const reducer = {
  auth: authReducer,
  categories: categoriesReducer,
  client: clientSlice
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
