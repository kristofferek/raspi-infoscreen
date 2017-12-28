import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";

ReactDOM.render(
  <App/>,
  document.getElementById("root") // eslint-disable-line no-undef
);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
