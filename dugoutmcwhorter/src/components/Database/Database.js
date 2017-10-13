import React, { Component } from "react";
import "./Database.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";

class Database extends Component {
  constructor() {
    super();
    this.state = {
      filter: [],
      searchText: "",
      filterPopout: false,
      currentSearchResults: [],
      currentPrice: 0,
      filter1: "",
      filter2: "",
      filter3: "",
      filter4: "",
      filter5: "",
      filter6: "",
      cartItemRemoval: false,
      currentProductType: "",
      currentInfo: ""
    };

    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdminSearch = this.handleAdminSearch.bind(this);
    this.handleDatabaseAccess = this.handleDatabaseAccess.bind(this);
    this.handleFilterPopout = this.handleFilterPopout.bind(this);
    this.handleInStock = this.handleInStock.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.handleFilterText = this.handleFilterText.bind(this);
    this.handleFilterText2 = this.handleFilterText2.bind(this);
    this.handleFilterText3 = this.handleFilterText3.bind(this);
    this.handleFilterText4 = this.handleFilterText4.bind(this);
    this.handleFilterText5 = this.handleFilterText5.bind(this);
    this.handleFilterText6 = this.handleFilterText6.bind(this);
    this.handleProductType = this.handleProductType.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.addToInventory = this.addToInventory.bind(this);
    this.removeFromInventory = this.removeFromInventory.bind(this);
    this.handleProductPrice = this.handleProductPrice.bind(this);
    this.handleProductInfo = this.handleProductInfo.bind(this);
    this.handleProductId = this.handleProductId.bind(this);
    this.handleSearchAccess = this.handleSearchAccess.bind(this);
  }

  handleSearchText(e) {
    this.setState({ searchText: e.target.value });
  }
  handleFilterPopout() {
    const filterBoolean = this.state.filterPopout === false ? true : false;
    this.setState({ filterPopout: filterBoolean });
  }
  handleSearch() {
    const { searchText } = this.state;
    axios.get("http://localhost:3000/api/search", searchText).then(response => {
      this.setState({
        currentSearchResults: response.data
      });
      this.handleDatabaseAccess();
    });
  }
  handleAdminSearch() {
    const { searchText } = this.state;
    axios
      .get(`http://api.magicthegathering.io/v1/cards?name=${searchText}`)
      .then(response => {
        this.setState({
          currentSearchResults: (currentSearchResults += response.data.cards)
        });
      });
    axios
      .get(`http://yugiohprices.com/api/card_data/${searchText}`)
      .then(response => {
        this.setState({
          currentSearchResults: (currentSearchResults += response.data.data)
        });
      });
    this.handleDatabaseAccess();
  }
  handleFilter() {
    this.setState({
      filter: [
        this.state.filter1,
        this.state.filter2,
        this.state.filter3,
        this.state.filter4,
        this.state.filter5,
        this.state.filter6
      ]
    });
    const { filter } = this.state;
    const newFilter = [];
    for (var i = 0; i < filter.length; i++) {
      if (filter[i] !== ("" || " ") && !filter[i]) {
        newFilter.push(filter[i]);
      }
    }
    if (newFilter.length === 0) {
      return alert(
        "Filter action relies on filter values. Please select values or exit filtering to continue."
      );
    } else if (this.state.searchText === "") {
      axios
        .get("http://localhost:3000/api/filter", newFilter)
        .then(response => {
          this.setState({
            currentSearchResults: response.data
          });
        });
    } else {
      const { searchText } = this.state;
      axios
        .get("http://localhost:3000/api/sfilter", newFilter, searchText)
        .then(response => {
          this.setState({
            currentSearchResults: response.data
          });
        });
    }
  }
  handleInStock(product) {
    if (product.amount <= 0) {
      return "Not In Stock";
    } else {
      return product.amount + " In Stock";
    }
  }

  handleProductType(product) {
    product.multiverse_id !== null
      ? this.setState({ currentProductType: 2 })
      : product.card_type !== null
        ? this.setState({ currentProductType: 3 })
        : this.setState({ currentProductType: 1 });
  }

  // addItemToCart(product) {
  //   if (this.props.databaseType === 1) {
  //     if (product.product_type === 2 || 3) {
  //       axios.post("http://localhost:3000/api/cartcard", product);
  //     }
  //   } else if (this.props.databaseType === 2) {
  //     axios.post("http://localhost:3000/api/cartproduct", product);
  //   }
  // }

