import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";

// Эта структура данных строится из иформации о том какие блюда есть и о том, что уже есть в корзине
var mockShopListData = [
  {
    id: "1",
    name: "Сырные вафли",
    count: 1,
    dishes: [
      {
        id: "1",
        category_id: "1",
        name: "Барбекю",
        description:
          "Котлета из говядины, жареный бекон, сыр чеддер, айсберг, маринованные огурец и красный лук, соус барбекю, соус сладкая аджика, картофельное тесто (мука пшеничная, картофель, лук репчатый, яйцо куриное, молоко,, соль, специи",
        price: "540",
        calories: "206.6",
        proteins: "6.6",
        fats: "13.1",
        carbs: "15.6",
        weight: "350",
        photo_url:
          "https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561134/56c41996237e9cc6ef75fcb48d671352.webp",
        count: 1,
      },
      {
        id: "2",
        category_id: "1",
        name: "Индиана Джонс",
        description:
          "Запеченное куриное филе, сыр чеддер, яблоко, руккола, домашний майонез, соус брусничный, картофельное тесто (мука пшеничная, картофель, лук репчатый, яйцо куриное, молоко,, соль, специи)",
        price: "510",
        calories: "191",
        proteins: "7.1",
        fats: "12",
        carbs: "13.5",
        weight: "380",
        photo_url:
          "https://53a7276f-d68f-462e-a2bf-df223e005be4.selstorage.ru/uploads/media/photo/3561136/6d384469f83aa62fc707807d122aaa9d.webp",
        count: 0,
      },
    ],
  },
];

function Shop() {
  const dispatch = useDispatch();
  const [shopListData, setShopListData] = useState(mockShopListData);
  const [searchShopListData, setSearchShopListData] = useState(shopListData);
  console.log("searchShopListData5", searchShopListData);

  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.BasketDetail));
  };

  var open = () => {
    window.Telegram.WebApp.MainButton.hide();
    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(backButtonHandler);
  };

  var close = () => {
    window.Telegram.WebApp.BackButton.offClick(backButtonHandler);
  };

  var searchHandler = (e) => {
    var value = e.target.value.trim();
    if (value) {
      var copyShopListData = structuredClone(shopListData)
        .map((category) => {
          category.dishes = category.dishes.filter((dish) => dish?.name.includes(value));
        })
        .filter((category) => !!category?.dishes?.length);

      setSearchShopListData(copyShopListData);
    } else {
      setSearchShopListData(shopListData);
    }
  };

  useEffect(() => {
    open();
    return close;
  }, []);
  return (
    <div id="page_basket_shop">
      <div className="settings_wrap">
        <div className="basket_shop searchline">
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5359 23.0718C9.25431 23.0718 7.02396 22.3952 5.1269 21.1276C3.22983 19.86 1.75125 18.0584 0.878122 15.9505C0.00499832 13.8426 -0.223451 11.5231 0.221664 9.28535C0.666779 7.04761 1.76547 4.99211 3.37879 3.37879C4.99211 1.76547 7.04761 0.666779 9.28535 0.221664C11.5231 -0.223451 13.8426 0.00499832 15.9505 0.878122C18.0584 1.75125 19.8601 3.22983 21.1276 5.1269C22.3952 7.02396 23.0718 9.25431 23.0718 11.5359C23.0718 13.0508 22.7734 14.5509 22.1937 15.9505C21.6139 17.3501 20.7642 18.6218 19.693 19.693C18.6218 20.7642 17.3501 21.6139 15.9505 22.1937C14.5509 22.7734 13.0508 23.0718 11.5359 23.0718ZM11.5359 2.30718C9.71063 2.30718 7.92635 2.84844 6.4087 3.8625C4.89104 4.87656 3.70818 6.31789 3.00968 8.00422C2.31118 9.69054 2.12842 11.5461 2.48451 13.3363C2.8406 15.1265 3.71955 16.7709 5.01021 18.0616C6.30087 19.3522 7.94527 20.2312 9.73546 20.5873C11.5257 20.9434 13.3812 20.7606 15.0676 20.0621C16.7539 19.3636 18.1952 18.1807 19.2093 16.6631C20.2233 15.1454 20.7646 13.3612 20.7646 11.5359C20.7646 9.08829 19.7923 6.74093 18.0616 5.01021C16.3309 3.27949 13.9835 2.30718 11.5359 2.30718Z" />
            <path d="M28.8397 29.9937C28.6878 29.9946 28.5373 29.9655 28.3968 29.9081C28.2562 29.8507 28.1284 29.7661 28.0206 29.6592L18.7919 20.4305C18.6843 20.3229 18.599 20.1952 18.5408 20.0547C18.4826 19.9142 18.4526 19.7635 18.4526 19.6114C18.4526 19.4593 18.4826 19.3087 18.5408 19.1682C18.599 19.0276 18.6843 18.8999 18.7919 18.7924C18.8995 18.6848 19.0271 18.5995 19.1677 18.5413C19.3082 18.4831 19.4588 18.4531 19.6109 18.4531C19.7631 18.4531 19.9137 18.4831 20.0542 18.5413C20.1947 18.5995 20.3224 18.6848 20.43 18.7924L29.6587 28.0211C29.7668 28.1283 29.8526 28.2559 29.9112 28.3965C29.9698 28.5371 29.9999 28.6879 29.9999 28.8401C29.9999 28.9924 29.9698 29.1432 29.9112 29.2838C29.8526 29.4244 29.7668 29.5519 29.6587 29.6592C29.5509 29.7661 29.4231 29.8507 29.2825 29.9081C29.142 29.9655 28.9915 29.9946 28.8397 29.9937Z" />
          </svg>
          <input type="text" placeholder="Поиск" id="shop_searchline" onChange={searchHandler} />
        </div>
        {!!searchShopListData.length ? (
          <>
            {searchShopListData.map((category) => (
              <div className="basket_shop_section" key={`category_${category.id}`}>
                <input className="hide" type="checkbox" name="my_basket" value="value" id={`category_${category.id}`} />
                <label htmlFor={`category_${category.id}`}>
                  <div>
                    <p>{category.name}</p>
                    <span>{category.count}</span>
                  </div>
                  <svg className="arrow_down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129">
                    <use xlinkHref="#arrow"></use>
                  </svg>
                </label>
                {category.dishes.map((dish) => (
                  // <div>{dish?.name}</div>
                  <Dish dish={dish} />
                ))}
              </div>
            ))}
          </>
        ) : (
          <div id="not_found">
            <img src="spider-crawl-folder.gif" />
            <h1>Безрезультатно</h1>
            <h2>Поробуйте что-то другое</h2>
          </div>
        )}
      </div>
    </div>
  );
}

