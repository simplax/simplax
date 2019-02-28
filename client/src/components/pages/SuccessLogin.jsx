import React, { Component } from "react";
import api from "../../api";
export default class SuccessLogin extends Component {
  render() {
    return <div>Loading...</div>;
  }
  componentDidMount() {
    api
      .userDetail()
      .then(data => {

        this.props.history.push("/");
      })
      .catch(err => console.log(err));
  }
}