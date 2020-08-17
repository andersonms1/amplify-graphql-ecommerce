import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Details } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Header} />
        <Route exact path={"/products/:id"} component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
