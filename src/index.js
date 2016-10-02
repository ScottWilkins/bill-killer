import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Main from './Main';
import './index.css';
import { browserHistory } from 'react-router'
import {Router, Route} from "react-router"
import cookie from 'react-cookie';

const checkRole = (nextState, replace)=>{
     if(window.reactCookie.load("userId") === undefined) replace('/signup')
};

// <Route path='/' component={Home} onEnter={checkRole}>
//      <Route path='category' component={About}/>
//       ...
// </Route>
// <Route path='/login' component={Login} />
const app = (
  <Router history={browserHistory}>
    <Route path="/" component={Main} onEnter={checkRole}/>
    <Route path="/signup" component={Signup} />
  </Router>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
