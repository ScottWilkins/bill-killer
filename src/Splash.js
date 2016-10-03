import React, { Component } from 'react';
import Logo from './components/Logo';
import camping from './assets/firecamp.png';
import Navbar from './components/Navbar';

import './App.css';



class Splash extends Component {
  constructor (){
    super()
  }

  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="splash-div">
          <div className="title-div">
            <h1>FairShare</h1>
          </div>
          <Logo />
        </div>
        <img className="camping-img" src={camping} />
            <h4 className="motto-txt">Who Owes What</h4>
        <div className="bullets-div">
          <h5>Fairshare lets you split costs with friends</h5>
          <h5>Perfect for roommates and camping trips</h5>
          <h5>Weights allow children to be included or partners who share an account</h5>
          <h5>Split costs evenly and efficiently</h5>
          <h5>Work together on an event or separately with realtime updates</h5>
          <h5>Pay or get paid directly through Venmo</h5>
        </div>
      </div>
  );
  }
}

export default Splash;
