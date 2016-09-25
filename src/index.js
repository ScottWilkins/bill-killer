import React from 'react';
import ReactDOM from 'react-dom';
import Splash from './Splash';
import Signup from './Signup';
import Main from './Main';
import './index.css';
import { browserHistory } from 'react-router'
import {Router, Route} from "react-router"
const app = (
  <Router history={browserHistory}>
    <Route path="/" component={Splash} />
    <Route path="/signup" component={Signup} />
    <Route path="/main" component={Main} />
  </Router>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
