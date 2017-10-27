import React, { Component } from "react";
import "./Nav.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateDatabaseType,
  clearCSR,
  updateProducts
} from "../../ducks/reducer";

class Nav extends Component {
  render() {
    return (
      <div className="App">
        <Link to="/">
          <div className="titleCon ">The DugOut</div>
        </Link>
        <div className="navCon">
          <Link to="/about">
            <div>About</div>
          </Link>
          <Link to="/contact">
            <div>Contact</div>
          </Link>
          <Link to="/database">
            <div
              onClick={() => {
                this.props.updateDatabaseType(1);
                console.log(this.props.user);
                this.props.clearCSR();
              }}
            >
              Cards
            </div>
          </Link>
          <Link to="/database">
            <div
              onClick={() => {
                this.props.updateDatabaseType(2);
                console.log(this.props.user);
                this.props.clearCSR();
                this.props.updateProducts();
              }}
            >
              Miscellaneous
            </div>
          </Link>
          {this.props.user === 0 ? (
            <a href={process.env.REACT_APP_LOGIN} className="linkCon">
              <button>
                <div className="loginText">Login/ Register</div>
              </button>
            </a>
          ) : (
            <a href={process.env.REACT_APP_LOGOUT} className="linkCon">
              <button>
                <div className="loginText">Logout</div>
              </button>
            </a>
          )}
        </div>
        <div className="footCon">
          <Link to="/">
            <div>Home</div>
          </Link>
          <Link to="/about">
            <div>About</div>
          </Link>
          <Link to="/contact">
            <div>Contact</div>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { database, user } = state;

  return {
    databaseType: state.databaseType,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  clearCSR,
  updateDatabaseType,
  updateProducts
})(Nav);
