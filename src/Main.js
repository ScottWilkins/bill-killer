import React, { Component } from 'react';
import Logo from './components/Logo';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import HowMany from './components/HowMany';
import Bill from './components/Bill';
import './App.css';

class Splash extends Component {
  constructor (){
    super()
    this.state = {
      howMany: 2
    }
    this._updateHowMany = this._updateHowMany.bind(this)
  }
  _updateHowMany(num){
    this.setState({howMany: num})
  }
  _showBills(){
      var hm = this.state.howMany
      var bills = [];
      for (var i = 0; i < hm; i++) {
        bills.push(i)
      }
      return bills.map((bill) => {
        return (
          <Bill
            key={bill}
            />
        );
      });
  }
  render() {
    const bills = this._showBills();
    return (
      <div className="container">
        <Navbar />
        <div className="splash-div">
          <div className="title-div">
            <h1>Bill Kill</h1>
          </div>
          <Logo />
        </div>
            <h4 className="motto-txt">Who Owes What to Who</h4>
        <div className="how-to-div">
          <Calculator />
          <div className="list-steps">
            <HowMany update={this._updateHowMany}/>
            <h2>{this.state.howMany}</h2>
          </div>
          <div className="bills-div">
            {bills}
          </div>
        </div>
      </div>
  );
  }
}

export default Splash;
