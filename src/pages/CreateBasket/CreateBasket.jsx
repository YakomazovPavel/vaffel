import React, { useEffect, useState } from "react";

function CreateBasket() {
  const [startApp, setStartApp] = useState("");
  useEffect(() => {
    setStartApp(window?.Telegram?.WebApp?.initDataUnsafe?.start_param);
  }, []);

  return (
    <div id="page_basket_create">
      <div className="create_basket_header">
        <img src="icon.jpg" alt="" className="icon" />
        <div className="main_title_wrap">
          <h1 className="main_title">VAFFEL</h1>
          <h2 className="main_subtitle" id="main_subtitle">
            {`Поделись корзиной вафель\n${startApp}`}
          </h2>
        </div>
      </div>

      <div className="settings_wrap">
        <form className="settings" name="form_create_basket" action="./">
          <div className="settings_item">
            <input id="input_basket_name" type="text" placeholder="Название корзины" name="basket_name" />
          </div>
          <div className="settings_item">
            <p>Дата окончания</p>
            <input className="input_basket_datetime" id="input_basket_date" type="date" name="basket_start" />
          </div>
          <div className="settings_item">
            <p>Время окончания</p>
            <input className="input_basket_datetime" id="input_basket_time" type="time" name="basket_end" />
          </div>
        </form>
        <button id="to_baskets_button">
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
