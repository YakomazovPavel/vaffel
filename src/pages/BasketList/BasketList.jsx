import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";

const mockBasketListData = {
  my: [
    {
      id: "1",
      photo_url: "1.jpg",
      author_id: "1",
      name: "Посиделки на свадьбе",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "5",
      photo_url: "5.jpg",
      author_id: "1",
      name: "Первая карзина",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
  ],
  other: [
    {
      id: "2",
      photo_url: "2.jpg",
      author_id: "1",
      name: "Посиделки на похоронах",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "3",
      photo_url: "3.jpg",
      author_id: "2",
      name: "Чаяпитие",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
    {
      id: "4",
      photo_url: "4.jpg",
      author_id: "3",
      name: "Тимбилдинг 18:00",
      is_locked: false,
      created: "2025-08-19T14:52:54.348Z",
      updated: "2025-08-19T14:52:54.348Z",
    },
  ],
};

function BasketList() {
  const dispatch = useDispatch();
  // const [dataLoading, setDataLoading] = useState(true);
  const [basketListData, setBasketListData] = useState(mockBasketListData);

  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.CreateBasket));
  };

  var mainButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.CreateBasket));
  };

  var open = () => {
    window.Telegram.WebApp.BackButton.show();
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
    load;
    return close;
  }, []);

  return (
    <div id="page_basket_list">
      <div className="settings_wrap">
        {/* <!-- Сюда добавить поисковую строку --> */}
        {basketListData?.my && (
          <div className="basket_list_section">
            <input className="hide" type="checkbox" name="my_basket" value="value" id="my_basket_section" />
            <label htmlFor="my_basket_section" className="basket_section_label">
              <p>Мои корзины</p>
              <svg className="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                <use xlinkHref="#arrow"></use>
              </svg>
            </label>

            {basketListData.my.map((basket) => (
              <div className="basket_list_item">
                <img src={basket.photo_url} />
                <div>
                  <h1>{basket.name}</h1>
                </div>
                <button>
                  <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                    <use xlinkHref="#circle_arrow"></use>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="basket_list_section">
          <input className="hide" type="checkbox" name="my_basket" value="value" id="not_my_basket_section" />
          <label htmlFor="not_my_basket_section" className="basket_section_label">
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
