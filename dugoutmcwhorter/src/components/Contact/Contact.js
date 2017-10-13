import React, { Component } from "react";
import "./Contact.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";

export default class Contact extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <div className="contactInfo">
          Full Name <br /> Phone Number <br /> Email <br /> Address <br />
          Hours of Operation <br /> Holidays <br />
        </div>
      </div>
    );
  }
}
