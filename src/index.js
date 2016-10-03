import React from 'react';
import ReactDOM from 'react-dom';
import Signup from './Signup';
import Login from './Login'
import Main from './Main';
import Splash from './Splash'
import './index.css';
import { browserHistory } from 'react-router'
import {Router, Route} from "react-router"


const checkRole = (nextState, replace)=>{
     if(window.reactCookie.load("FairShareUserId") === undefined) replace('/splash')
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
    <Route path="/splash" component={Splash} />
    <Route path="/login" component={Login} />

  </Router>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
