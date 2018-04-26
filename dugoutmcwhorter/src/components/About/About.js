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
        <h1 className="textCon">
          <div className="mainInfo">
            The Dugout is a family owned business that has been in the hands of
            the McWhorters for 20 years this year. The Dugout is a place for
            kindness and business. Driving the goal to make everyone feel
            welcome is the theme here! Come join the family!
          </div>
        </h1>
        <main className="main">
          <div className="youtubevideo">
            <iframe
              color="clear"
              title="INDIANAPOLIS STAR - Embed Player"
              width="1066"
              height="600"
              background-color="clear"
              frameBorder="0"
              scrolling="yes"
              allowFullScreen="true"
              marginHeight="0"
              marginWidth="0"
              src="https://www.indystar.com/videos/news/2017/10/23/20-years-autographs-and-funny-looking-dice/106910186/"
            />
          </div>
        </main>
      </div>
    );
  }
}
