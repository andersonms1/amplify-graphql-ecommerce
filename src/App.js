import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./pages/Home/Header";
import { Checkout, Cart } from "./pages/Payment";
import { Grid, Cell } from "baseui/layout-grid";
import { Home, CreateUpdate } from "./pages";
import Details from "./pages/Products/Details/Details.js";
import { Bolsas, Calçados } from "./pages/Products/ShowCase/";
import History from "./pages/User/History";
import Orders from "./pages/Orders/Orders";
import OrdersDetails from "./pages/Orders/OrdersDetails";
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
      <Header />
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/calçados"} component={Calçados} />
        <Route exact path={"/bolsas"} component={Bolsas} />
        <Route exact path={"/products/:id"} component={Details} />
        <Route exact path={"/products/"} component={CreateUpdate} />
        <Route exact path={"/checkout/"} component={Checkout} />
        <Route exact path={"/pedidos/"} component={Orders} />
        {/* <Route exact path={"/pedidos/:id"} component={OrdersDetails} /> */}
        <Route exact path={"/admin"} component={Admin} />
        <Route exact path={"/user"} component={User} />
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
