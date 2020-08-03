import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, Details } from "./pages";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/products/:id"} component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
