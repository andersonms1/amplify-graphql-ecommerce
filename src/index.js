import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Amplify from "@aws-amplify/core";
import amplify from "./aws-exports";
// import AppNav from "./AppNav";

import { BaseProvider, LightTheme } from "baseui";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";

import { ProductProvider } from "./context/products";

const engine = new Styletron();
Amplify.configure(amplify);

ReactDOM.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </BaseProvider>
  </StyletronProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
