import { useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CreateBasket from "./pages/CreateBasket/CreateBasket.jsx";
import BasketList from "./pages/BasketList/BasketList.jsx";
import BasketDetail from "./pages/BasketDetail/BasketDetail.jsx";
import Shop from "./pages/Shop/Shop.jsx";
import { useSelector, useDispatch } from "react-redux";
import { PAGE } from "./slices/appSlice.js";
import Backend from "./api/backend.js";
import { setCurrentUserId } from "./slices/appSlice.js";
import { BrowserRouter, Routes, Route } from "react-router";

var useFirstLoadData = () => {
  var dispatch = useDispatch();
  useEffect(() => {
    var user = window?.Telegram?.WebApp?.initDataUnsafe?.user;
    Backend.createUser({
      first_name: user?.first_name,
      last_name: user?.last_name,
      photo_url: user?.photo_url,
      telegram_id: user?.id,
      username: user?.username,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCurrentUserId(data?.id));
      });

    console.log({ start_param: window?.Telegram?.WebApp?.initDataUnsafe?.start_param });
  }, []);
};

function App() {
  useFirstLoadData();
  var currentPage = useSelector((state) => state.appSlice.currentPage);

  // useEffect(() => {
  //   window.addEventListener("unload", () => {
  //     window.location.replace("https://yakomazovpavel.github.io/vaffel/dist/index.html");
  //     // localStorage.setItem("store", JSON.stringify(store.getState()));
  //     // window?.Telegram?.WebApp?.DeviceStorage?.
  //   });
  // }, []);

  return (
    <BrowserRouter basename="/vaffel/dist">
      <Routes>
        <Route path="/" element={<CreateBasket />} />
        <Route path="/index.html" element={<CreateBasket />} />
        <Route path="/baskets/" element={<BasketList />} />
        <Route path="/baskets/:basketId/" element={<BasketDetail />} />
        <Route path="/baskets/:basketId/menu/" element={<BasketDetail />} />
        <Route path="/dish/:dishId/" element={<BasketDetail />} />
      </Routes>
    </BrowserRouter>
    // <>
    //   {currentPage === PAGE.CreateBasket && <CreateBasket />}
    //   {currentPage === PAGE.BasketList && <BasketList />}
    //   {currentPage === PAGE.BasketDetail && <BasketDetail />}
    //   {currentPage === PAGE.Shop && <Shop />}
    // </>

    // <Shop></Shop>
    // <CreateBasket></CreateBasket>
    // <BasketDetail></BasketDetail>
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    // </>
  );
}

export default App;
