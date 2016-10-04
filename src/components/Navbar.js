import React, { Component } from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie';
import smiley from '../assets/smiley.svg';

class Navbar extends Component {
  constructor () {
    super();
    const name = cookie.load('FairShareName');
    this.state={user: name}
    this._determineUser = this._determineUser.bind(this);
    this._logout = this._logout.bind(this);
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
                <li style={{color: "#000", cursor: "pointer"}}>09/23/16 camping</li>
              </ul>
            </div>
        </div>
      )
    }
  }
  _logout () {
    this.setState({
      user: "guest"
    })
      cookie.save("FairShareName", "guest");
      cookie.remove("FairShareUserId");
      this.props.clearBills()
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
