import React, { Component } from "react";
import "./Wishlist.css";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";
import axios from "axios";
import { updateCSR, updateFPO, updateST, clearCSR } from "../../ducks/reducer";

class Wishlist extends Component {

    handleWishlist() {
        return this.props.currentWishlist.map((e, i, arr) => {
            <div className="wishlistSection"></div>
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Nav />
                    Where
                </div>
                <div className="wishlistModal" >{this.handleWishlist()}</div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { database, user } = state;

    return {
        databaseType: state.databaseType,
        user: state.user,
        wishlistView: state.wishlistView,
        currentWishlist: state.currentWishlist
    };
}

export default connect(mapStateToProps)(Wishlist)