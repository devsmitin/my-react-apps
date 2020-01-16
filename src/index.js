import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap-grid.min.css";
import "./index.scss";

import { Provider } from "react-redux";
import store from "./redux/store";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);

serviceWorker.register();