var Dish = ({ dish }) => {
  return (
    <div className="basket_shop_item" key={`category_${category.id}_dish_${dish?.id}`}>
      <div className="header">
        <input
          className="hide"
          type="checkbox"
          name={`category_${category.id}_dish_${dish?.id}`}
          value="value"
          id={`category_${category.id}_dish_${dish?.id}`}
        />
        <label htmlFor={`category_${category.id}_dish_${dish?.id}`}>
          <img src={dish?.photo_url} />
          <p>{dish?.count}</p>
        </label>
        <div className="short_description">
          <h1>{dish?.name}</h1>
          <h2>{dish?.weight}</h2>
        </div>
        <div className="control">
          <button>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref="#circle_minus"></use>
            </svg>
          </button>
          <button>
            <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
              <use xlinkHref="#circle_plus"></use>
            </svg>
          </button>
        </div>
      </div>
      <div className="description">
        <div className="description_header">
          <div className="name_wrap">
            <h1>{dish?.name}</h1>
            <p>{dish?.count}</p>
          </div>

          <div className="description_header_control">
            <button>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="#circle_minus"></use>
              </svg>
            </button>
            <button>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="" xmlns="http://www.w3.org/2000/svg">
                <use xlinkHref="#circle_plus"></use>
              </svg>
            </button>
          </div>
        </div>
        <p>{dish?.description}</p>

        <div className="description_header_components">
          <div>
            <h3>В 100 г</h3>
            <p>{dish}</p>
          </div>
          <div>
            <h3>Белки</h3>
            <p>{dish?.proteins}</p>
          </div>
          <div>
            <h3>Жиры</h3>
            <p>{dish?.fats}</p>
          </div>
          <div>
            <h3>Углеводы</h3>
            <p>{dish?.carbs}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
