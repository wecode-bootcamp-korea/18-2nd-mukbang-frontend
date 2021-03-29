import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Pages/Main/Main";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact="/login" component={Login} />
        <Route exact="/main" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
