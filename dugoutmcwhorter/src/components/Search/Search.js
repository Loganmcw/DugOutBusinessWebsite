import React, { Component } from "react";
import "./Search.css";
import { connect } from "react-redux";
import axios from "axios";
import { updateCSR, updateFPO, updateST, clearCSR } from "../../ducks/reducer";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      currentImgUrl: "",
      currentInfo: "",
      currentPrice: 0,
      product_id: 1,
      tempSearchText: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdminSearch = this.handleAdminSearch.bind(this);
    this.handleSearchAccess = this.handleSearchAccess.bind(this);
    this.handleImgUrl = this.handleImgUrl.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.handlePidIncrement = this.handlePidIncrement.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleSearchText = this.handleSearchText.bind(this);
  }

  handleSearchText(e) {
    this.setState({
      tempSearchText: e
    });
    this.props.updateST(this.state.tempSearchText);
  }
  handleSearch() {
    this.props.updateST(this.state.tempSearchText);
    this.props.clearCSR();
    console.log("text 36", this.state.tempSearchText);
    axios
      .post("/api/search", { params: { banana: this.state.tempSearchText } })
      .then(response => {
        console.log("40", response);
        !response.data ? "Not Yet" : "Got It",
          console.log(response.data),
          this.props.updateCSR(response.data);
      })
      .catch(error => {});
  }

  handleAdminSearch() {
    this.props.clearCSR();
    console.log(this.state.tempSearchText);
    let tempCSR = [];
    axios
      .post("/api/ysearch", {
        params: { banana: this.state.tempSearchText }
      })
      .then(response => {
        !response.data.data ? null : tempCSR.push(response.data.data);
        console.log("HASyugioh", response.data);
        axios
          .post("/api/msearch", {
            params: { banana: this.state.tempSearchText }
          })
          .then(response => {
            !response.data.cards
              ? null
              : (tempCSR = [...tempCSR, ...response.data.cards]);
            console.log("HASmagic", response.data);
            this.props.updateCSR(tempCSR);
          });
      })
      .catch(error => {});

    console.log(this.props.currentSearchResults);
  }
  handleSearchAccess(product) {
    if (this.props.databaseType === 1) {
      if (this.props.user === 0) {
        return (
          <div className="searchCon">
            <input
              className="textInput"
              placeholder="|..."
              type="text"
              value={this.state.tempSearchText}
              onChange={e => {
                this.handleSearchText(e.target.value);
              }}
              onClick={console.log(this.props.searchText)}
            />
            <button
              type="submit"
              onClick={() => {
                this.handleSearch();
              }}
            >
              Search
            </button>
            <button
              type="submit"
              onClick={filterBoolean => {
                this.props.updateFPO(
                  this.props.filterPopout === false ? true : false
                );
              }}
            >
              Filter
            </button>
          </div>
        );
      } else if (this.props.user.loa === 1) {
        return (
          <div className="searchCon">
            <input
              className="textInput"
              placeholder="|..."
              type="text"
              value={this.state.tempSearchText}
              onChange={e => {
                this.handleSearchText(e.target.value);
              }}
              onClick={console.log(this.props.searchText)}
            />
            <button
              type="submit"
              onClick={() => {
                this.handleSearch();
              }}
            >
              Search
            </button>
            <button
              type="submit"
              onClick={filterBoolean => {
                this.props.updateFPO(
                  this.props.filterPopout === false ? true : false
                );
              }}
            >
              Filter
            </button>
          </div>
        );
      } else if (this.props.user.loa === 2) {
        return (
          <div className="searchCon">
            <input
              className="textInput"
              placeholder="|..."
              type="text"
              value={this.state.tempSearchText}
              onChange={e => {
                this.handleSearchText(e.target.value);
              }}
              onClick={console.log(this.props.searchText)}
            />
            <button
              type="submit"
              onClick={() => {
                this.handleAdminSearch();
              }}
            >
              Search
            </button>
          </div>
        );
      }
    } else if (this.props.databaseType === 2) {
      if (this.props.user === 2) {
        return (
          <div className="addProductCon">
            <input
              placeholder="Info..."
              type="text"
              onChange={this.updateInfo}
            />
            <input
              placeholder="Price..."
              type="text"
              onChange={this.updatePrice}
            />
            <input
              placeholder="Insert Image Url Here"
              type="text"
              onChange={this.handleImgUrl}
            />
            <button
              onClick={() => {
                this.addProduct();
              }}
            >
              Add
            </button>
          </div>
        );
      }
    }
  }
  addProduct() {
    const { currentPrice, currentInfo, product_id } = this.state;
    axios
      .post("api/addproduct", currentPrice, currentInfo, product_id)
      .then(response => {
        response.status(200).send();
        this.handlePidIncrement();
      });
  }

  handleImgUrl(e) {
    this.setState({
      currentImgUrl: e.target.value
    });
  }
  updateInfo(e) {
    this.setState({
      currentInfo: e.target.value
    });
  }
  updatePrice(e) {
    this.setState({
      currentPrice: e.target.value
    });
  }
  handlePidIncrement() {
    this.setState({ product_id: this.state.product_id + 1 });
  }

  render() {
    return <div className="searchCon">{this.handleSearchAccess()}</div>;
  }
}
function mapStateToProps(state) {
  return {
    databaseType: state.databaseType,
    user: state.user,
    searchText: state.searchText,
    currentSearchResults: state.currentSearchResults,
    filterPopout: state.filterPopout
  };
}
export default connect(mapStateToProps, {
  updateCSR,
  updateFPO,
  updateST,
  clearCSR
})(Search);
