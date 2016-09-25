import React, { Component } from 'react';


class HowMany extends Component {
  constructor (){
    super();
    this._handleChange = this._handleChange.bind(this)
  }
  _handleChange (e) {
    const howMany = e.target.value
      this.props.update(howMany)
  }
  render() {
    return (
      <div className="info-div">
      <form>
        <label style={{marginRight: "10px"}}> how many ways are you splitting this?</label>
          <select style={{
            lineHeight: "20px",
            height: "30px",
            backgroundColor: "#89a7b6",
            fontSize: "25px",
            color: "#fff"
          }} onChange={this._handleChange}
            >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
      </form>
      </div>
    )
  }
}

export default HowMany;
