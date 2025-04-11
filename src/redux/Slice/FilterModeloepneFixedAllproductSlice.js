import { createSlice } from "@reduxjs/toolkit";

const modelSlice = createSlice({
  name: "filterModel",
  initialState: {
    modelOpen: false,
    callapi: false,
  },
  reducers: {
    modelOpenAction: (state, action) => {
      state.modelOpen = action.payload;
    },
    callApiAction: (state, action) => {
      state.callapi = action.payload;
    },
  },
});

export const { modelOpenAction, callApiAction } = modelSlice.actions;
export default modelSlice.reducer;
