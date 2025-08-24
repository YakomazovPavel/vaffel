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
  baskets: [
    {
      id: "1",
      photo_url: "1.jpg",
      author_id: "1",
      name: "Посиделки на свадьбе",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "5",
      photo_url: "5.jpg",
      author_id: "1",
      name: "Первая карзина",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "2",
      photo_url: "2.jpg",
      author_id: "2",
      name: "Посиделки на похоронах",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "3",
      photo_url: "3.jpg",
      author_id: "2",
      name: "Чаяпитие",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "4",
      photo_url: "4.jpg",
      author_id: "3",
      name: "Тимбилдинг 18:00",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
  ],
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
    addBasket: (state, action) => {
      state.baskets.push(action.payload);
    },
  },
});

export const { setCurrentPage, setCurrentBasketId, addBasket } = appSlice.actions;
export default appSlice.reducer;
