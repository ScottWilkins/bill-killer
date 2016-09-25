import React, { Component } from 'react';
import logo from '../assets/money.svg';

class Logo extends Component {
  render() {
    return <img className="logo"
      alt="Logo"
      src={logo} />
  }
}

export default Logo;
