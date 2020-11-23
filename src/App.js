import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, Details, CreateUpdate } from "./pages";
import Header from "./pages/Home/Header";
import { Checkout, Cart } from "./pages/Payment";

import { withAuthenticator } from "@aws-amplify/ui-react";
function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/products/:id"} component={Details} />
        <Route exact path={"/products/"} component={CreateUpdate} />
        <Route exact path={"/checkout/"} component={Checkout} />
        <Route exact path={"/cart/"} component={Cart} />

        {/* <Route exact path={"/cart/:id"} component={Cart} />
        <Route exact path={"/cart/"} component={Cart} />
        <Route exact path={"/history/:id"} component={History} />
        <Route exact path={"/history/"} component={History} />
        <Route exact path={"/wishes/:id"} component={Wishes} />
        <Route exact path={"/wishes/"} component={Wishes} /> */}

        {/* <Route exact path={"/products/"} component={() => Details} /> */}
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
