import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style/index.css";
import "tachyons";
import App from "./App";

import { store } from "./storage/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
