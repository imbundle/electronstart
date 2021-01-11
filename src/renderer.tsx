import React from "react";

import { hydrate, render } from "react-dom";
import store from "@/app/redux/store/index";

import App from "@/app/app";

const rootElement = document.getElementById("root") as HTMLElement;

async function start() {
  if (rootElement.hasChildNodes()) {
    hydrate(<App store={store} />, rootElement);
  } else {
    render(<App store={store} />, rootElement);
  }
}
start();
