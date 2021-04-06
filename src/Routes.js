import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './Pages/Main/Main';
import Login from './Pages/Login/Login';
import Header from './Components/Header/Header';
import Register from './Pages/Register/Register';

function App(props) {
  return (
    <Router>
      <Header component={Header} />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/main/items/:id" component={Main} />
      </Switch>
    </Router>
  );
}

export default App;
