import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {},
  reducers: {
    categoryaction: function (state, action) {
      state.categoryName = action.payload;
    },
  },
});

export const { categoryaction } = categorySlice.actions;
export default categorySlice.reducer;
