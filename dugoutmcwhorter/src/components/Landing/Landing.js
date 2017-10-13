import React, { Component } from "react";
import "./Landing.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";

export default class Landing extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <p>Text here</p>
        <p>Text also here</p>
      </div>
    );
  }
}
