import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import categoriesReducer from "./slice/categoriesSlice";
import clientSlice from './slice/clientSlice'
import tradeTypeSlice from './slice/tradetypeSlice'

const reducer = {
  auth: authReducer,
  categories: categoriesReducer,
  client: clientSlice,
  tradeType: tradeTypeSlice
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
