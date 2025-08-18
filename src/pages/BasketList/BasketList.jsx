import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";

function BasketList() {
  const dispatch = useDispatch();

  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.CreateBasket));
  };

  var mainButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.CreateBasket));
  };

  var open = () => {
    window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(backButtonHandler);

    window.Telegram.WebApp.MainButton.text = "Добавить";
    window.Telegram.WebApp.MainButton.isVisible = true;
    window.Telegram.WebApp.MainButton.isActive = true;
    window.Telegram.WebApp.MainButton.onClick(mainButtonHandler);
  };

  var close = () => {
    window.Telegram.WebApp.BackButton.offClick(backButtonHandler);
    window.Telegram.WebApp.MainButton.offClick(mainButtonHandler);
  };

  useEffect(() => {
    open();
    return close;
  }, []);

  return (
    <div id="page_basket_list">
      <div className="settings_wrap">
        {/* <!-- Сюда добавить поисковую строку --> */}
        <div className="basket_list_section">
          <input className="hide" type="checkbox" name="my_basket" value="value" id="my_basket_section" />
          <label htmlFor="my_basket_section">
            <p>Мои корзины</p>
            <svg className="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
              <use xlinkHref="#arrow"></use>
            </svg>
          </label>
          <div className="basket_list_item">
            <img src="1.jpg" />
            <div>
              <h1>Посиделки 2 ноября</h1>
              <h2>#1</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="2.jpg" />
            <div>
              <h1>Хеллоуин</h1>
              <h2>#2</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="3.jpg" />
            <div>
              <h1>Тыквенный спас</h1>
              <h2>#3</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="9.jpg" />
            <div>
              <h1>Отчаяние</h1>
              <h2>#19</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
        </div>

        <div className="basket_list_section">
          <input className="hide" type="checkbox" name="my_basket" value="value" id="not_my_basket_section" />
          <label htmlFor="not_my_basket_section">
            <p>Доступные мне</p>
            <svg className="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
              <use xlinkHref="#arrow"></use>
            </svg>
          </label>
          <div className="basket_list_item">
            <img src="4.jpg" />
            <div>
              <h1>Проводы</h1>
              <h2>#12</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="5.jpg" />
            <div>
              <h1>Свадьба</h1>
              <h2>#15</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="6.jpg" />
            <div>
              <h1>Посиделки 12.05</h1>
              <h2>#72</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="7.jpg" />
            <div>
              <h1>Посиделки маглов</h1>
              <h2>#82</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
          <div className="basket_list_item">
            <img src="8.jpg" />
            <div>
              <h1>Посиделки без повода</h1>
              <h2>#17</h2>
            </div>
            <button>
              <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#circle_arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketList;
