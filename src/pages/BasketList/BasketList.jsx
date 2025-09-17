import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, PAGE, setCurrentBasketId } from "../../slices/appSlice.js";
import Backend from "../../api/backend.js";
import Loared from "../../components/Loader.jsx";

var useGetBasketList = (userId) => {
  var [isLoading, setIsLoading] = useState(true);
  var [basketList, setBasketList] = useState([]);

  useEffect(() => {
    if (!!userId) {
      Backend.getBasketList({ userId })
        .then((response) => response.json())
        .then((data) => {
          setBasketList(data);
          setTimeout(() => {
            setIsLoading(false);
          }, 400);
        });
    }
  }, []);
  return [basketList, isLoading];
};

var computingBaskets = (initialBaskets, userId) => {
  var newBasketListData = { my: [], other: [] };
  for (var basket of initialBaskets) {
    basket.author_id === userId ? newBasketListData.my.push(basket) : newBasketListData.other.push(basket);
  }
  return newBasketListData;
};

var filteringBaskets = (basketListData, search) => {
  var res;
  if (search) {
    var baskets = structuredClone(basketListData);
    baskets.my = baskets.my.filter((item) => item.name.includes(search));
    baskets.other = baskets.other.filter((item) => item.name.includes(search));
    res = baskets;
  } else {
    res = basketListData;
  }
  return res;
};

