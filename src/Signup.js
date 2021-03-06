import React, { Component } from 'react';
import Navbar from './components/Navbar'
import cookie from 'react-cookie';
import SignUpForm from './components/SignUpForm'
var app = require('./components/Firebase');


class Signup extends Component {
  constructor () {
    super();
    this._login = this._signup.bind(this);
  }
  _signup (email, pass, userName) {
    const auth = app.auth();
          auth.createUserWithEmailAndPassword(email, pass).then(function(user){
          app.database().ref('users/'+user.uid).set({events: "", name: userName, email: email}, function(){
            cookie.save("FairShareUserId", user.uid)
            cookie.save("FairShareName", userName)
            window.location.href= "/";
          })


      }).catch(e=>alert(e.message));

      }
  render() {
    return (
      <div className="container">
        <Navbar />
        <SignUpForm signup={this._signup}/>
      </div>
    );
  }
  componentWillUnmount() {
    // app.off();
  }
}

export default Signup;
