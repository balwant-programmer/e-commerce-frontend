import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addMoreProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addMoreProducts } = productSlice.actions;

export default productSlice.reducer;