  // removeItemFromCart(product) {
  //   if (this.props.databaseType === 1) {
  //     if (product.product_type === 2) {
  //       axios.delete("http://localhost:3000/api/dcartcard", product);
  //     }
  //   } else if (this.props.databaseType === 2) {
  //     axios.delete("http://localhost:3000/api/dcartproduct", product);
  //   }
  // }
  addToInventory(product) {
    if (this.props.databaseType === 1) {
      if (product.multiverse_id) {
        const { currentPrice, currentInfo } = this.state;
        const murl = `http://api.magicthegathering.io/v1/cards?multiverseid=${product.multiverse_id}`;
        const ming = `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverse_id}&type=card`;
        axios
          .post(
            "http://localhost:3000/api/addmagic",
            product,
            currentPrice,
            murl,
            currentInfo,
            ming
          )
          .then(response => {
            response.status(200).send();
          });
      } else if (product.card_type) {
        const { currentPrice, currentInfo } = this.state;
        const yurl = `http://yugiohprices.com/api/card_data/${product.card_name}`;
        const ying = `http://yugiohprices.com/api/card_image/${product.card_name}`;
        axios
          .post(
            "http://localhost:3000/api/addyugioh",
            product,
            currentPrice,
            currentInfo,
            ying,
            yurl
          )
          .then(response => {
            response.status(200).send();
          });
      }
    } else if (this.props.databaseType === 2) {
      const { currentPrice, currentInfo } = this.state;

      axios
        .post(
          "http://localhost:3000/api/addproduct",
          currentPrice,
          filter1,
          currentInfo
        )
        .then(response => {
          response.status(200).send();
        });
    }
  }
  removeFromInventory(product) {
    if (this.props.databaseType === 1) {
      if (product.product_type === 2) {
        axios
          .delete("http://localhost:3000/api/removemagic", product)
          .then(response => {
            response.status(200).send();
          });
      } else if (product.product_type === 3) {
        axios
          .delete("http://localhost:3000/api/removeyugioh", product)
          .then(response => {
            response.status(200).send();
          });
      }
    } else if (this.props.databaseType === 2) {
      axios
        .delete("http://localhost:3000/api/removeproduct", product)
        .then(response => {
          response.status(200).send();
        });
    }
  }
  handleSearchAccess(product) {
    if (this.props.databaseType === 1) {
      if (!this.props.user) {
        return (
          <div className="searchCon">
            <input
              className="textInput"
              placeholder="|..."
              type="text"
              value={this.state.searchText}
              onChange={this.handleSearchText}
            />
            <button type="submit" onClick={this.handleSearch}>
              Search
            </button>
            <button type="submit" onClick={this.handleFilterPopout}>
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
              value={this.state.searchText}
              onChange={this.handleSearchText}
            />
            <button type="submit" onClick={this.handleSearch}>
              Search
            </button>
            <button type="submit" onClick={this.handleFilterPopout}>
              Filter
            </button>
          </div>
        );
      } else {
        return (
          <div className="searchCon">
            <input
              className="textInput"
              placeholder="|..."
              type="text"
              value={this.state.searchText}
              onChange={this.handleSearchText}
            />
            <button type="submit" onClick={this.handleAdminSearch}>
              Search
            </button>
          </div>
        );
      }
    } else if (this.props.databaseType === 2) {
      return (
        <div className="addProductCon">
          <input placeholder="Info..." type="text" onChange={this.updateInfo} />
          <input
            placeholder="Price..."
            type="text"
            onChange={this.updatePrice}
          />
          <input
            placeholder="Insert Image Url Here"
            type="text"
            onChange={this.handleFilterText}
          />
          <button onClick={this.addToInventory(product)}>Add</button>
        </div>
      );
    }
  }
  handleDatabaseAccess() {
    if (this.props.databaseType === 1) {
      if (!this.props.user) {
        this.state.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="unDBSR">
              <img
                className="productImg"
                src={
                  product.product_type === 2
                    ? `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverse_id}&type=card`
                    : product.product_type === 3
                      ? `http://yugiohprices.com/api/card_image/${product.card_name}`
                      : "No Image Available"
                }
                alt=""
              />
              <div className="productPrice">{product.price}</div>
              <div className="productInStock">
                {this.handleInStock(product)}
              </div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else if (this.props.user.loa === 1) {
        this.state.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="userDBSR">
              <img
                className=""
                src={
                  product.product_type === 2
                    ? `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverse_id}&type=card`
                    : product.product_type === 3
                      ? `http://yugiohprices.com/api/card_image/${product.card_name}`
                      : "No Image Available"
                }
                alt=""
              />
              <div className="productPrice">{product.price}</div>
              <button /*onClick={this.addItemToCart(product)}*/>Add</button>
              <button /*onClick={this.removeItemFromCart(product)}*/>
                Minus
              </button>
              <div className="productInStock">
                {this.handleInStock(product)}
              </div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else {
        this.state.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="adminDBSR">
              <img
                className=""
                src={
                  product.multiverse_id
                    ? `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverse_id}&type=card`
                    : product.card_type
                      ? `http://yugiohprices.com/api/card_image/${product.card_name}`
                      : "No Image Available"
                }
                alt=""
              />
              <div className="productPrice">
                {this.handleProductPrice(product)}
                <input type="text" onChange={this.updatePrice} />
              </div>
              <button onClick={this.addToInventory(product)}>Add</button>
              <button onClick={this.removeFromInventory(product)}>Minus</button>
              <div className="productInStock">
                {this.handleInStock(product)}
              </div>
              <div className="productInfo">
                {this.handleProductInfo(product)}
                <input type="text" onChange={this.updateInfo} />
              </div>
            </div>
          );
        });
      }
    } else if (this.props.databaseType === 2) {
      if (!this.props.user) {
        this.state.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="unDBSR">
              <img
                className="productImg"
                src={
                  product.product_type === 1
                    ? product.imgurl
                    : "No Image Available"
                }
                alt=""
              />
              <div className="productPrice">{product.price}</div>
              <div className="productInStock">
                {this.handleInStock(product)}
              </div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else if (this.props.user.loa === 1) {
        this.state.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="userDBSR">
              <img
                className=""
                src={
                  product.product_type === 1
                    ? product.imgurl
                    : "No Image Available"
                }
                alt=""
              />
              <div className="productPrice">{product.price}</div>
              <button /*onClick={this.addItemToCart(product)}*/>Add</button>
              <button /*onClick={this.removeItemFromCart(product)}*/>
                Minus
              </button>
              <div className="productInStock">
                {this.handleInStock(product)}
              </div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else {
        this.state.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="adminDBSR">
              <div className="productPrice">
                <input type="text" onChange={this.updatePrice} />
              </div>
              <button onClick={this.removeFromInventory(product)}>Minus</button>
              <div className="productInStock">
                {this.handleInStock(product)}
              </div>
              <div className="productInfo">
                {this.handleProductInfo(product)}
                <input type="text" onChange={this.updateInfo} />
              </div>
            </div>
          );
        });
      }
    }
  }
  updateInfo(e) {
    this.setState({
      currentInfo: e.target.value
    });
  }
  handleProductInfo(product) {
    product.product_info !== null ? product.product_info : "";
  }
  updatePrice(e) {
    this.setState({
      currentPrice: e.target.value
    });
  }
  handleProductPrice(product) {
    product.price !== null ? product.price : "Price Undetermined";
  }
  handleFilterText(e) {
    this.setState({ filter1: e.target.value });
  }
  handleFilterText2(e) {
    this.setState({ filter2: e.target.value });
  }
  handleFilterText3(e) {
    this.setState({ filter3: e.target.value });
  }
  handleFilterText4(e) {
    this.setState({ filter4: e.target.value });
  }
  handleFilterText5(e) {
    this.setState({ filter5: e.target.value });
  }
  handleFilterText6(e) {
    this.setState({ filter6: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <Nav />
        {this.handleSearchAccess()}
        <div className="filterPopout">
          <input
            placeholder="Magic Name"
            type="text"
            value={this.state.filter}
            onChange={this.handleFilterText}
          />
          <input
            placeholder="Magic Set Name"
            type="text"
            value={this.state.filter2}
            onChange={this.handleFilterText2}
          />
          <input
            placeholder="Magic Color"
            type="text"
            value={this.state.filter3}
            onChange={this.handleFilterText3}
          />

          <input
            placeholder="Magic Subtypes"
            type="text"
            value={this.state.filter4}
            onChange={this.handleFilterText4}
          />

          <input
            placeholder="Yugioh Card Type"
            type="text"
            value={this.state.filter5}
            onChange={this.handleFilterText5}
          />

          <input
            placeholder="Yugioh Subtype"
            type="text"
            value={this.state.filter6}
            onChange={this.handleFilterText6}
          />

          <button type="submit" onClick={this.handleFilter}>
            Filter
          </button>
          <button type="submit" onClick={this.setState({ filter: [] })}>
            Filter Reset
          </button>
        </div>
        <div className="piCon">{this.handleDatabaseAccess()}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { databaseType } = state;

  return {
    databaseType: state.databaseType
  };
}

export default connect(mapStateToProps)(Database);
