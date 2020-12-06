import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./pages/Home/Header";
import HeaderNav from "./pages/Home/HeaderNav";
import { Checkout, Cart } from "./pages/Payment";
import { Grid, Cell } from "baseui/layout-grid";
import { Home, Details, CreateUpdate } from "./pages";
import History from "./pages/User/History";

import { withAuthenticator } from "@aws-amplify/ui-react";
function App() {
  const Admin = () => {
    return <div>Admin</div>;
  };

  const User = () => {
    return <div>User</div>;
  };

  return (
    <Router>
      {/* <Grid> */}
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/products/:id"} component={Details} />
        <Route exact path={"/products/"} component={CreateUpdate} />
        <Route exact path={"/checkout/"} component={Checkout} />
        <Route exact path={"/history/:id"} component={History} />
        <Route exact path={"/history/"} component={History} />
        <Route exact path={"/admin"} component={Admin} />
        <Route exact path={"/user"} component={User} />
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
