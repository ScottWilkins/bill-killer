import React, { Component } from 'react';
import {Link} from 'react-router';

class Navbar extends Component {
  render () {
    return (
      <div className="navbar-div">
        <Link className="link" to="/">Home</Link>
        <h3>About</h3>
        <Link className="link" to="/Signup">Sign Up  Sign In</Link>
        <h3>Sign out</h3>
      </div>
    )
  }
}
export default Navbar;
