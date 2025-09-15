import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./slices/index.js";

window.addEventListener("unload", () => {
  // window.location.replace("https://yakomazovpavel.github.io/vaffel/dist/index.html");
  window.location.href = "https://yakomazovpavel.github.io/vaffel/dist/index.html";
  // localStorage.setItem("store", JSON.stringify(store.getState()));
  // window?.Telegram?.WebApp?.DeviceStorage?.
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
