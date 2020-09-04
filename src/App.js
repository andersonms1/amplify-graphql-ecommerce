import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header, Details, CreateUpdate } from "./pages";

import { withAuthenticator } from "@aws-amplify/ui-react";
// import { history } from "./history";
// const { Header, Details, CreateUpdate } = lazy(() => import("./pages"));
// const { Header } = lazy(import("./pages/Home/Header"));
// const Details = lazy(import("./pages/Products/Details"));
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/products/:id"} component={Details} />
        <Route exact path={"/"} component={Header} />
        {/* <Route exact path={"/products/"} component={() => Details} /> */}
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
