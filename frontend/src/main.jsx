import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: rootReducer,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>
);
