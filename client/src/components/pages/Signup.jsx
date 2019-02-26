import React, { Component } from "react";
import api from "../../api";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      name: "",
      password: "",
      message: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      username: this.state.username,
      name: this.state.name,
      password: this.state.password
    };
    api
      .signup(data)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  render() {
    return (
      <div className="Signup">
        <h2>Signup</h2>
        <form>
          <div className="form-group">
            <label for="username">Username</label>
            <input
              className="form-control"
              type="text"
              value={this.state.username}
              name="username"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label for="username">Name</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              name="name"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label for="username">Password</label>
            <input
              className="form-control"
              type="password"
              value={this.state.password}
              name="password"
              onChange={this.handleInputChange}
            />
          </div>
          <button className="btn btn-info" onClick={e => this.handleClick(e)}>
            Signup
          </button>
        </form>
        {this.state.message && <div className="info info-danger">{this.state.message}</div>}
      </div>
    );
  }
}
