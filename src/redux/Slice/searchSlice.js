import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    focus: false,
    hiddenSearchBar: "",
  },
  reducers: {
    focuseAction: (state, action) => {
      state.focus = action.payload;
    },
    searchQueryStringAction: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetqueryAction: (state, _) => {
      state.searchQuery = "";
    },
  },
});

export const { focuseAction, searchQueryStringAction, resetqueryAction } =
  searchSlice.actions;
export default searchSlice.reducer;
