import { createSlice } from "@reduxjs/toolkit";

const filterDataSlice = createSlice({
  name: "filterData",
  initialState: {
    priceFilterData: [],
    categoryFilterData: [],
    searchFilterData: [],
    emojiFilterData: [],
  },
  reducers: {
    priceFilterDataAction: (state, action) => {
      state.priceFilterData = action.payload;
    },
    categoryFilterDataAction: (state, action) => {
      state.categoryFilterData = action.payload;
    },
    searchFilterDataAction: (state, action) => {
      state.categoryFilterData = action.payload;
    },
    emojiFilterDataAction: (state, action) => {
      state.categoryFilterData = action.payload;
    },
  },
});

export const {
  priceFilterDataAction,
  categoryFilterDataAction,
  searchFilterDataAction,
  emojiFilterDataAction,
} = filterDataSlice.actions;
export default filterDataSlice.reducer;
