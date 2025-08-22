import { createSlice } from "@reduxjs/toolkit";

export var PAGE = {
  CreateBasket: "CreateBasket",
  BasketDetail: "BasketDetail",
  BasketList: "BasketList",
  Shop: "Shop",
};

const initialState = {
  currentPage: PAGE.Shop,
  currentBasketId: "",
  userId: "1",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentBasketId: (state, action) => {
      state.currentBasketId = action.payload;
    },
  },
});

export const { setCurrentPage, setCurrentBasketId } = appSlice.actions;
export default appSlice.reducer;
