import React, { Component } from 'react';
import Logo from './components/Logo';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import './App.css';

class Splash extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="splash-div">
          <div className="title-div">
            <h1>Bill Kill</h1>
          </div>
          <Logo />
        </div>
            <h4 className="motto-txt">The Easy Way to Split A Bill</h4>
        <div className="how-to-div">
          <Calculator />
          <div className="list-steps">
            <h4 >1. choose number of ways to split</h4>
            <h4 >2. give each split a name</h4>
            <h4 >3. enter subtotals</h4>
            <h4 >4. choose tax if applicable</h4>
          </div>

        </div>
      </div>
  );
  }
}

export default Splash;
