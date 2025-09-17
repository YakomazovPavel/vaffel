import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentPage, PAGE, addBasket, setCurrentBasketId } from "../../slices/appSlice.js";
import Backend from "../../api/backend.js";

function CreateBasket() {
  var dispatch = useDispatch();

  var userId = useSelector((state) => state.appSlice.userId);
  var refUserId = useRef(userId);

  useEffect(() => {
    refUserId.current = userId;
  }, [userId]);

  var [basketName, setBasketName] = useState("");
  var refBasketName = useRef(null);

  useEffect(() => {
    refBasketName.current = basketName.trim();
    if (refBasketName.current) {
      window.Telegram.WebApp.MainButton.show();
      window.Telegram.WebApp.MainButton.isVisible = true;
      window.Telegram.WebApp.MainButton.isActive = true;
    } else {
      window.Telegram.WebApp.MainButton.hide();
      window.Telegram.WebApp.MainButton.isVisible = false;
      window.Telegram.WebApp.MainButton.isActive = false;
    }
  }, [basketName]);

  var [toBasketsDisable, setToBasketsDisable] = useState(false);

  var onClickCreateBasketHandler = async () => {
    setToBasketsDisable(true);
    window.Telegram.WebApp.MainButton.showProgress(false);
    try {
      var response = await Backend.createBasket({ author_id: refUserId.current, name: refBasketName.current });
      var data = await response.json();
      window.Telegram.WebApp.MainButton.hideProgress();
      setToBasketsDisable(false);
      dispatch(setCurrentBasketId(data.id));
      dispatch(setCurrentPage(PAGE.BasketDetail));
    } catch (error) {
      window.Telegram.WebApp.MainButton.hideProgress();
      setToBasketsDisable(false);
    }
  };

  var open = () => {
    window.Telegram.WebApp.BackButton.hide();
    window.Telegram.WebApp.BackButton.isVisible = false;
    window.Telegram.WebApp.MainButton.text = "Создать корзину";
    window.Telegram.WebApp.MainButton.hide();
    window.Telegram.WebApp.MainButton.isVisible = false;
    window.Telegram.WebApp.MainButton.isActive = false;
    window.Telegram.WebApp.MainButton.onClick(onClickCreateBasketHandler);
  };
  var close = () => {
    window.Telegram.WebApp.MainButton.offClick(onClickCreateBasketHandler);
    window.Telegram.WebApp.MainButton.hide();
  };

  useEffect(() => {
    open();
    return close;
  }, []);

  var onChangeBasketName = (e) => {
    setBasketName(e.target.value);
    refBasketName.current = e.target.value.trim();
  };

  var toBasketHandler = (e) => {
    dispatch(setCurrentPage(PAGE.BasketList));
  };

  return (
    <>
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
                value={basketName}
                onChange={onChangeBasketName}
                autoComplete="off"
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
          <button id="to_baskets_button" onClick={toBasketHandler} disabled={toBasketsDisable}>
            <p>К корзинам</p>
            <svg className="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
              <use xlinkHref="#arrow"></use>
            </svg>
          </button>
        </div>
      </div>
      {/* <div className="author">
        <p>made by</p>
        <a href="https://t.me/pavel_yakomazov">@pavel_yakomazov</a>
      </div> */}
    </>
  );
}

export default CreateBasket;
