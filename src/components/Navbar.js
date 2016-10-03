import React, { Component } from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
  render () {
    return (
      <div className="navbar-div">
        <Link className="link" to="/">Home</Link>
        <h3>About</h3>
        <div className="login-signup-buttons-div">
          <Link className="link" to="/Login"><button className="login-btn">Log In</button> </Link>
          <h3 style={{textDecoration: "none"}}>&nbsp; or &nbsp; </h3>
          <Link className="link" to="/Signup"><button className="signup-btn">Sign Up</button></Link>
        </div>
      </div>
    )
  }
}
export default Navbar;
