import React, { Component } from 'react';
import Logo from './components/Logo';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import BillForm from './components/BillForm';
import EventForm from './components/EventForm';
import Bill from './components/Bill';
import cookie from 'react-cookie';
import './App.css';
import _ from 'lodash';
var app = require('./components/Firebase');



class Main extends Component {
  constructor (){
    super()
    this.state = {
      billTotal: 0,
      bills: [],
      currentEvent: "",
      events: ""
    }
    this._addBill = this._addBill.bind(this);
    this._deleteBill = this._deleteBill.bind(this);
    this._deletePayment = this._deletePayment.bind(this);
    this._onAdd = this._onAdd.bind(this);
    this._clearBills = this._clearBills.bind(this);
    this._addEvent = this._addEvent.bind(this);
    this._renderEventForm = this._renderEventForm.bind(this);

  }
  _deleteBill(bill, totalArray){
    const total = totalArray.length > 0 ? totalArray.reduce((a,b) => {
      return a+ +b.payment},0) : 0;

    const totalBill = this.state.billTotal - total
    const bills = [...this.state.bills]
    const billIndex = bills.indexOf(bill);
    bills.splice(billIndex,1)
    this.setState({
      bills,
      billTotal: totalBill
    })
}
  _clearBills(){
    this.setState({
      billTotal: 0,
      bills: [],
      currentEvent: "",
      events: ""
    })
  }
  _deletePayment(amount){
    const totalBill = this.state.billTotal - +amount
    this.setState({
      billTotal: totalBill
    })
}
  _getBills(){
    let numOfUsers = this.state.bills.reduce((tally,num)=>{
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
          numberOfUsers={numOfUsers}
          />
      );
    });
}
  _onAdd(number,idNum,description){
    //console.log(description);
    const idx = _.findIndex(this.state.bills, function(bill) { return bill.id === idNum })
    //this.state.bills[idx].total
    const bills = [...this.state.bills]
    const totalBill = this.state.billTotal + +number
    bills[idx].total.push({payment: +number, description: description});
    this.setState({
    bills,
    billTotal: totalBill
  })

  }
  _addEvent (event, date, permissions) {
    if(!event){
      alert("Please enter an event name");
      return;
    } else if(!date){
      alert("please enter a date")
      return;
    };
    var eventId = Date.now()

    app.database().ref('events/' + eventId).set({
      owner: cookie.load('FairShareUserId'),
      event,
      date
  }).then( () => {
    var eventRef = app.database().ref('events/' + eventId);
    eventRef.on('child_added', (snapshot) => {
            this.setState({
            events: snapshot.val(),
            currentEvent: eventId
          });

        })

  }).then( () => {
    const userId = cookie.load('FairShareUserId');

    app.database().ref("users/" + userId + "/events").push(

      {
        eventId: eventId,
        eventName: event,
        eventDate: date
      }
  );
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
_renderEventForm(){
  var name = cookie.load('FairShareName')
  if(name !== "undefined" && name !== "guest" && this.state.currentEvent === "")
 {
   return <EventForm addEvent={this._addEvent}/>
 } else {
   return "";
 }

}
  render() {
    const bills = this._getBills() || [];
    const eventform = this._renderEventForm();
    return (
      <div className="container">
        <Navbar clearBills={this._clearBills}/>
        <div className="splash-div">
          <div className="title-div">
            <h1>FairShare</h1>
          </div>
          <Logo />
        </div>
            <h4 className="motto-txt">Who Owes What</h4>
        <div className="how-to-div">
          <Calculator />
          <div style={{display:"flex"}}>
            <BillForm addBill={this._addBill}/>
            {eventform}
          </div>
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
  componentWillMount(){
    // var eventRef = app.database().ref('events/' + this.state.currentEvent);
    // eventRef.on('child_added', (snapshot) => {
    //       if(this.state.currentEvent !== "") {
    //         this.setState({
    //         events: snapshot.val()
    //       });
    //         console.log(this.state.events);
    //       }
    //     })

  }


  componentWillUnmount() {

  }
  componentDidMount(){
    //set database listener here to update state
}
}

export default Main;
