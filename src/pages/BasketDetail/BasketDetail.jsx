import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, PAGE, setBasketDish } from "../../slices/appSlice.js";
import Backend from "../../api/backend.js";

var computingDishes = ({ basketDishes }) => {
  console.log({ basketDishes });
  if (!!basketDishes?.length) {
    var groupDishes = basketDishes.reduce(function (accum, item) {
      (accum[item?.dish?.id] ??= []).push(item);
      return accum;
    }, {});

    return Object.keys(groupDishes).map((key) => {
      return { ...groupDishes[key]?.at(0), count: groupDishes[key]?.length };
    });
  } else {
    return [];
  }
};

var useGetData = (basketId) => {
  var [isLoading, setIsLoading] = useState(true);

  var [basket, setBasket] = useState();
  var [dishesListData, setDishesListData] = useState([]);
  useEffect(() => {
    Promise.all([
      Backend.getBasketDetail({ basketId }).then((response) => response.json()),
      Backend.getBasketDishes({ basketId }).then((response) => response.json()),
    ]).then(([basket, basketDishes]) => {
      setIsLoading(false);
      setBasket(basket);
      // Сгруппировать basketDishes по dishId
      setDishesListData(computingDishes({ basketDishes }));
    });
  }, []);

  return [basket, setBasket, dishesListData, setDishesListData, isLoading, setIsLoading];
};

function BasketDetail() {
  console.log({ start_param: window?.Telegram?.WebApp?.initDataUnsafe?.start_param });

  const dispatch = useDispatch();
  var userId = useSelector((state) => state.appSlice.userId);
  console.log({ userId });
  var currentBasketId = useSelector((state) => state.appSlice.currentBasketId);

  var [basket, setBasket, dishesListData, setDishesListData, isLoading, setIsLoading] = useGetData(currentBasketId);
  console.log({ basket, dishesListData, isLoading });

  var orderBasketHandler = () => {
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
    if (basket?.author_id == userId) {
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
  }, [basket?.author_id, userId]);

  var copyLinkHandler = async () => {
    Telegram.WebApp.showAlert("Ссылка скопирована");
    // window.Telegram.WebApp.shareMessage(1);
    // if (navigator?.clipboard?.writeText) {
    // Это работает на телефоне =/
    // await navigator.clipboard.writeText("Рандомный текст в буфере обмена");
    Telegram.WebApp.showAlert("Ссылка скопирована");
    // }
  };

  var addItemHandler = () => {
    dispatch(setCurrentPage(PAGE.Shop));
  };

  var addDishHandler = async ({ dishId }) => {
    Backend.createBasketDish({ user_id: userId, basket_id: currentBasketId, dish_id: dishId });

    var copy = structuredClone(shopListData);
    var category = copy.filter((category) => category.id === categoryId)?.at(0);
    if (category) {
      var dish = category.dishes.filter((dish) => dish.id === dishId)?.at(0);
      dish.count++;
      category.count++;
      setShopListData(copy);
    }
  };

  var removeDishHandler = async ({ categoryId, dishId }) => {
    Backend.deleteBasketDish({ user_id: userId, basket_id: currentBasketId, dish_id: dishId });
    var copy = structuredClone(shopListData);
    var category = copy.filter((category) => category.id === categoryId)?.at(0);
    if (category) {
      var dish = category.dishes.filter((dish) => dish.id === dishId)?.at(0);
      if (dish && dish.count > 0) {
        dish.count--;
        if (category.count > 0) {
          category.count--;
        }
        setShopListData(copy);
      }
    }
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

          {!!dishesListData?.length && dishesListData.map((item) => <Dish item={item} />)}

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

var Dish = ({ item }) => {
  const [counterKey, setCounterKey] = useState(0);

  var plusButtonHandler = () => {
    // addDishHandler({ categoryId: dish?.category?.id, dishId: dish?.id });
    setCounterKey((prev) => ++prev);
  };

  var minusButtonHandler = () => {
    if ((item?.dish?.count || 0) > 0) {
      // removeDishHandler({ categoryId: dish?.category?.id, dishId: dish?.id });
      setCounterKey((prev) => ++prev);
    }
  };

  return (
    <div class="basket_detail_item">
      <div className="photo">
        <img src={item?.dish?.photo_url} />
        {/* <p style={{ animation: "change 0.7s forwards" }}>{item?.count}</p> */}
        {!!item?.dish?.count && (
          <p key={counterKey} style={{ animation: "change 0.7s forwards" }}>
            {item?.dish?.count}
          </p>
        )}
      </div>

      <p class="name">{item?.dish?.name}</p>
      {/* <p class="count">x{item?.count}</p> */}
      <div class="control">
        <button onClick={plusButtonHandler}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref="#circle_minus"></use>
          </svg>
        </button>
        <button onClick={minusButtonHandler}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref="#circle_plus"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BasketDetail;
