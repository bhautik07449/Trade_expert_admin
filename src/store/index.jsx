import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import categoriesReducer from "./slice/categoriesSlice";
import clientSlice from './slice/clientSlice'
import tradeTypeSlice from './slice/tradetypeSlice'
import tradeOfferSlice from './slice/tradeofferSlice'
import blogcategoriesSlice from './slice/blogcategorySlice'
import measurementSlice from './slice/measurementSlice'
import productSlice from './slice/productSlice'

const reducer = {
  auth: authReducer,
  categories: categoriesReducer,
  client: clientSlice,
  tradeType: tradeTypeSlice,
  tradeOffer: tradeOfferSlice,
  blogcategory: blogcategoriesSlice,
  measurements: measurementSlice,
  products: productSlice
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
