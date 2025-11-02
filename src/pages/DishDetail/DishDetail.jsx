import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";
import Loader from "../../components/Loader.jsx";
import Backend from "../../api/backend.js";
import "./DishDetail.scss";

var getCountFromBasketDishes = ({ basketDishes, userId }) => {
  return basketDishes?.filter((item) => item?.user?.id == userId)?.length || 0;
};
var getCustomersFromBasketDishes = ({ basketDishes }) => {
  var userIds = [];
  return basketDishes?.filter((item) => {
    if (!userIds.find((id) => id == item?.user?.id)) {
      userIds.push(item?.user?.id);
      return true;
    }
  });
};

var useFetchData = ({ userId, dishId, basketId }) => {
  var [isLoading, setIsLoading] = useState(true);
  var [dish, setDish] = useState();
  var [basketDishes, setBasketDishes] = useState();
  var [counter, setCounter] = useState(0);
  var [customers, setCustomers] = useState();
  useEffect(() => {
    Promise.all([
      // Информация о товаре
      Backend.getDishDetail({ dishId }).then((response) => response.json()),
      // Информация о заказах этого товара в этой корзине
      Backend.getBasketDish({ basketId, dishId }).then((response) => response.json()),
    ])
      .then(([dish, basketDishes]) => {
        setDish(dish);
        setBasketDishes(basketDishes);

        // Получить из basketDishes информацию о количестве и пользователях, что добавили этот товар в эту корзину
        setCounter(getCountFromBasketDishes({ basketDishes, userId }));
        setCustomers(getCustomersFromBasketDishes({ basketDishes }));
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  return [isLoading, dish, customers, counter, setCounter];
};

var DishDetail = () => {
  var userId = useSelector((state) => state.appSlice.userId);
  var basketId = useSelector((state) => state.appSlice.currentBasketId);
  var dishId = useSelector((state) => state.appSlice.currentDishId);

  console.log({ userId, basketId, dishId });
  var [isLoading, dish, customers, counter, setCounter] = useFetchData({ userId, dishId, basketId });
  console.log({ isLoading, dish, customers, counter });

  var [isImageLoad, setIsImageLoad] = useState(true);

  var mainButtonHandler = () => {
    setCounter(1);
    window.Telegram.WebApp.MainButton.hide();
    window.Telegram.WebApp.MainButton.hasShineEffect = false;
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
    Backend.createBasketDish({ user_id: userId, basket_id: basketId, dish_id: dishId });
    window.Telegram.WebApp.HapticFeedback.notificationOccurred("success");
  };

  var dispatch = useDispatch();
  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.Shop));
  };

  var open = () => {
    if (counter == 0) {
      window?.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
      window.Telegram.WebApp.MainButton.text = "Добавить";
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.hasShineEffect = true;
    } else {
      window.Telegram.WebApp.MainButton.hide();
    }

    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(backButtonHandler);
  };

  var close = () => {
    console.log("Снимается mainButtonHandler на странице просмотра блюда");
    window.Telegram.WebApp.MainButton.hasShineEffect = false;
    window.Telegram.WebApp.BackButton.offClick(backButtonHandler);
    window.Telegram.WebApp.MainButton.offClick(mainButtonHandler);
    window?.Telegram?.WebApp?.setHeaderColor(window?.Telegram?.WebApp?.themeParams?.bg_color);
  };

  useEffect(() => {
    console.log("Назначается mainButtonHandler на странице просмотра блюда");
    window.Telegram.WebApp.MainButton.onClick(mainButtonHandler);
    return close;
  }, []);

  useEffect(() => {
    open();
  }, [counter]);

  var onLoadImageHandler = (e) => {
    console.log("onLoadImageHandler e", e);
    console.log("onLoadImageHandler complete", e?.target?.complete);
    setIsImageLoad(false);
    console.log({ dish_color: dish?.color });
    window?.Telegram?.WebApp?.setHeaderColor(dish.color); //"#dae0e4"
  };

  var addDishHandler = () => {
    Backend.createBasketDish({ user_id: userId, basket_id: basketId, dish_id: dishId });
    setCounter((prev) => ++prev);
    window?.Telegram?.WebApp?.HapticFeedback?.notificationOccurred("success");
  };

  var removeDishHandler = () => {
    if (counter == 1) {
      console.log("counter будет 0");

      setTimeout(() => {
        console.log("scrollTo after 300ms");
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 300);
    }

    Backend.deleteBasketDish({ user_id: userId, basket_id: basketId, dish_id: dishId });
    setCounter((prev) => --prev);

    window?.Telegram?.WebApp?.HapticFeedback?.impactOccurred("light");
  };

  var touchstartX = useRef(0);
  var touchendX = useRef(0);

  var swipeCheckDirection = () => {
    console.log("swipeCheckDirection", touchstartX.current, touchendX.current - touchstartX.current);
    if (touchstartX.current < 60 && touchendX.current - touchstartX.current > 120) {
      backButtonHandler();
    }
  };

  var touchStartHandler = (e) => {
    touchstartX.current = e.changedTouches[0].screenX;
  };
  var touchEndHandler = (e) => {
    touchendX.current = e.changedTouches[0].screenX;
    swipeCheckDirection();
  };

  return (
    <>
      {isLoading ? (
        <Loader style={{ left: "calc(50% - 25px)" }} />
      ) : (
        <div className="page_dish_detail" onTouchStartCapture={touchStartHandler} onTouchEndCapture={touchEndHandler}>
          <div className="photo_with_loader_wrapper">
            {isImageLoad && <Loader />}
            <img
              className="dish_photo"
              src={dish?.photo_url}
              onLoad={onLoadImageHandler}
              onLo
              onError={() => {
                console.log("Не удалось загрузить картинку", dish?.photo_url);
              }}
              style={isLoading ? { opacity: 0 } : { opacity: 1 }}
            />
          </div>
          <div className="dish_body">
            <h1>{dish?.name}</h1>
            <p>{dish?.description}</p>
            <div className="dish_body_components">
              <div>
                <h3>В 100 г</h3>
                <p>{dish?.calories} ккал</p>
              </div>
              <div>
                <h3>Белки</h3>
                <p>{dish?.proteins} г</p>
              </div>
              <div>
                <h3>Жиры</h3>
                <p>{dish?.fats} г</p>
              </div>
              <div>
                <h3>Углеводы</h3>
                <p>{dish?.carbs} г</p>
              </div>
            </div>
          </div>
          {!!customers?.length && (
            <div className="dish_body" style={{ rowGap: "10px" }}>
              <p>В корзину добавили</p>

              <div className="dish_body_avatars">
                {customers.map((customer) => (
                  <img
                    src={customer?.user?.photo_url}
                    title={`${customer?.user?.first_name} ${customer?.user?.last_name}`.trim()}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="dish_body dish_body_price_control" style={{ rowGap: "10px" }}>
            <div className="price">
              <h1>{dish?.price} ₽</h1>
              <p>{dish?.weight}г</p>
            </div>
            {counter > 0 && (
              <div className="dish_body_control">
                <button onClick={removeDishHandler}>
                  <p style={{ marginBottom: "3px" }}>-</p>
                </button>
                <p style={{ fontSize: "26px", minWidth: "30px", textAlign: "center" }}>{counter}</p>
                <button onClick={addDishHandler}>
                  <p>+</p>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
    // <div className="page_dish_detail">
    //   <Loader />
    //   {/* {dishId} */}

    //   {/* {isDescription && (
    //     <div className="description">
    //       <div className="description_header">
    //         <div className="name_wrap">
    //           <h1>{dish?.name}</h1>
    //           {!!dish?.count && (
    //             <p key={counterKey} style={{ animation: "change 0.7s forwards" }}>
    //               {dish?.count}
    //             </p>
    //           )}
    //         </div>

    //         <div className="description_header_control">
    //           {dish?.count > 0 && (
    //             <button onClick={minusButtonHandler}>
    //               <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
    //                 <use xlinkHref="#circle_minus"></use>
    //               </svg>
    //             </button>
    //           )}

    //           <button onClick={plusButtonHandler}>
    //             <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
    //               <use xlinkHref="#circle_plus"></use>
    //             </svg>
    //           </button>
    //         </div>
    //       </div>
    //       <p>{dish?.description}</p>

    //       <div className="description_header_components">
    //         <div>
    //           <h3>В 100 г</h3>
    //           <p>{dish?.calories} ккал</p>
    //         </div>
    //         <div>
    //           <h3>Белки</h3>
    //           <p>{dish?.proteins} г</p>
    //         </div>
    //         <div>
    //           <h3>Жиры</h3>
    //           <p>{dish?.fats} г</p>
    //         </div>
    //         <div>
    //           <h3>Углеводы</h3>
    //           <p>{dish?.carbs} г</p>
    //         </div>
    //       </div>
    //     </div>
    //   )} */}
    // </div>
  );
};

export default DishDetail;
