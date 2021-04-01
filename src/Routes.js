import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Header from './Components/Header/Header';

function App(props) {
  return (
    <Router>
      <Header component={Header} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
