import React from "react";
import ReactDOM from "react-dom";
import "./css/bootstrap-grid.min.css";
import "./index.css";

import { createStore } from "redux";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";

import App from "./App";

import postReducer from "./redux/reducers/postReducer";
const store = createStore(postReducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
