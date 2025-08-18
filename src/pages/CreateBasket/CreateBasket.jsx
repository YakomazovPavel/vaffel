import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { setCurrentPage, PAGE } from "../../slices/appSlice.js";

function CreateBasket() {
  const dispatch = useDispatch();
  var [basketName, setBasketName] = useState("");

  var onClickCreateBasketHandler = async () => {
    window.Telegram.WebApp.MainButton.showProgress(false);
    // console.log("initDataUnsafe", window.Telegram.WebApp.initDataUnsafe);
    // var basketName = document.getElementById("input_basket_name")?.value || "";
    // var date = document.getElementById("input_basket_date");
    // var time = document.getElementById("input_basket_time");
    // var expiredAt = `${date.value}T${time.value}`;
    // // new Date(Date.parse(`${date.value}T${time.value}`)).toISOString();
    // // console.log();

    // // .toLocaleString("ru-RU", { timeZone: "Europe/Moscow" })
    // // ?.toISOString() || "";
    // console.log("expiredAt", expiredAt);
    // var response = await VaffelBotApi.createBasket(
    //   window.Telegram.WebApp.initDataUnsafe.user.id,
    //   basketName,
    //   expiredAt
    // );
    setTimeout(() => {
      window.Telegram.WebApp.MainButton.hideProgress();
    }, 3000);
  };

  var open = () => {
    window.Telegram.WebApp.MainButton.text = "Создать корзину";
    window.Telegram.WebApp.MainButton.isVisible = false;
    window.Telegram.WebApp.MainButton.isActive = false;
    window.Telegram.WebApp.MainButton.onClick(onClickCreateBasketHandler);
  };
  var close = () => {
    window.Telegram.WebApp.MainButton.offClick(onClickCreateBasketHandler);
    // window.Telegram.WebApp.MainButton.onClick(onClickCreateBasketHandler);
    // window.Telegram.WebApp.MainButton.isVisible = false;
  };

  useEffect(() => {
    // setStartApp(window?.Telegram?.WebApp?.initDataUnsafe?.start_param);
    open();
    return close;
  }, []);

  var onChangeBasketName = (e) => {
    console.log(e.target.value);
    if (e.target.value.trim()) {
      window.Telegram.WebApp.MainButton.isVisible = true;
      window.Telegram.WebApp.MainButton.isActive = true;
    } else {
      window.Telegram.WebApp.MainButton.isVisible = false;
      window.Telegram.WebApp.MainButton.isActive = false;
    }
  };

  var toBasketHandler = (e) => {
    console.log("toBasketHandler", e);
    dispatch(setCurrentPage(PAGE.BasketList));
  };

  return (
    <div id="page_basket_create">
      <div className="create_basket_header">
        <img src="icon.jpg" alt="" className="icon" />
        <div className="main_title_wrap">
          <h1 className="main_title">VAFFEL</h1>
          <h2 className="main_subtitle" id="main_subtitle">
            {`Поделись корзиной вафель`}
          </h2>
        </div>
      </div>

      <div className="settings_wrap">
        <form className="settings" name="form_create_basket" action="./">
          <div className="settings_item">
            <input
              id="input_basket_name"
              type="text"
              placeholder="Название корзины"
              name="basket_name"
              onChange={onChangeBasketName}
            />
          </div>
          {/* <div className="settings_item">
            <p>Дата окончания</p>
            <input className="input_basket_datetime" id="input_basket_date" type="date" name="basket_start" />
          </div> */}
          {/* <div className="settings_item">
            <p>Время окончания</p>
            <input className="input_basket_datetime" id="input_basket_time" type="time" name="basket_end" />
          </div> */}
        </form>
        <button id="to_baskets_button" onClick={toBasketHandler}>
          <p>К корзинам</p>
          <svg className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
            <use xlinkHref="#arrow"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CreateBasket;