function BasketList() {
  console.count("BasketList");

  var dispatch = useDispatch();
  var userId = useSelector((state) => state.appSlice.userId);
  var [basketList, isLoading] = useGetBasketList(userId);
  console.log("BasketList", { isLoading });

  var [search, setSearch] = useState("");
  var baskets = filteringBaskets(computingBaskets(basketList, userId), search);

  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.CreateBasket));
  };

  var mainButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.CreateBasket));
  };

  var open = () => {
    window.Telegram.WebApp.BackButton.show();
    // window.Telegram.WebApp.BackButton.isVisible = true;
    window.Telegram.WebApp.BackButton.onClick(backButtonHandler);

    window.Telegram.WebApp.MainButton.text = "Создать корзину";
    window.Telegram.WebApp.MainButton.show();
    // window.Telegram.WebApp.MainButton.isVisible = true;
    // window.Telegram.WebApp.MainButton.isActive = true;
    window.Telegram.WebApp.MainButton.onClick(mainButtonHandler);
  };

  var close = () => {
    window.Telegram.WebApp.BackButton.offClick(backButtonHandler);
    window.Telegram.WebApp.MainButton.offClick(mainButtonHandler);
    window.Telegram.WebApp.MainButton.hide();
  };

  useEffect(() => {
    return close;
  }, []);

  useEffect(() => {
    if (!isLoading) {
      open();
    }
  }, [isLoading]);

  var searchHandler = (e) => {
    setSearch(e.target.value.trim());
  };

  var openBasketHandler = (basketId) => {
    dispatch(setCurrentBasketId(basketId));
    dispatch(setCurrentPage(PAGE.BasketDetail));
  };

  return (
    <>
      {isLoading ? (
        <Loared style={{ left: "calc(50% - 20px)" }} />
      ) : (
        <div id="page_basket_list">
          <div className="settings_wrap">
            <div className="basket_shop searchline">
              <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5359 23.0718C9.25431 23.0718 7.02396 22.3952 5.1269 21.1276C3.22983 19.86 1.75125 18.0584 0.878122 15.9505C0.00499832 13.8426 -0.223451 11.5231 0.221664 9.28535C0.666779 7.04761 1.76547 4.99211 3.37879 3.37879C4.99211 1.76547 7.04761 0.666779 9.28535 0.221664C11.5231 -0.223451 13.8426 0.00499832 15.9505 0.878122C18.0584 1.75125 19.8601 3.22983 21.1276 5.1269C22.3952 7.02396 23.0718 9.25431 23.0718 11.5359C23.0718 13.0508 22.7734 14.5509 22.1937 15.9505C21.6139 17.3501 20.7642 18.6218 19.693 19.693C18.6218 20.7642 17.3501 21.6139 15.9505 22.1937C14.5509 22.7734 13.0508 23.0718 11.5359 23.0718ZM11.5359 2.30718C9.71063 2.30718 7.92635 2.84844 6.4087 3.8625C4.89104 4.87656 3.70818 6.31789 3.00968 8.00422C2.31118 9.69054 2.12842 11.5461 2.48451 13.3363C2.8406 15.1265 3.71955 16.7709 5.01021 18.0616C6.30087 19.3522 7.94527 20.2312 9.73546 20.5873C11.5257 20.9434 13.3812 20.7606 15.0676 20.0621C16.7539 19.3636 18.1952 18.1807 19.2093 16.6631C20.2233 15.1454 20.7646 13.3612 20.7646 11.5359C20.7646 9.08829 19.7923 6.74093 18.0616 5.01021C16.3309 3.27949 13.9835 2.30718 11.5359 2.30718Z" />
                <path d="M28.8397 29.9937C28.6878 29.9946 28.5373 29.9655 28.3968 29.9081C28.2562 29.8507 28.1284 29.7661 28.0206 29.6592L18.7919 20.4305C18.6843 20.3229 18.599 20.1952 18.5408 20.0547C18.4826 19.9142 18.4526 19.7635 18.4526 19.6114C18.4526 19.4593 18.4826 19.3087 18.5408 19.1682C18.599 19.0276 18.6843 18.8999 18.7919 18.7924C18.8995 18.6848 19.0271 18.5995 19.1677 18.5413C19.3082 18.4831 19.4588 18.4531 19.6109 18.4531C19.7631 18.4531 19.9137 18.4831 20.0542 18.5413C20.1947 18.5995 20.3224 18.6848 20.43 18.7924L29.6587 28.0211C29.7668 28.1283 29.8526 28.2559 29.9112 28.3965C29.9698 28.5371 29.9999 28.6879 29.9999 28.8401C29.9999 28.9924 29.9698 29.1432 29.9112 29.2838C29.8526 29.4244 29.7668 29.5519 29.6587 29.6592C29.5509 29.7661 29.4231 29.8507 29.2825 29.9081C29.142 29.9655 28.9915 29.9946 28.8397 29.9937Z" />
              </svg>
              <input type="text" placeholder="Поиск" onChange={searchHandler} value={search} />
            </div>
            {!!baskets?.my?.length && (
              <div className="basket_list_section">
                <input
                  className="hide"
                  type="checkbox"
                  name="my_basket"
                  value="value"
                  id="my_basket_section"
                  defaultChecked={true}
                />
                <label htmlFor="my_basket_section" className="basket_section_label">
                  <p>Мои корзины</p>
                  <svg className="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                    <use xlinkHref="#arrow"></use>
                  </svg>
                </label>

                {baskets.my.map((basket) => (
                  <div className="basket_list_item" key={basket.id}>
                    <img src={basket.photo_url} />
                    <div>
                      <h1>{basket.name}</h1>
                    </div>
                    <button
                      onClick={() => {
                        openBasketHandler(basket.id);
                      }}
                    >
                      <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <use xlinkHref="#circle_arrow"></use>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!!baskets?.other?.length && (
              <div className="basket_list_section">
                <input
                  className="hide"
                  type="checkbox"
                  name="my_basket"
                  value="value"
                  id="not_my_basket_section"
                  defaultChecked={true}
                />
                <label htmlFor="not_my_basket_section" className="basket_section_label">
                  <p>Доступные мне</p>
                  <svg className="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                    <use xlinkHref="#arrow"></use>
                  </svg>
                </label>

                {baskets.other.map((basket) => (
                  <div className="basket_list_item" key={basket.id}>
                    <img src={basket.photo_url} />
                    <div>
                      <h1>{basket.name}</h1>
                    </div>
                    <button
                      onClick={() => {
                        openBasketHandler(basket.id);
                      }}
                    >
                      <svg className="arrow_rigth" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                        <use xlinkHref="#circle_arrow"></use>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BasketList;
