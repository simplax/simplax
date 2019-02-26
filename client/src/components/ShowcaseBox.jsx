import React, { Component } from "react";
import Plx from "react-plx";

export default class ShowcaseBox extends Component {
  render() {
    return (
      <div className="ShowcaseBox vh-100 d-flex justify-content-center align-items-center">
        <Plx parallaxData={this.props.parallaxData}>
          <div className="box-dimensions bg-info rounded text-white text-center">B</div>
          <div className="text-white">{this.props.property}</div>
        </Plx>
      </div>
    );
  }
}
