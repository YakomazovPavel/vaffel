class Backend {
  BASE_URL = "https://yakomazovpavel.pythonanywhere.com/api/";

  createBasket = (author_id, name) => {
    return fetch(this.BASE_URL + "/api/baskets/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ author_id, name }),
    });
  };
}

export default new Backend();
