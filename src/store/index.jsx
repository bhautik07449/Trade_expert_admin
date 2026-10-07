import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import categoriesReducer from "./slice/categoriesSlice";
import clientSlice from './slice/clientSlice'
import tradeTypeSlice from './slice/tradetypeSlice'
import tradeOfferSlice from './slice/tradeofferSlice'
import blogcategoriesSlice from './slice/blogcategorySlice'
import measurementSlice from './slice/measurementSlice'
import productSlice from './slice/productSlice'
import abctypeSlice from './slice/abctypeSlice'
import productnameSlice from './slice/productnameSlice'
import countryFilterReducer from './slice/countryFilterSlice'
import franchiseSlice from './slice/franchiseSlice'
import careerSlice from './slice/careerSlice'
import developPrepositionsSlice from './slice/developPrepositionsSlice'
import developTopologiesSlice from './slice/developTopologiesSlice'

const reducer = {
  auth: authReducer,
  categories: categoriesReducer,
  client: clientSlice,
  tradeType: tradeTypeSlice,
  tradeOffer: tradeOfferSlice,
  blogcategory: blogcategoriesSlice,
  measurements: measurementSlice,
  products: productSlice,
  abctype: abctypeSlice,
  productname: productnameSlice,
  countryFilter: countryFilterReducer,
  franchise: franchiseSlice,
  career: careerSlice,
  developPrepositions: developPrepositionsSlice,
  developTopologies: developTopologiesSlice,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
