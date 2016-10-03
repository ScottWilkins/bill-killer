import React, { Component } from 'react';
import '../App.css';
import {Link} from 'react-router';

class TryOut extends Component {
  componentWillMount () {
    if(window.reactCookie.load("FairShareUserId") === undefined){
      window.reactCookie.save("FairShareUserId", "guest")
    }

  }
  render () {
    return (
      <div className="try-out-div">
        <h2 style={{textDecoration: "underline", color: "#fff"}}><Link  to="/">Try it Out!</Link></h2>
        <div style={{display: "flex"}}>
          <h5>(</h5>
          <h5 style={{color:"red"}}>WARNING:</h5>
          <h5>)</h5>
        </div>
        <h5 style={{color:"red"}}>data will not be saved unless you sign up!</h5>
      </div>
    )
  }
}

export default TryOut;
