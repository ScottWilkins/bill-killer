import React, { Component } from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import smiley from '../assets/smiley.svg';
var app = require('./Firebase');

class Navbar extends Component {
  constructor () {
    super();
    const name = cookie.load('FairShareName');
    this.state={user: name,
        events: ""
    }
    this._determineUser = this._determineUser.bind(this);
    this._logout = this._logout.bind(this);
    this._getEvents = this._getEvents.bind(this);
    this._handleLoadEvent = this._handleLoadEvent.bind(this)
  }
  _handleLoadEvent(id,e){
    e.preventDefault();
    this.props.loadEvent(id)
  }
  _determineUser(){
    const name = cookie.load('FairShareName');
    if (name === "undefined" || name === "guest") {
      return (
        <div className="login-signup-buttons-div">
          <Link className="link" to="/Login"><button className="login-btn">Log In</button> </Link>
            <h3 style={{textDecoration: "none"}}>&nbsp; or &nbsp; </h3>
          <Link className="link" to="/Signup"><button className="signup-btn">Sign Up</button></Link>
        </div>
      )
    } else {
      const events = this._getEvents() || [];

      return (
        <div className="determine-name-div">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown"><img className="smiley-img" src={smiley} alt="smileyface"/> {name}
              </button>
              <ul className="dropdown-menu">
                <li onClick={this._logout} style={{color: "#000", cursor: "pointer"}}>Log Out</li>
              </ul>
            </div>
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">My Events
              </button>
              <ul className="dropdown-menu">
                {events}
              </ul>
            </div>
        </div>
      )
    }
  }
  _getEvents(){
      var events = this.state.events;
   return Object.keys(events).map((event) => {
      var id = events[event].eventId
      return (

        <li key={id}
            style={{color: "#000", cursor: "pointer"}}
             >
            <a href="#" onClick={(e) => this._handleLoadEvent(id,e)}>{events[event].eventDate} {events[event].eventName}</a>
        </li>
      )
    })
  }
  _logout () {
    this.setState({
      user: "guest"
    })
      cookie.save("FairShareName", "guest");
      cookie.remove("FairShareUserId");
      this.props.clearBills()
  }
  componentWillMount(){
    const userId = cookie.load('FairShareUserId');
    app.database().ref('users/' + userId).on('value', (snapshot) => {
       var eventsList = snapshot.child("events").val();
       //console.log(eventsList);
       this.setState({
         events: eventsList
       })
     })
  }
  render () {
    const user = this._determineUser()
    return (
      <div className="navbar-div">
        <Link className="link" to="/">Home</Link>
        <Link className="link" to="/splash">About</Link>
        {user}
      </div>
    )
  }
}
export default Navbar;
