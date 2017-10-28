import React, { Component } from "react";
import "./Database.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";
import Search from "../Search/Search.js";
import Filter from "../Filter/Filter.js";
import {} from "../../ducks/reducer";

class Database extends Component {
  constructor() {
    super();
    this.state = {
      crs: [],
      currentPrice: 0,
      cartItemRemoval: false,
      currentInfo: ""
    };

    this.handleDatabaseAccess = this.handleDatabaseAccess.bind(this);
    this.handleStock = this.handleStock.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    // this.addItemToCart = this.addItemToCart.bind(this);
    // this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.addToInventory = this.addToInventory.bind(this);
    this.removeFromInventory = this.removeFromInventory.bind(this);
    this.handleProductPrice = this.handleProductPrice.bind(this);
    this.handleProductInfo = this.handleProductInfo.bind(this);
    this.increaseItemInventory = this.increaseItemInventory.bind(this);
    this.decreaseItemInventory = this.decreaseItemInventory.bind(this);
  }

  handleStock(product) {
    console.log(product);
    // if (product.multiverseid) {
    axios
      .get("/api/mstockCheck", {
        product: "multiverseid",
        type: `${product.multiverseid}`
      })
      .then(res => {
        console.log("YES IT IS");
      });
    // } else if (product.card_type) {
    //   axios.get("/api/ystockCheck", { product: product }).then(res => {
    //     !res ? "0" : res.status(200).res.send(res);
    //   });
    // }
  }

  // addItemToCart(product) {
  //   if (this.props.databaseType === 1) {
  //     if (product.product_type === 2 || 3) {
  //       axios.post("http://localhost:3005/api/cartcard", product);
  //     }
  //   } else if (this.props.databaseType === 2) {
  //     axios.post("http://localhost:3005/api/cartproduct", product);
  //   }
  // }

  // removeItemFromCart(product) {
  //   if (this.props.databaseType === 1) {
  //     if (product.product_type === 2) {
  //       axios.delete("http://localhost:3005/api/dcartcard", product);
  //     }
  //   } else if (this.props.databaseType === 2) {
  //     axios.delete("http://localhost:3005/api/dcartproduct", product);
  //   }
  // }
  addToInventory(product) {
    console.log("It clicked!");
    if (product.multiverseid) {
      const { currentPrice, currentInfo } = this.state;
      console.log(product);
      axios.post("/api/addmagic", {
        product: product,
        murl: `http://api.magicthegathering.io/v1/cards?multiverseid=${product.multiverseid}`,
        currentPrice: currentPrice,
        currentInfo: currentInfo
      });
    } else if (product.card_type) {
      const { currentPrice, currentInfo } = this.state;
      axios.post("/api/addyugioh", {
        product: product,
        currentPrice: currentPrice,
        currentInfo: currentInfo,
        yurl: `http://yugiohprices.com/api/card_data/${product.card_name}`
      });
    }
  }

  removeFromInventory(product) {
    if (this.props.databaseType === 1) {
      if (product.multiverseid) {
        axios.post("/api/rproduct", {
          product: product.multiverseid,
          type: "multiverseid"
        });
      } else if (product.card_type) {
        axios.post("/api/rproduct", {
          product: product.card_type,
          type: "card_type"
        });
      }
    } else if (this.props.databaseType === 2) {
      axios.post("/api/rproduct", {
        product: product.product_id,
        type: "product_id"
      });
    }
  }

