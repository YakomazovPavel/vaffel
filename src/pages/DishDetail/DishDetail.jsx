import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, useStore } from "react-redux";
import { setCurrentPage, PAGE } from "../../slices/appSlice.js";
import Loader from "../../components/Loader.jsx";
import Backend from "../../api/backend.js";
import "./DishDetail.scss";

var useGetDishDetail = ({ dishId }) => {
  var [isLoading, setIsLoading] = useState(true);
  var [dish, setDish] = useState();
  useEffect(() => {
    Backend.getDishDetail({ dishId })
      .then((response) => response.json())
      .then((data) => {
        console.log({ data });

        setDish(data);
      })
      .then(() => {
        setIsLoading(false);
      });
  }, []);
  return [isLoading, dish];
};

var DishDetail = () => {
  var dishId = useSelector((state) => state.appSlice.currentDishId);
  console.log({ dishId });
  var [isLoading, dish] = useGetDishDetail({ dishId });
  console.log({ isLoading, dish });

  var dispatch = useDispatch();
  var backButtonHandler = () => {
    dispatch(setCurrentPage(PAGE.Shop));
  };

  var open = () => {
    window.Telegram.WebApp.MainButton.hide();
    window.Telegram.WebApp.BackButton.show();
    window.Telegram.WebApp.BackButton.onClick(backButtonHandler);
  };

  var close = () => {
    window.Telegram.WebApp.BackButton.offClick(backButtonHandler);
  };

  useEffect(() => {
    open();
    return close;
  }, []);
  return (
    <>
      {isLoading ? <Loader style={{ left: "calc(50% - 20px)" }} /> : <div className="page_dish_detail">{dishId}</div>}
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
