import React, { Component } from "react";
import "./Landing.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";
import { getUserInfo } from "../../ducks/reducer";

class Landing extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    return (
      <div className="App">
        <div>

          <Nav />

        </div>
        <h1 className="infoCon1">
          <p1 className="infoText1">
            "It's gaming and sports, but it's more than that. It's a place to
            belong, place to relax, enjoy each other and just have some fun
            competition."
            <section1 className="author">
              James Luther McWhorter a.k.a. Jamie
            </section1>
          </p1>
        </h1>
        <h2 className="infoCon2">
          <p2 className="infoText2">
            "We cater to all crowds, no matter who comes through the door. We
            want them to feel like part of the family."
            <section2 className="author">
              James Luther McWhorter a.k.a. Jamie
            </section2>
          </p2>
        </h2>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { getUserInfo })(Landing);
