import React, { Component } from 'react';
import calculator from '../assets/calculator.svg';

class Calculator extends Component {
  render() {
    return <img className="calculator"
      alt="calculator"
      src={calculator} />
  }
}

export default Calculator;
