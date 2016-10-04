import React, { Component } from 'react';
import Navbar from './components/Navbar'
import cookie from 'react-cookie';
import LogInForm from './components/LogInForm'
var app = require('./components/Firebase');


class LogIn extends Component {
  constructor () {
    super();
    this._login = this._login.bind(this);
  }
  _login (email, pass) {
    const auth = app.auth();
    //const promise =
        auth.signInWithEmailAndPassword(email, pass).then(function(user){
        cookie.save("FairShareUserId", user.uid);

        app.database().ref('users/' + user.uid).on('value',function(snapshot){
         var name = snapshot.child("name").val();
         cookie.save("FairShareName", name);
         window.location.href= "/";
       })
        //   this.props.navigator.push({
        //   title: 'LocksContainer',
        //   component: LocksContainer,
        // });
        // this.setState({"email": "", "password": "", "navbarHide": false});
      }).catch(function(e){
          alert(e)
        });
         }
  render() {
    return (
      <div className="container">
        <Navbar />
        <LogInForm login={this._login}/>
      </div>
    );
  }
}

export default LogIn;
