import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllgetoryApi } from "../../utils/Api_url";

export const allcategoryThunk = createAsyncThunk(
  "product/fetchData",
  async () => {
    const response = await fetch(getAllgetoryApi);
    if (!response?.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  }
);

const allcategorySlice = createSlice({
  name: "allcategory",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(allcategoryThunk.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(allcategoryThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload.allcategory || action.payload;
    });

    builder.addCase(allcategoryThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default allcategorySlice.reducer;
