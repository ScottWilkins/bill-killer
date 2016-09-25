import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Main from './Main';
import './index.css';
import { browserHistory } from 'react-router'
import {Router, Route} from "react-router"
const app = (
  <Router history={browserHistory}>
    <Route path="/" component={Main} />
    <Route path="/signup" component={Signup} />
  </Router>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
