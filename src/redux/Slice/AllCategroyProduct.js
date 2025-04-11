import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryproductApi } from "../../utils/Api_url";

export const fetchcategoryprouduct = createAsyncThunk(
  "category/fetch",
  async (producttailes) => {
    const { page, categoryName } = producttailes;
    const response = await fetch(
      `${categoryproductApi}/${categoryName}/${page}`
    );
    const data = await response.json();
    return data;
  }
);

const singleCategoryProductSlice = createSlice({
  name: "singleCategory",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchcategoryprouduct.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchcategoryprouduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchcategoryprouduct.rejected, (state, _) => {
      (state.isLoading = false), (state.isError = true);
    });
  },
});

export default singleCategoryProductSlice.reducer;
