import React, { Component } from 'react';
import Logo from './components/Logo';
import Calculator from './components/Calculator';
import Navbar from './components/Navbar';
import BillForm from './components/BillForm';
import EventForm from './components/EventForm';
import Bill from './components/Bill';
import AddFriend from './components/AddFriend';
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
    this._convertBillToObject = this._convertBillToObject.bind(this);
    this._convertBillToArray = this._convertBillToArray.bind(this);
    this._totalBill = this._totalBill.bind(this);
    this._loadEvent = this._loadEvent.bind(this);
    this._setBillStateToFirebase = this._setBillStateToFirebase.bind(this);
    this._addFriend = this._addFriend.bind(this);

  }
  _convertBillToObject(bill){
    return bill.reduce((obj,item,idx) => {
      obj[idx]={id:item.id, weight:item.weight, name:item.name, total: item.total.reduce((o,it,x)=>{
        o[x]={description:it.description, payment:it.payment};
        return o;
      },{})}
      return obj
    },{})
  }
  _convertBillToArray(bill){
    return Object.keys(bill).reduce((arr,item,idx) => {
      var temp = {};
      temp.id=bill[item].id;
      temp.name=bill[item].name;
      temp.weight=bill[item].weight;
      var temp2 = bill[item].total || []
      temp.total = Object.keys(temp2).reduce((ar,it,ix) => {
        ar.push(temp2[it])
        return ar;
      },[])
      arr.push(temp)
      return arr;
    },[])
  }
  _deleteBill(bill, totalArray){
    const bills = [...this.state.bills]
    const billIndex = bills.indexOf(bill);
    bills.splice(billIndex,1)
    this.setState({
      bills
    }, () => {
      this._setBillStateToFirebase()
      this._totalBill()

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
  //redo Delete so total is affected
  _deletePayment(amount){
    const totalBill = this.state.billTotal - +amount
    this.setState({
      billTotal: totalBill
    },()=>{
      this._setBillStateToFirebase()
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
  _totalBill(){
    var total = 0
    this.state.bills.forEach((a)=>{
      if(a.total.length === 0) return;
      return a.total.forEach(b => {
        total += b.payment
      })
    })
    this.setState({
      billTotal: total
    })
  }
  _onAdd(number,idNum,description){
    const idx = _.findIndex(this.state.bills, function(bill) { return bill.id === idNum })
    //this.state.bills[idx].total
    const bills = [...this.state.bills]
    bills[idx].total.push({payment: +number, description: description});
    this.setState({
    bills
  })
  this._totalBill();
  this._setBillStateToFirebase()
  }
  _setBillStateToFirebase(){
    var eventId = this.state.currentEvent;
    if(!eventId) return;

    var bills = this._convertBillToObject(this.state.bills);
    app.database().ref('events/' + eventId).set({
      bills
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
    var billArray = this.state.bills;
    var bills = this._convertBillToObject(billArray);
    app.database().ref('events/' + eventId).set({
      owner: cookie.load('FairShareUserId'),
      event,
      date,
      bills
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
  },() => {
    this._setBillStateToFirebase()
  })
}
_addFriend(email){
  if(!email){
    alert("Please enter a valid email. The person you invite must sign up with FairShare first.");
          return;
  }

    var user = cookie.load("FairShareUserId")
    var eventId = this.state.currentEvent
    console.log(eventId);
    app.database().ref('users/' + user + '/events').orderByChild("eventId").equalTo(eventId).once('value', (snapshot) => {
      var event = Object.keys(snapshot.val())[0]
      var eventName = snapshot.val()[event].eventName
      var eventDate = snapshot.val()[event].eventDate
      app.database().ref('users').orderByChild("email").equalTo(email).once('value', (snap) => {
          var userId = Object.keys(snap.val())[0]
          var obj = {eventDate, eventId, eventName}

           //console.log(newPostKey);
          app.database().ref('users/' + userId + '/events/' + event).set(obj);
    });

});
}
_renderEventForm(){
  var name = cookie.load('FairShareName')
  if(name !== "undefined" && name !== "guest" && this.state.currentEvent === "")
 {
   return <EventForm addEvent={this._addEvent}/>
 } else if(this.state.currentEvent !== "") {
   return <AddFriend addFriend={this._addFriend}/>;
 } else {
   return "";
 }
}
  _loadEvent(id){
    app.database().ref('events/' + id +'/bills').on('value', (snapshot) => {
              var bills = this._convertBillToArray(snapshot.val())
              this.setState({
              bills: bills,
              currentEvent: id
            }, () => {
              this._totalBill();
            });
          })

  }
  render() {
    const bills = this._getBills() || [];
    const eventform = this._renderEventForm();
    return (
      <div className="container">
        <Navbar clearBills={this._clearBills}
                loadEvent={this._loadEvent}/>
        <div className="splash-div">
          <div className="title-div">
            <h1>FairShare</h1>
          </div>
          <Logo />
        </div>
        <div className="spacer-main"></div>
        <div className="how-to-div">

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

  componentDidMount(){
    var eventId = this.state.currentEvent
    if(!eventId) return;
    app.database().ref('events/'+ eventId).on('value', (snapshot) => {
            var bills = this._convertBillToArray(snapshot.val())
            this.setState({
            bills: bills
          });

          this._totalBill();
        })
}
}

export default Main;
