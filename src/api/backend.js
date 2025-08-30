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
  getBasketDetail = ({ basketId }) => {
    return fetch(this.BASE_URL + `baskets/${basketId}/`);
  };
  getBasketDishes = ({ basketId }) => {
    return fetch(this.BASE_URL + `baskets/${basketId}/dishes/`);
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
}

export default new Backend();
