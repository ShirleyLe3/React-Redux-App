import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = {
  dadJoke: "Why did the tomato blush? Because it saw the salad dressing.",
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DAD_JOKE_PENDING":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_DAD_JOKE_SUCCESS":
      return {
        ...state,
        dadJoke: action.payload,
        isLoading: false,
      };
    case "FETCH_DAD_JOKE_ERROR":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
