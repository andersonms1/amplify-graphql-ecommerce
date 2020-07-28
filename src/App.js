import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./pages";

function App() {
  function render() {
    return (
      <div>
        <h1>ANDERSON</h1>
      </div>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Home} />
        <Route exact path={"/items/10"} component={render} />
      </Switch>
    </Router>
  );
}

export default App;
