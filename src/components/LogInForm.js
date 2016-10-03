import React, { Component } from 'react';
import Logo from './Logo'

class LogInForm extends Component {
  constructor () {
    super()
    this._handleSubmit = this._handleSubmit.bind(this)
  }
  _handleSubmit(e){
    e.preventDefault()
    const email = this._email.value;
    const password = this._password.value
    this.props.login(email, password)
  }
  render () {
    return (
      <form className="login-form" onSubmit={this._handleSubmit}>
      <Logo />
        <div className="login-form-fields">
          <label>Email</label>
          <input type="email" placeholder="jon_snow@knownothing.com" ref={(input) => this._email = input}/>
            <label>Password</label>
            <input type="text" placeholder="password" ref={(input) => this._password = input}/>
            <button type="submit">Submit</button>
        </div>


      </form>
    )
  }
}

module.exports = LogInForm;
