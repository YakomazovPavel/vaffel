import { createSlice } from "@reduxjs/toolkit";

export var PAGE = {
  CreateBasket: "CreateBasket",
  BasketDetail: "BasketDetail",
  BasketList: "BasketList",
  Shop: "Shop",
};

const initialState = {
  currentPage: PAGE.CreateBasket,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = appSlice.actions;
export default appSlice.reducer;
