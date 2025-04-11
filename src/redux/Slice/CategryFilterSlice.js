import { createSlice } from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "filterCategory",
  initialState: {
    category: [],
    price: [],
    emoji: null,
  },
  reducers: {
    addCategory: (state, action) => {
      if (state.category.includes(action.payload)) {
        state.category = state.category.filter(
          (item) => item !== action.payload
        );
      } else {
        state.category.push(action.payload);
      }
    },
    rescateory: (state, _) => {
      state.category = [];
    },
    addpriDataAction: (state, action) => {
      state.price = action.payload;
    },
    resprice: (state, _) => {
      state.price = [];
    },
    emojiaction: (state, action) => {
      state.emoji = action.payload;
    },
    reseteemojiaction: (state, action) => {
      state.emoji = action.payload;
    },
  },
});

export const {
  addCategory,
  rescateory,
  addpriDataAction,
  resprice,
  emojiaction,
  reseteemojiaction,
} = categorySlice.actions;

export default categorySlice.reducer;
