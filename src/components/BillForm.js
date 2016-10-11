import React, { Component } from 'react';
import '../App.css';

class BillForm extends Component {
  constructor(){
    super();
    this._handleSubmit = this._handleSubmit.bind(this)
  }
  render () {
    return (
      <form className="comment-form" onSubmit={this._handleSubmit}>
        <label>Add a User</label>
        <div className="bill-form-fields">
          <input placeholder="Name" ref={(input) => this._name = input}/>
          <div>
            <label>weighted:</label>
            <input type="number" step="0.1" placeholder="default is 1" ref={(input) => this._weight = input}/>
          </div>
        </div>
        <div className="bill-form-actions">
          <button type="submit"><i className="fa fa-plus-circle"></i> Add</button>
        </div>
      </form>
    )
  }
  _handleSubmit(event){
    event.preventDefault();
    let name = this._name;
    let weight = this._weight
    this.props.addBill(name.value, weight.value || 1)
    this._name.value = ""
    this._weight.value = "";
  }
}

export default BillForm;
