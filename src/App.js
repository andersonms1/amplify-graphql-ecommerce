import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Header, Details, CreateUpdate } from "./pages";

import { withAuthenticator } from "@aws-amplify/ui-react";
import { createBrowserHistory } from "history";
// const { Header, Details, CreateUpdate } = lazy(() => import("./pages"));

function App() {
  const history = createBrowserHistory({
    basename: "",
    forceRefresh: false,
  });
  return (
    <Router history={history}>
      <Switch>
        <Suspense fallback={<h1>Rendering...</h1>}>
          <Route exact path={"/"} component={Header} />
          <Route exact path={"/products/:id"} component={Details} />
          <Route exact path={"/products/"} component={Details} />
        </Suspense>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
