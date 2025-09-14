import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, PAGE, setBasketDish } from "../../slices/appSlice.js";
import Backend from "../../api/backend.js";

var computingDishes = ({ basketDishes }) => {
  if (!!basketDishes?.length) {
    var groupDishes = basketDishes.reduce(function (accum, item) {
      var dish = accum[item.dish.id];
      if (dish) {
        dish.count++;
        // Проверить есть у этого блюда пользователь, если такой есть добавить счетчик, если нет, добавить пользователя
        var user = dish?.users?.filter((user) => user.id == item.user.id)?.at(0);
        if (user) {
          user.count++;
        } else {
          dish.users.push(item.user);
        }
      } else {
        // Добавить новое блюдо
        item.dish.count = 1;
        item.user.count = 1;
        item.dish.users = [item.user];
        delete item.dish.user;

        accum[item?.dish?.id] = item.dish;
      }
      // (accum[item?.dish?.id] ??= []).push(item);
      return accum;
    }, {});

    return Object.keys(groupDishes).map((key) => {
      return groupDishes[key];
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
      console.log({ basketDishes });
      var computedDishes = computingDishes({ basketDishes });
      console.log({ computedDishes });
      setDishesListData(computedDishes);
    });
  }, []);

  return [basket, setBasket, dishesListData, setDishesListData, isLoading, setIsLoading];
};

function BasketDetail() {
  // console.log({ start_param: window?.Telegram?.WebApp?.initDataUnsafe?.start_param });

  const dispatch = useDispatch();
  var userId = useSelector((state) => state.appSlice.userId);
  // console.log({ userId });
  var currentBasketId = useSelector((state) => state.appSlice.currentBasketId);

  var [basket, setBasket, dishesListData, setDishesListData, isLoading, setIsLoading] = useGetData(currentBasketId);
  console.log({ dishesListData });

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
    console.log("addDishHandler dishId", dishId);

    Backend.createBasketDish({ user_id: userId, basket_id: currentBasketId, dish_id: dishId });

    var copy = structuredClone(dishesListData);
    var dish = dishesListData.filter((dish) => dish.id === dishId)?.at(0);
    if (dish) {
      ++dish.count;
      var user = dish.users.filter((user) => user.id === userId)?.at(0);
      if (user) {
        ++user.count;
      }
      setDishesListData(copy);
    }
    console.log("addDishHandler dish", dish);
  };

  var removeDishHandler = async ({ categoryId, dishId }) => {
    Backend.deleteBasketDish({ user_id: userId, basket_id: currentBasketId, dish_id: dishId });
    var copy = structuredClone(dishesListData);
    var dish = dishesListData.filter((dish) => dish.id === dishId)?.at(0);
    if (dish) {
      dish.count--;
      var user = dish.users.filter((user) => user.id === userId)?.at(0);
      if (user) {
        user.count--;
      }
      setDishesListData(copy);
    }
  };

  var onTouchEndHandler = (e) => {
    if (e.touches[0].clientX - e.touches.at(-1).clientX > 120) {
      dispatch(setCurrentPage(PAGE.BasketList));
    }
  };

  return (
    <div id="page_basket_detail" onTouchEnd={onTouchEndHandler}>
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

          {!!dishesListData?.length &&
            dishesListData.map((dish) => (
              <Dish dish={dish} addDishHandler={addDishHandler} removeDishHandler={removeDishHandler} />
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

var Dish = ({ dish, addDishHandler, removeDishHandler }) => {
  const [counterKey, setCounterKey] = useState(0);

  var plusButtonHandler = () => {
    addDishHandler({ dishId: dish?.id });
    setCounterKey((prev) => ++prev);
  };

  var minusButtonHandler = () => {
    if ((dish?.count || 0) > 0) {
      removeDishHandler({ dishId: dish?.id });
      setCounterKey((prev) => ++prev);
    }
  };

  return (
    <div class="basket_detail_item">
      <div className="photo">
        <img src={dish?.photo_url} />
        {/* <p style={{ animation: "change 0.7s forwards" }}>{item?.count}</p> */}
        {!!dish?.count && (
          <p key={counterKey} style={{ animation: "change 0.7s forwards" }}>
            {dish?.count}
          </p>
        )}
      </div>

      <p class="name">{dish?.name}</p>
      {/* <p class="count">x{item?.count}</p> */}
      <div class="control">
        <button onClick={minusButtonHandler}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref="#circle_minus"></use>
          </svg>
        </button>
        <button onClick={plusButtonHandler}>
          <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref="#circle_plus"></use>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BasketDetail;
