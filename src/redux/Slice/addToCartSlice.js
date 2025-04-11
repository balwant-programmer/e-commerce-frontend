import { createSlice } from "@reduxjs/toolkit";

const findData = (id, state) => state.find(({ productId }) => productId === id);
const initialState = {
  cartItems: [],
};

const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const find = findData(action?.payload?.productId, state.cartItems);
      if (find) {
        find.quantity += 1;
      } else {
        state.cartItems.push({
          productId: action?.payload?.productId,
          quantity: 1,
        });
      }
    },

    decreseItem: (state, action) => {
      const find = findData(action?.payload?.productId, state.cartItems);
      if (find) {
        find.quantity -= 1;
        const quantityData = find?.quantity;
        if (quantityData === 0) {
          let userResponse = confirm("Do you want to proceed?");
          if (userResponse) {
            console.log("User confirmed. Proceeding with the task.");
            const findIndex = state?.cartItems?.findIndex(
              ({ productId }) => productId === action?.payload?.productId
            );
            state?.cartItems?.splice(findIndex, 1);
          } else {
            console.log("User canceled the action.");
            find.quantity += 1;
          }
        }
      }
    },

    removeItems: (state, action) => {
      const findIndex = state?.cartItems?.findIndex(
        ({ productId }) => productId === action?.payload?.productId
      );
      console.log(findIndex);
      let userResponse = confirm("Do you want to Deleted All Item !");
      if (userResponse) {
        state?.cartItems?.splice(findIndex, 1);
      }
    },
  },
});

export const { addToCart, decreseItem, removeItems } = addToCartSlice.actions;
export default addToCartSlice.reducer;
