import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";
import Backend from "../../api/backend.js";

var basketDetailData = {
  id: "1",
  photo_url: "0.jpg",
  author_id: "1",
  name: "Посиделки на свадьбе",
  is_locked: false,
  created: "2025-08-19T14:52:54.348Z",
  updated: "2025-08-19T14:52:54.348Z",
  dishes: [],
};

var computingDishes = (basketDishes) => {
  var groupDishes = basketDishes.reduce(function (accum, item) {
    console.log("computingDishes item", item);
    (accum[item.dish.id] ??= []).push(item);
    return accum;
  }, {});

  console.log("groupDishes", groupDishes);

  return Object.keys(groupDishes).map((key) => {
    return { ...groupDishes[key]?.at(0), count: groupDishes[key]?.length };
  });
};

var useGetData = (basketId) => {
  var [basket, setBasket] = useState();
  var [dishes, setDishes] = useState();
  Backend.getBasketDetail({ basketId: basketId })
    .then((response) => response.json())
    .then((data) => {
      setBasket(data);
    });
  // Backend.getBasketDishes(basket_id);

  return [basket, dishes];
};

function BasketDetail() {
  const dispatch = useDispatch();
  var userId = useSelector((state) => state.appSlice.userId);
  var currentBasketId = useSelector((state) => state.appSlice.currentBasketId);

  var baskets = useSelector((state) => state.appSlice.baskets);
  var basket = baskets.filter((basket) => basket.id === currentBasketId)?.at(0);
  var initBasketDishes = useSelector((state) => state.appSlice.basketDishes);
  var basketDishes = computingDishes(initBasketDishes);
  console.log("computingDishes basketDishes", basketDishes);

  console.log("currentBasketId", currentBasketId);
  console.log("basket", basket);

  var orderBasketHandler = () => {
    console.log("orderBasketHandler");
    window.Telegram.WebApp.MainButton.showProgress(false);
    window.Telegram.WebApp.showAlert("Функция в разработке", () => {
      window.Telegram.WebApp.MainButton.hideProgress();
    });
    // window.Telegram.WebApp.showPopup({ title: "Заказ", message: "Функция в разработке" });
  };

  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.BasketList));
  };

  var open = () => {
    if (basket?.author_id === userId) {
      window.Telegram.WebApp.MainButton.text = "Заказать";
      window.Telegram.WebApp.MainButton.hasShineEffect = true;
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.onClick(orderBasketHandler);
    }
    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(backButtonHandler);
  };

  var close = () => {
    window.Telegram.WebApp.MainButton.offClick(orderBasketHandler);
    window.Telegram.WebApp.MainButton.hide();
    window.Telegram.WebApp.BackButton.offClick(backButtonHandler);
  };

  useEffect(() => {
    open();
    return close;
  }, []);

  var copyLinkHandler = async () => {
    Telegram.WebApp.showAlert("Ссылка скопирована");
    // window.Telegram.WebApp.shareMessage(1);
    // if (navigator?.clipboard?.writeText) {
    // Это работает на телефоне =/
    // await navigator.clipboard.writeText("Рандомный текст в буфере обмена");
    // console.log("Text copied to clipboard successfully!");
    Telegram.WebApp.showAlert("Ссылка скопирована");
    // }
  };

  var addItemHandler = () => {
    dispatch(setCurrentPage(PAGE.Shop));
  };

  return (
    <div id="page_basket_detail">
      <div class="settings_wrap">
        <div class="basket_detail">
          <div class="basket_detail_heared">
            <img src={basket?.photo_url} />
            <div>
              <h1>{basket?.name}</h1>
              {/* <h2>#1</h2> */}
              {/* {!basket?.is_locked && <button onClick={copyLinkHandler}></button>} */}
              {/* <button>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref="#share"></use>
                </svg>
              </button> */}
              <button onClick={copyLinkHandler}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <use xlinkHref="#share2"></use>
                </svg>
              </button>
            </div>
          </div>

          {!!basketDishes?.length &&
            basketDishes.map((item) => (
              <div class="basket_detail_item">
                <div className="photo">
                  <img src={item?.dish?.photo_url} />
                  <p style={{ animation: "change 0.7s forwards" }}>{item?.count}</p>
                </div>

                <p class="name">{item?.dish?.name}</p>
                {/* <p class="count">x{item?.count}</p> */}
                <div class="control">
                  <button>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="#circle_minus"></use>
                    </svg>
                  </button>
                  <button>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
                      <use xlinkHref="#circle_plus"></use>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

          {!basket?.is_locked && (
            <div class="basket_detail_item basket_add_item">
              <button onClick={addItemHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <use xlinkHref="#plus"></use>
                </svg>
              </button>
              <p class="name">Добавить</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BasketDetail;
