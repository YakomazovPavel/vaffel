import { createSlice } from "@reduxjs/toolkit";

export var PAGE = {
  CreateBasket: "CreateBasket",
  BasketDetail: "BasketDetail",
  DishDetail: "DishDetail",
  BasketList: "BasketList",
  Shop: "Shop",
};

const initialState = {
  currentPage: PAGE.DishDetail,
  currentBasketId: "1",
  currentDishId: "1378181",
  userId: "1",
  baskets: [
    {
      id: "1",
      photo_url: "0.jpg",
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
  categories: [],
  dishes: [],
  basketDishes: [
    {
      id: "1",
      basket_id: "1",
      dish: {
        id: "1",
        category_id: "1",
        name: "Барбекю",
        description:
          "Котлета из говядины, жареный бекон, сыр чеддер, айсберг, маринованные огурец и красный лук, соус барбекю, соус сладкая аджика, картофельное тесто (мука пшеничная, картофель, лук репчатый, яйцо куриное, молоко,, соль, специи",
        price: "540",
        calories: "206.6",
        proteins: "6.6",
        fats: "13.1",
        carbs: "15.6",
        weight: "350",
        photo_url:
          "https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561134/56c41996237e9cc6ef75fcb48d671352.webp",
      },
      user: {
        id: "1",
        username: "pavel_yakomazov",
        first_name: "Pavel",
        last_name: "Yakomazov",
        photo_url: "https://pic.rutube.ru/video/fa/17/fa1763b889c5e26146174f8878315143.jpg",
      },
    },
    {
      id: "3",
      basket_id: "1",
      dish: {
        id: "1",
        category_id: "1",
        name: "Барбекю",
        description:
          "Котлета из говядины, жареный бекон, сыр чеддер, айсберг, маринованные огурец и красный лук, соус барбекю, соус сладкая аджика, картофельное тесто (мука пшеничная, картофель, лук репчатый, яйцо куриное, молоко,, соль, специи",
        price: "540",
        calories: "206.6",
        proteins: "6.6",
        fats: "13.1",
        carbs: "15.6",
        weight: "350",
        photo_url:
          "https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561134/56c41996237e9cc6ef75fcb48d671352.webp",
      },
      user: {
        id: "1",
        username: "pavel_yakomazov",
        first_name: "Pavel",
        last_name: "Yakomazov",
        photo_url: "https://pic.rutube.ru/video/fa/17/fa1763b889c5e26146174f8878315143.jpg",
      },
    },
    {
      id: "2",
      basket_id: "1",
      dish: {
        id: "2",
        category_id: "1",
        name: "Индиана Джонс",
        description:
          "Запеченное куриное филе, сыр чеддер, яблоко, руккола, домашний майонез, соус брусничный, картофельное тесто (мука пшеничная, картофель, лук репчатый, яйцо куриное, молоко,, соль, специи)",
        price: "510",
        calories: "191",
        proteins: "7.1",
        fats: "12",
        carbs: "13.5",
        weight: "380",
        photo_url:
          "https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561136/6d384469f83aa62fc707807d122aaa9d.webp",
      },
      user: {
        id: "1",
        username: "pavel_yakomazov",
        first_name: "Pavel",
        last_name: "Yakomazov",
        photo_url: "https://pic.rutube.ru/video/fa/17/fa1763b889c5e26146174f8878315143.jpg",
      },
    },
  ],
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentUserId: (state, action) => {
      state.userId = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentBasketId: (state, action) => {
      state.currentBasketId = action.payload;
    },
    addBasket: (state, action) => {
      state.baskets.push(action.payload);
    },
    addBasketDish: (state, action) => {
      state.basketDishes.push(action.payload);
    },
    setBasketDish: (state, action) => {
      state.basketDishes = action.payload;
    },
    setCurrentDishId: (state, action) => {
      state.currentDishId = action.payload;
    },
  },
});

export const { setCurrentPage, setCurrentBasketId, addBasket, setCurrentUserId, setBasketDish, setCurrentDishId } =
  appSlice.actions;
export default appSlice.reducer;
