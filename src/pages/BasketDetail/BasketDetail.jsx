import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";

var basketDetailData = {
  author_id: "1",
};

function BasketDetail() {
  const dispatch = useDispatch();
  var userId = useSelector((state) => state.appSlice.userId);
  var currentBasketId = useSelector((state) => state.appSlice.currentBasketId);
  var [basketDetail, setBasketDetail] = useState(basketDetailData);
  console.log("currentBasketId", currentBasketId);

  var orderBasketHandler = () => {
    console.log("orderBasketHandler");
    window.Telegram.WebApp.MainButton.showProgress(false);
    window.Telegram.WebApp.showPopup({ title: "Заказ", message: "Функция в разработке" });
    setTimeout(() => {
      window.Telegram.WebApp.MainButton.hideProgress();
    }, 3000);
  };

  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.BasketList));
  };

  var open = () => {
    if (basketDetail.author_id === userId) {
      window.Telegram.WebApp.MainButton.text = "Заказать";
      window.Telegram.WebApp.MainButton.hasShineEffect = true;
      window.Telegram.WebApp.MainButton.show();
      // window.Telegram.WebApp.MainButton.isVisible = false;
      // window.Telegram.WebApp.MainButton.isActive = true;
      window.Telegram.WebApp.MainButton.onClick(orderBasketHandler);

      window.Telegram.WebApp.BackButton.show();
      // window.Telegram.WebApp.BackButton.isVisible = true;
      window.Telegram.WebApp.BackButton.onClick(backButtonHandler);
    }
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
    // window.Telegram.WebApp.shareMessage(1);
    if (navigator?.clipboard?.writeText) {
      // Это работает на телефоне =/
      await navigator.clipboard.writeText("Рандомный текст в буфере обмена");
      console.log("Text copied to clipboard successfully!");
      Telegram.WebApp.showAlert("Ссылка скопирована");
    }
  };

  var addItemHandler = () => {
    dispatch(setCurrentPage(PAGE.Shop));
  };

  return (
    <div id="page_basket_detail">
      <div class="settings_wrap">
        <div class="basket_detail">
          <div class="basket_detail_heared">
            <img src="1.jpg" />
            <div>
              <h1>Посиделки на поминки</h1>
              {/* <h2>#1</h2> */}
              <button onClick={copyLinkHandler}>Поделиться</button>
            </div>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3560858/2ef2838474c7e8d3ba5a069b8ec1f623.webp" />
            {/* <!-- <img src="вальхалла-1.png" /> --> */}
            <p class="name">Вальхалла</p>
            <p class="count">x1</p>
            {/* <!-- TODO: Рассмотреть возможность редактирования количества вафель прямо на странице корзины -->
            <!-- <div class="control">
              <button>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19972 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649922 12.0006 -0.290551 15.0166 0.288228 17.9264C0.867006 20.8361 2.29562 23.5088 4.39341 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2906 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.4721 23.3336C29.1203 20.8668 30 17.9667 30 15C29.9957 11.0231 28.4139 7.2103 25.6018 4.39819C22.7897 1.58609 18.9769 0.00434263 15 0ZM15 28.5938C12.3114 28.5938 9.6832 27.7965 7.44772 26.3028C5.21224 24.8091 3.4699 22.686 2.44102 20.2021C1.41214 17.7182 1.14294 14.9849 1.66746 12.348C2.19197 9.71106 3.48665 7.28889 5.38777 5.38777C7.28889 3.48665 9.71107 2.19197 12.348 1.66745C14.9849 1.14293 17.7182 1.41213 20.2021 2.44101C22.686 3.46989 24.8091 5.21224 26.3028 7.44772C27.7965 9.6832 28.5938 12.3114 28.5938 15C28.5894 18.604 27.1558 22.0591 24.6074 24.6074C22.0591 27.1558 18.604 28.5894 15 28.5938Z"
                  />
                  <path
                    d="M21.0938 14.2969H8.90625C8.71977 14.2969 8.54093 14.371 8.40907 14.5028C8.2772 14.6347 8.20312 14.8135 8.20312 15C8.20312 15.1865 8.2772 15.3653 8.40907 15.4972C8.54093 15.629 8.71977 15.7031 8.90625 15.7031H21.0938C21.2802 15.7031 21.4591 15.629 21.5909 15.4972C21.7228 15.3653 21.7969 15.1865 21.7969 15C21.7969 14.8135 21.7228 14.6347 21.5909 14.5028C21.4591 14.371 21.2802 14.2969 21.0938 14.2969Z"
                  />
                </svg>
              </button>
              <button>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M15 0C12.0333 0 9.13319 0.879735 6.66645 2.52796C4.19972 4.17618 2.27713 6.51886 1.14181 9.25975C0.00649922 12.0006 -0.290551 15.0166 0.288228 17.9264C0.867006 20.8361 2.29562 23.5088 4.39341 25.6066C6.49119 27.7044 9.16394 29.133 12.0737 29.7118C14.9834 30.2906 17.9994 29.9935 20.7403 28.8582C23.4811 27.7229 25.8238 25.8003 27.4721 23.3336C29.1203 20.8668 30 17.9667 30 15C29.9957 11.0231 28.4139 7.2103 25.6018 4.39819C22.7897 1.58609 18.9769 0.00434263 15 0ZM15 28.5938C12.3114 28.5938 9.6832 27.7965 7.44772 26.3028C5.21224 24.8091 3.4699 22.686 2.44102 20.2021C1.41214 17.7182 1.14294 14.9849 1.66746 12.348C2.19197 9.71106 3.48665 7.28889 5.38777 5.38777C7.28889 3.48665 9.71107 2.19197 12.348 1.66745C14.9849 1.14293 17.7182 1.41213 20.2021 2.44101C22.686 3.46989 24.8091 5.21224 26.3028 7.44772C27.7965 9.6832 28.5938 12.3114 28.5938 15C28.5894 18.604 27.1558 22.0591 24.6074 24.6074C22.0591 27.1558 18.604 28.5894 15 28.5938Z"
                  />
                  <path
                    d="M21.0938 14.2969H15.7031V8.90625C15.7031 8.71977 15.629 8.54093 15.4972 8.40907C15.3653 8.2772 15.1865 8.20312 15 8.20312C14.8135 8.20312 14.6347 8.2772 14.5028 8.40907C14.371 8.54093 14.2969 8.71977 14.2969 8.90625V14.2969H8.90625C8.71977 14.2969 8.54093 14.371 8.40907 14.5028C8.2772 14.6347 8.20312 14.8135 8.20312 15C8.20312 15.1865 8.2772 15.3653 8.40907 15.4972C8.54093 15.629 8.71977 15.7031 8.90625 15.7031H14.2969V21.0938C14.2969 21.2802 14.371 21.4591 14.5028 21.5909C14.6347 21.7228 14.8135 21.7969 15 21.7969C15.1865 21.7969 15.3653 21.7228 15.4972 21.5909C15.629 21.4591 15.7031 21.2802 15.7031 21.0938V15.7031H21.0938C21.2802 15.7031 21.4591 15.629 21.5909 15.4972C21.7228 15.3653 21.7969 15.1865 21.7969 15C21.7969 14.8135 21.7228 14.6347 21.5909 14.5028C21.4591 14.371 21.2802 14.2969 21.0938 14.2969Z"
                  />
                </svg>
              </button>
            </div> --> */}
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561128/fa2c7ff65559a8e82e6c274c98b05531.webp" />
            {/* <!-- <img src="тест1.png" /> --> */}
            <p class="name">Молчаливый Биф</p>
            <p class="count">x6</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561135/47863ad8ccdc21a5e10a9c5798de8cae.webp" />
            <p class="name">Джонни Пеперони</p>
            <p class="count">x2</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3560934/5a51e435dbb64fc64639ec8289fdbd6b.webp" />
            <p class="name">Цезарь</p>
            <p class="count">x1</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561133/ea46c36e8da15590d201654cb15f1886.webp" />
            <p class="name">Мексиканская</p>
            <p class="count">x1</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561126/24c3fcfe78e0088c6ffc0da2db233c9f.webp" />
            <p class="name">Барбекю</p>
            <p class="count">x2</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561145/e3dd9a2fb75a360bbdc215578b53e916.webp" />
            <p class="name">Чикензилла</p>
            <p class="count">x1</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3560905/3e0e2a55a07031bcfbf2a62812ded47d.webp" />
            <p class="name">Легенда Норвегии</p>
            <p class="count">x2</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561132/d2848597f1f1b54fff1e216f5a711c66.webp" />
            <p class="name">Гавайская</p>
            <p class="count">x1</p>
          </div>

          <div class="basket_detail_item">
            <img src="https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561167/710f78519b1eaf2e7a79dee94bbd4129.webp" />
            <p class="name">Цезарь с креветками</p>
            <p class="count">x2</p>
          </div>
          <div class="basket_detail_item basket_add_item">
            <button onClick={addItemHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                <use xlinkHref="#plus"></use>
              </svg>
            </button>
            <p class="name">Добавить</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasketDetail;
