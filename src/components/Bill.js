import React, { Component } from 'react';
import '../App.css';

class Bills extends Component {
  constructor(){
    super();
    this._handleDelete = this._handleDelete.bind(this);
    this._handleDeletePayment = this._handleDeletePayment.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  render() {
    let payments = this._getPayments()|| [];
    let total = this.props.total.length > 0 ? this.props.total.reduce((a,b) => {
      return a+ +b.payment},0) : 0;
    let tot = this.props.billTotal
    let num = this.props.numberOfUsers
    let weight = this.props.weight
    let weighted = weight !== 1 ? weight : 1;
    let owed = ((tot * 100) / (num * 100) * weight).toFixed(2) - total
    let owedStatus = owed <= 0 ? this.props.name + " is owed $" + Math.abs(owed).toFixed(2) : this.props.name + " owes $" + owed.toFixed(2)
    return (
      <div  className="bill-div" >
        <h1>{this.props.name} <i className="fa fa-user-times"></i> {weighted}</h1>
        <form  className="bill-form-details" onSubmit={this._handleSubmit}>
          <input type="number" step="0.01" placeholder="0" ref={(input) => this._number = input}/>
          <input type="text" placeholder="Optional Description" ref={(input) => this._description = input}/>
          <button className="add-button" type="submit"><i className="fa fa-plus-circle"></i> Add</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>payments</th>
            </tr>
          </thead>
          <tbody>
              {payments}
          </tbody>
        </table>
        <h2>${total.toFixed(2)}</h2>
        <div className="owed-div" style={owed <= 0 ? {backgroundColor: "#339966"} : {backgroundColor: "#992600"}}>
            <h2>{owedStatus}</h2>
        </div>

        <a href="#" onClick={this._handleDelete}><button className="btn btn-danger">Delete User</button></a>
      </div>
    );
  }
  _handleSubmit (e) {
    e.preventDefault();
    let number = this._number;
    let id = this.props.id;
    let description = this._description;
    this.props.onAdd(number.value, id, description.value);
    this._number.value = "";
    this._description.value = "";
  }

  _handleDelete (e) {
    e.preventDefault()
    if(confirm("are you sure?"))
    this.props.onDelete(this.props.bill, this.props.total)
  }
  _getPayments () {
    return this.props.total.map((num, i) => {
      return (
        <tr key={i}>
          <td key={i}>${+num.payment.toFixed(2)}</td>
          <td>{num.description || ""}</td>
          <td ><a key={i} href="#" onClick={(event) => this._handleDeletePayment(i, event)}>Delete</a></td>
        </tr>
      )
    })
  }
  _handleDeletePayment (index, event) {
    event.preventDefault()
    const subtract = this.props.total.splice(index,1)[0].payment
    this.props.onDeletePayment(subtract)
  }
}

module.exports = Bills;
