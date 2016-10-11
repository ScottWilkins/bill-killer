import React, { Component } from 'react';
import '../App.css';

class EventForm extends Component {
  constructor(){
    super();
    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    return (

      <form className="comment-form" onSubmit={this._handleSubmit}>
        <label>Save the Event</label>
        <div className="bill-form-fields">
          <input placeholder="Event Name" ref={(input) => this._event = input}/>
          <div>
            <label>Date</label>
            <input type="date" ref={(input) => this._date = input}/>
          </div>
        </div>
        <div className="bill-form-actions">
          <button type="submit"><i className="fa fa-plus-circle"></i> Add</button>
        </div>
      </form>
    )
  }

  _handleSubmit(e){
    e.preventDefault();
    let event = this._event.value;
    let date = this._date.value
    this.props.addEvent(event, date)
    this._event.value = ""
    this._date.value = "";
  }
}

export default EventForm;
