import React, { Component } from 'react';
import { Router,Route,browserHistory } from 'react-router';

import Home from './containers/Home';
import Login from './containers/Login';
import Notfound from './containers/Notfound';

export default class Routes extends Component {
    render(){
      return(
        <Router history={browserHistory} >
          <Route path="/"           component={Home}/>
          <Route path="/login"      component={Login}/>
          <Route path="/*"          component={Notfound}/>
        </Router>
      )
    }
}

