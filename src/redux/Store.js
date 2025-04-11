import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./Slice/CategorySlice";
import singleCategoryProductreducer from "./Slice/AllCategroyProduct";
import allcategoryreducer from "./Slice/AllcategoryFetchSlice";
import { api } from "../rtkQuery/server";
import allproductreducer from "./Slice/AllproductDataStoreSlice";
import addToCartreducer from "./Slice/addToCartSlice";
import CategoryFilterreducer from "./Slice/CategryFilterSlice";
import searchreducer from "./Slice/searchSlice";
import filterModalreducer from "./Slice/FilterModeloepneFixedAllproductSlice";
import filterDatareducer from "./FilterDataSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    categoryproduct: singleCategoryProductreducer,
    allcategory: allcategoryreducer,
    allproductData: allproductreducer,
    additem: addToCartreducer,
    categoryFilterReducer: CategoryFilterreducer,
    searchreducer: searchreducer,
    modelReducer: filterModalreducer,
    filterData: filterDatareducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
