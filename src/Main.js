import React, { Component } from 'react';
import Logo from './components/Logo';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import BillForm from './components/BillForm';
import Bill from './components/Bill';
import './App.css';
import _ from 'lodash';

class Main extends Component {
  constructor (){
    super()
    this.state = {
      billTotal: 0,
      bills: [],
    }
    this._addBill = this._addBill.bind(this);
    this._deleteBill = this._deleteBill.bind(this);
    this._deletePayment = this._deletePayment.bind(this);
    this._onAdd = this._onAdd.bind(this);
  }
  _deleteBill(bill, totalArray){

    const total = totalArray.length > 0 ? totalArray.reduce((a,b) => a+b) : 0;
    const totalBill = this.state.billTotal - total
    const bills = [...this.state.bills]
    const billIndex = bills.indexOf(bill);
    bills.splice(billIndex,1)
    this.setState({
      bills,
      billTotal: totalBill
    })
}
  _deletePayment(amount){
console.log(this.state.billTotal);
    const totalBill = this.state.billTotal - +amount
    this.setState({
      billTotal: totalBill
    })
}
_getBills(){
  let nOF = this.state.bills.reduce((tally,num)=>{
    return tally + +num.weight
  },0);
  return this.state.bills.map((bill) => {
    return (

      <Bill
        {...bill}
        total={bill.total}
        key={bill.id}
        bill={bill}
        onDelete={this._deleteBill}
        onDeletePayment={this._deletePayment}
        onAdd={this._onAdd}
        billTotal={this.state.billTotal}
        numberOfUsers={nOF}
        />
    );
  });
}
  _onAdd(number,idNum){
    const idx = _.findIndex(this.state.bills, function(bill) { return bill.id === idNum })
    this.state.bills[idx].total
    const bills = [...this.state.bills]
    const totalBill = this.state.billTotal + +number
    bills[idx].total.push(+number)

      this.setState({
    bills,
    billTotal: totalBill
  })

  }
  _addBill(name, weight) {
  if(!name){
    alert("Please enter a name");
    return;
  }
  const bill = {
    id: Date.now(),
    name,
    weight,
    total: []
  };
  this.setState({
    bills: this.state.bills.concat([bill])
  })
}
  render() {
    const bills = this._getBills() || [];
    return (
      <div className="container">
        <Navbar />
        <div className="splash-div">
          <div className="title-div">
            <h1>Bill Kill</h1>
          </div>
          <Logo />
        </div>
            <h4 className="motto-txt">Who Owes What</h4>
        <div className="how-to-div">
          <Calculator />
          <BillForm addBill={this._addBill}/>
          <div className="billTotal-div">
            <h1>Total Bill ${this.state.billTotal.toFixed(2)}</h1>
          </div>
        </div>
        <div className="bill-results-div">
          {bills}
        </div>
      </div>
  );
  }
}

export default Main;
