import React, { Component } from 'react';
import Logo from './components/Logo'; // Import a component from another file

class Main extends Component {
  render() {
    return <Logo className="logo" color="blue" source="./assets/swords.svg" />;
  }
}

export default Main;
