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
        <Nav />
        <p>Text here</p>
        <p>Text also here</p>
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
