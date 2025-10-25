class Backend {
  BASE_URL = "https://yakomazovpavel.pythonanywhere.com/api/";

  createBasket = ({ author_id, name }) => {
    return fetch(this.BASE_URL + "baskets/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author_id, name }),
    });
  };
  createUser = ({ first_name, last_name, photo_url, telegram_id, username }) => {
    return fetch(this.BASE_URL + "users/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, photo_url, telegram_id, username }),
    });
  };
  createBasketDish = ({ user_id, basket_id, dish_id }) => {
    return fetch(this.BASE_URL + `baskets/${basket_id}/dishes/${dish_id}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id }),
    });
  };
  deleteBasketDish = ({ user_id, basket_id, dish_id }) => {
    return fetch(this.BASE_URL + `baskets/${basket_id}/dishes/${dish_id}/`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: user_id,
      },
      // body: JSON.stringify({ user_id }),
    });
  };
  getBasketDetail = ({ basketId, userId }) => {
    return fetch(this.BASE_URL + `baskets/${basketId}/`, {
      method: "GET",
      headers: {
        Authorization: userId,
      },
    });
  };
  shareBasket = ({ basketId, userId }) => {
    return fetch(this.BASE_URL + `baskets/${basketId}/share/`, {
      method: "GET",
      headers: {
        Authorization: userId,
      },
    });
  };
  getBasketDishes = ({ basketId }) => {
    return fetch(this.BASE_URL + `baskets/${basketId}/dishes/`);
  };
  getBasketDish = ({ basketId, dishId }) => {
    return fetch(this.BASE_URL + `baskets/${basketId}/dishes/${dishId}/`);
  };
  getBasketList = ({ userId }) => {
    return fetch(this.BASE_URL + `user/${userId}/baskets/`);
  };
  getDishes = () => {
    return fetch(this.BASE_URL + `dishes/`);
  };
  getCategories = () => {
    return fetch(this.BASE_URL + `categories/`);
  };
  getDishDetail = ({ dishId }) => {
    return fetch(this.BASE_URL + `dishes/${dishId}/`);
  };
}

export default new Backend();
