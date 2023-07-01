import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style/index.css";
import "tachyons";
import App from "./App";
//context
import { AuthProvider } from "./context/AuthProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
