import React from "react";
import { render } from "react-dom";
import "regenerator-runtime/runtime";
import App from "./App";
import ContextProvider from "./store/Context";
import "./styles/main.scss";

render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.querySelector("#root"),
);
