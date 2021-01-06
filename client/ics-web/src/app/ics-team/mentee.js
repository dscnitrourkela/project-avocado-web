import React, { Component } from 'react'

class Mentee extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('The rollNumber submitted was : ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <div className="page-header">
          <h3 className="page-title"> Mentee </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="!#" onClick={event => event.preventDefault()}>ICS Team</a></li>
              <li className="breadcrumb-item active" aria-current="page">Mentee</li>
            </ol>
          </nav>
        </div>
      <form onSubmit={this.handleSubmit}>
        <label>
          Roll Number:&nbsp;&nbsp;&nbsp;
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>&nbsp;&nbsp;&nbsp;
        <input type="submit" value="Search Mentee" />
      </form>
      </div>
    );
  }
}

export default Mentee