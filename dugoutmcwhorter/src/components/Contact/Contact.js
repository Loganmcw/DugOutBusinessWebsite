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
          <div className="contactInfoBox">Owner: James Luther McWhorter</div>
          <div className="contactInfoBox">Call at 812-374-4730</div>
          <div className="contactInfoBox">E-mail me at fekemel@notreel.com</div>
          <div className="contactInfoBox">
            Our address is 939 Glenmore Trail Brownsburg, In 46112
          </div>

          <div className="contactInfoBox">
            Hours of Operation: <br />Monday through Friday: 10-7<br />Saturday:
            10-5
          </div>
          <div className="contactInfoBox">
            Holidays: Christmas Day, Thanksgiving Eve, Thanksgiving Dway, New
            Years Eve, New Years Day
          </div>
        </div>
        <a
          target="_blank"
          className="contactInfoBoxImage"
          href="https://www.google.com/maps/place/The+Dugout/@39.7481146,-86.2562421,15z/data=!4m5!3m4!1s0x886ca7f8bdb6ebd1:0x3334605a0b06a0b4!8m2!3d39.750052!4d-86.2576485"
        />
      </div>
    );
  }
}
