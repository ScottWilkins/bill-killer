import React, { Component } from 'react';
import '../App.css';

class AddFriend extends Component {
  constructor(){
    super();
    this._handleSubmit = this._handleSubmit.bind(this)

  }
  render () {

    return (

      <form className="comment-form" onSubmit={this._handleSubmit}>
        <label>Invite a friend</label>
        <div className="bill-form-fields">
          <input placeholder="friend@friend.com" ref={(input) => this._email = input}/>
        </div>
        <div className="bill-form-actions">
          <button type="submit">Add</button>
        </div>
      </form>
    )
  }



  _handleSubmit(e){
    e.preventDefault();
    let email = this._email.value;
    this.props.addFriend(email)
  }
}

export default AddFriend;
