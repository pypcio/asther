import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style/index.css";
import "tachyons";
import App from "./App";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/devtools";
//redux store
import { store } from "./storage/store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
// const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
