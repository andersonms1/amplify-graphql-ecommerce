import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header, Details, CreateUpdate } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Header} />
        <Route exact path={"/products/:id"} component={Details} />
        <Route exact path={"/products/"} component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
