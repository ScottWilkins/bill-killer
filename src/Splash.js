import React, { Component } from 'react';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import TryOut from './components/TryOut'

import './App.css';



class Splash extends Component {

  render() {
    return (
      <div className="container splash">
        <Navbar />
        <div className="splash-div">
          <div className="title-div">
            <h1>FairShare</h1>
          </div>
          <Logo />
        </div>
        <div className="spacer"></div>
        <div className="bullets-div">
          <h5><i className="fa fa-plus-circle"></i> Fairshare lets you split costs with friends</h5>
          <h5><i className="fa fa-plus-circle"></i> Perfect for roommates and camping trips</h5>
          <h5><i className="fa fa-plus-circle"></i> Weights allow children to be included or partners who share an account</h5>
          <h5><i className="fa fa-plus-circle"></i> Split costs evenly and efficiently</h5>
          <h5><i className="fa fa-plus-circle"></i> Work together on an event or separately with realtime updates</h5>
          <h5><i className="fa fa-plus-circle"></i> Save your events by signing up!</h5>
          <TryOut />
        </div>
      </div>
  );
  }
}

export default Splash;