  handleDatabaseAccess() {
    console.log(this.props.currentSearchResults);
    if (this.props.databaseType === 1) {
      if (this.props.user === 0) {
        return this.props.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="unDBSR">
              <div>{product.card_name}</div>
              <img
                className=""
                src={
                  product.multiverseid !== null
                    ? `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this
                        .props.searchText}&type=card`
                    : product.card_type !== null
                      ? `http://yugiohprices.com/api/card_image/${this.props
                          .searchText}`
                      : (console.log("Cat Works"), "https://http.cat/204")
                }
                alt=""
              />
              <div className="productPrice">{product.price}</div>
              <div className="productInStock">{product.amount}</div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else if (this.props.user.loa === 1) {
        console.log("I tried");

        return this.props.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="userDBSR">
              <div>{product.card_name}</div>
              <img
                className=""
                src={
                  product.multiverseid !== null
                    ? (console.log("Magic Image"),
                      `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this
                        .props.searchText}&type=card`)
                    : product.card_type !== null
                      ? (console.log("Yugioh Image"),
                        `http://yugiohprices.com/api/card_image/${this.props
                          .searchText}`)
                      : (console.log("Cat Works"), "https://http.cat/204")
                }
                alt=""
              />
              <div className="productPrice">{product.price}</div>
              <button /*onClick={this.addItemToCart(product)}*/>Add</button>
              <button /*onClick={this.removeItemFromCart(product)}*/>
                Minus
              </button>
              <div className="productInStock">{product.amount}</div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else if (this.props.user.loa === 2) {
        console.log("I tried");
        return this.props.currentSearchResults.map((product, i, arr) => {
          console.log(this.props.currentSearchResults[i]);
          if (product.multiverseid) {
            console.log("Not Here");
            return (
              <div className="adminDBSR">
                <div>{product.name}</div>
                <img
                  className=""
                  src={
                    product.imageUrl
                      ? (console.log("Magic Image"), product.imageUrl)
                      : product.card_type
                        ? (console.log("I think so"),
                          `http://yugiohprices.com/api/card_image/${product.name}`)
                        : "https://http.cat/204"
                  }
                  alt=""
                />
                <br />
                <button
                  onClick={() => {
                    this.addToInventory(product);
                  }}
                >
                  Add to Inventory
                </button>
                <button
                  onClick={() => {
                    this.increaseItemInventory(product);
                    console.log("Increase Item Hopefully");
                  }}
                >
                  Increase
                </button>
                {
                  <div className="productInStock">
                    {this.handleStock(product)}
                  </div>
                }
                <button
                  onClick={() => {
                    this.decreaseItemInventory(product);
                  }}
                >
                  Decrease
                </button>
                <button
                  onClick={() => {
                    this.removeFromInventory(product);
                  }}
                >
                  Remove from Inventory
                </button>
                <div className="productInfo">
                  {this.handleProductInfo(product)}
                  <input
                    type="text"
                    onChange={this.updateInfo}
                    placeholder="Insert Info"
                  />
                </div>
                <div className="productPrice">
                  {this.handleProductPrice(product)}
                  <input
                    type="text"
                    onChange={this.updatePrice}
                    placeholder="Insert Price"
                  />
                </div>
                <br />
                <br />
                <br />
              </div>
            );
          } else {
            console.log("Get Here Please");
            return (
              <div className="adminDBSR">
                <div>{product.name}</div>
                <img
                  className=""
                  src={
                    product.imageUrl
                      ? product.imageUrl
                      : product.card_type
                        ? (console.log("I think so"),
                          `http://yugiohprices.com/api/card_image/${product.name}`)
                        : "https://http.cat/204"
                  }
                  alt=""
                />
                <br />
                <button
                  onClick={() => {
                    this.addToInventory(product);
                  }}
                >
                  Add to Inventory
                </button>
                <button
                  onClick={() => {
                    this.increaseItemInventory(product);
                    console.log("Increase Item Hopefully");
                  }}
                >
                  +
                </button>
                {
                  <div className="productInStock">
                    {this.handleStock(product)}
                  </div>
                }
                <button
                  onClick={() => {
                    this.decreaseItemInventory(product);
                  }}
                >
                  -
                </button>
                <button
                  onClick={() => {
                    this.removeFromInventory(product);
                  }}
                >
                  Remove from Inventory
                </button>
                <div className="productInfo">
                  {this.handleProductInfo(product)}
                  <input
                    type="text"
                    onChange={this.updateInfo}
                    placeholder="Insert Info"
                  />
                </div>
                <div className="productPrice">
                  {this.handleProductPrice(product)}
                  <input
                    type="text"
                    onChange={this.updatePrice}
                    placeholder="Insert Price"
                  />
                </div>
                <br />
                <br />
                <br />
              </div>
            );
          }
        });
      }
    } else if (this.props.databaseType === 2) {
      console.log("I tried");
      if (this.props.currentProducts) {
        if (this.props.user === 0) {
          return this.props.currentProducts.map((product, i, arr) => {
            return (
              <div className="unDBSR">
                <img
                  className="productImg"
                  src={
                    !product.imgurl ? "https://http.cat/204" : product.imgurl
                  }
                  alt=""
                />
                <div className="productPrice">{product.price}</div>

                <div className="productInStock">
                  {this.handleStock(product)}
                </div>

                <div className="productInfo">{product.product_info}</div>
              </div>
            );
          });
        } else if (this.props.user.loa === 1) {
          console.log("I tried");
          return this.props.currentProducts.map((product, i, arr) => {
            return (
              <div className="userDBSR">
                <img
                  className=""
                  src={
                    !product.imgurl ? "https://http.cat/204" : product.imgurl
                  }
                  alt=""
                />
                <div className="productPrice">{product.price}</div>
                <button /*onClick={this.addItemToCart(product)}*/>Add</button>
                <button /*onClick={this.removeItemFromCart(product)}*/>
                  Minus
                </button>
                <div className="productInStock">
                  {this.handleStock(product)}
                </div>
                <div className="productInfo">{product.product_info}</div>
              </div>
            );
          });
        } else if (this.props.user.loa === 2) {
          console.log("I tried");
          return this.props.currentProducts.map((product, i, arr) => {
            return (
              <div className="adminDBSR">
                <div className="productPrice">
                  <input type="text" onChange={this.updatePrice} />
                </div>
                <button
                  onClick={() => {
                    this.removeFromInventory(product);
                  }}
                >
                  Minus
                </button>
                <div className="productInStock">
                  {this.handleStock(product)}
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

  increaseItemInventory(product) {
    console.log("itemincfunc");
    axios.put("/api/incard", {
      product: "multiverseid",
      type: `${product.multiverseid}`
    });
    //   if (product.multiverseid) {
    //     axios.put("/api/incard", ([
    //      product.multiverseid,
    //      "multiverseid"])
    //   } else if (product.card_type) {
    //     axios.put("/api/incard",
    //      ([product.card_type,
    //    "card_type"])
    //     )
    //   } else {
    //     axios.put("/api/incard",
    //      ([product.product_id,
    //      "product_id"])
    //     )
    //   }
  }

  decreaseItemInventory(product) {
    console.log("itemdecfunc");
    if (product.multiverseid) {
      axios.put("/api/decard", {
        product: product.multiverseid,
        type: "multiverseid"
      });
    } else if (product.card_type) {
      axios.put("/api/decard", {
        product: product.card_type,
        type: "card_type"
      });
    } else {
      axios.put("/api/decard", {
        product: product.product_id,
        type: "product_id"
      });
    }
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Search />
        <Filter />
        <div className="piCon">{this.handleDatabaseAccess()}</div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const {
    updateCSR,
    user,
    searchText,
    currentSearchResults,
    filterPopout
  } = state;

  return {
    databaseType: state.databaseType,
    user: state.user,
    searchText: state.searchText,
    currentSearchResults: state.currentSearchResults,
    filterPopout: state.filterPopout
  };
}

export default connect(mapStateToProps)(Database);
