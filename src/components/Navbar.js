import React, { Component } from 'react';
import {Link} from 'react-router';
import cookie from 'react-cookie'

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
          <h2>Hello, {name}</h2>
            <button onClick={this._logout}>Log Out</button>
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
