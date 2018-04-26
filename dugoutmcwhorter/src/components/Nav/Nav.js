import React, { Component } from "react";
import "./Nav.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  updateDatabaseType,
  clearCSR,
  updateProducts,
  toggleWishlist,
  updateWishlist
} from "../../ducks/reducer";

class Nav extends Component {
  render() {
    return (
      <div className="App">
        <ul>
          <li>
            <Link to="/">
              <div className="titleCon">The DugOut</div>
            </Link>
          </li>
          <li>
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
          </li>
          {/* <li>
            <Link to="/database">
              <div
                onClick={() => {
                  this.props.updateDatabaseType(2);
                  this.props.clearCSR();
                  this.props.updateProducts();
                }}
              >
                Miscellaneous
              </div>
            </Link>
          </li> */}
          <li className="logout">
            {this.props.user === 0 ? (
              <a href={process.env.REACT_APP_LOGIN} className="linkCon">
                <div className="loginText">Login/ Register</div>
              </a>
            ) : (
                <a href={process.env.REACT_APP_LOGOUT} className="linkCon">
                  <div className="loginText">Logout</div>
                </a>
              )}
          </li>
          <li>
            <Link to="/about">
              <div>About</div>
            </Link>
          </li>
          <li>
            <Link to="/contact">
              <div>Contact</div>
            </Link>
          </li>
          <li>
            <Link to="/wishlist">
              <div>
                Wishlist
              </div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
// className="wishlist" onClick={() => {
//   this.props.toggleWishlist(!this.props.wishlistView), console.log(this.props.wishlistView), console.log("User for Wishlist", this.props.user),
//     axios.get(`/api/wishlist/${this.props.user.user_id}`).then(resp => {
//       console.log(resp.data),
//         this.props.updateWishlist(resp.data)
//     })
// }}
function mapStateToProps(state) {
  const { database, user } = state;

  return {
    databaseType: state.databaseType,
    user: state.user,
    wishlistView: state.wishlistView
  };
}

export default connect(mapStateToProps, {
  clearCSR,
  updateDatabaseType,
  updateProducts,
  toggleWishlist,
  updateWishlist
})(Nav);
