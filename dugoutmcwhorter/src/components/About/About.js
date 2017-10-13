import React, { Component } from "react";
import "./About.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";

export default class About extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="mainInfo">Main Info</div>
        <div className="values">Values</div>
        <div className="youtubevideo">
          {/* <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YRhaI4W8d9s"
            frameborder="0"
            allowfullscreen="true"
          /> */}
        </div>
      </div>
    );
  }
}
