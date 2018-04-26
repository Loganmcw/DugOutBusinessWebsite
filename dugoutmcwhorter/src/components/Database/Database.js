import React, { Component } from "react";
import "./Database.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "../../components/Nav/Nav.js";
import Search from "../Search/Search.js";
import Filter from "../Filter/Filter.js";
import { } from "../../ducks/reducer";

class Database extends Component {
  constructor() {
    super();
    this.state = {
      crs: [],
      currentPrice: 0,
      cartItemRemoval: false,
      currentInfo: "",
      currentStock: 0,
      currentProduct: [],
    };

    this.handleDatabaseAccess = this.handleDatabaseAccess.bind(this);
    // this.handleStock = this.handleStock.bind(this);
    this.updatePrice = this.updatePrice.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    this.addItemToCart = this.addItemToCart.bind(this);
    this.removeItemFromCart = this.removeItemFromCart.bind(this);
    this.addToInventory = this.addToInventory.bind(this);
    this.removeFromInventory = this.removeFromInventory.bind(this);
    this.handleProductPrice = this.handleProductPrice.bind(this);
    this.handleProductInfo = this.handleProductInfo.bind(this);
    this.increaseItemInventory = this.increaseItemInventory.bind(this);
    this.decreaseItemInventory = this.decreaseItemInventory.bind(this);
    this.handleProductStockCheckAdd = this.handleProductStockCheckAdd.bind(this);
    this.handleProductStockCheckRemove = this.handleProductStockCheckRemove.bind(this);


  }

  handleStock(product) {
    if (product.multiverseid) {
      axios.get(`/api/mstockCheck/${product.multiverseid}`).then(resp => {
        console.log(resp.amount);
        return resp.amount;
      })
    } else if (product.card_type) {
      axios.get(`/api/ystockCheck/${product.card_name}`).then(resp => {
        console.log(resp)
        return resp;
      })
    } else if (product.product_id) {
      axios.get(`/api/pstockCheck/${product.product_id}`).then(resp => {
        console.log(resp)
        return resp;
      })
    }
  }

  handleProductStockCheckAdd(product) {
    this.setState({
      currentProduct: product
    })
    console.log("Product is: ", product.card_id);
    console.log("It Tried To Check", product, "CARD RESP", this.state.currentProduct);
    axios
      .get(`/api/checkCart/${this.props.user.user_id}/${product.card_id}`)
      .then((stockAmount) => {
        console.log("Work?", stockAmount);
        if (!stockAmount.data || stockAmount.data == 0 || stockAmount.data == []) {
          console.log("Stock Empty")
          this.setState({ currentStock: 1 })
          this.addItemToCart();
        } else {
          this.setState({ currentStock: stockAmount.data[0] })
          this.addItemToCart();
          console.log("AddAttempt")
        };
        console.log(this.state.currentProduct)
      });
  }
  addItemToCart() {
    console.log("Trying to Add", this.state.currentStock.amount)
    if (this.state.currentStock.amount > 0) {
      console.log("It Tried To Increase");
      axios.post(`/api/cartincrease/${this.state.currentProduct.card_id}/${this.props.user.user_id}`);
    } else {
      console.log("It Tried To Add");
      axios.post(`/api/cartadd/${this.state.currentProduct.card_id}/${this.props.user.user_id}`);
    }
  }
  handleProductStockCheckRemove(product) {
    this.setState({
      currentProduct: product
    })
    axios
      .get(`/api/checkCart/${this.props.user.user_id}/${product.card_id}`)
      .then((stockAmount) => {
        console.log("Work?", stockAmount.data[0]);
        if (!stockAmount.data || stockAmount.data == 0 || stockAmount.data == []) {
          console.log("Stock Empty")
        } else {
          this.setState({ currentStock: stockAmount.data[0] })
          this.removeItemFromCart();
          console.log("RemoveAttempt")
        };
      });
  }
  removeItemFromCart() {
    console.log("Trying to Remove", this.state.currentStock.amount)
    if (this.state.currentStock.amount > 1) {
      console.log("It Tried To Decrease");
      axios.post(`/api/cartdecrease/${this.state.currentProduct.card_id}/${this.props.user.user_id}`);
    } else if (this.state.currentStock.amount <= 1) {
      console.log("It Tried To Remove");
      axios.post(`/api/cartremove/${this.state.currentProduct.card_id}/${this.props.user.user_id}`);
    }
  }

  addToInventory(product) {
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
      console.log("Yugioh Card Info Add", product)
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
    const { multiverseid, product_id } = product;
    console.log("It clicked!", product.name);
    if (this.props.databaseType === 1) {
      if (product.multiverseid) {
        axios.delete(`/api/rmagic/${multiverseid}`
        );
      } else if (product.card_type) {
        axios.delete(`/api/ryugioh/${product.name}`
        );
      }
    } else if (this.props.databaseType === 2) {
      axios.delete(`/api/rproduct/${product_id}`
      );
    }
  }

  handleDatabaseAccess() {
    console.log(this.props.user);
    if (this.props.databaseType === 1) {
      if (this.props.user === 0) {
        return this.props.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="unDBSR">
              <div className="cardName">{product.card_name}</div>
              <img
                className="pimg"
                src={
                  product.multiverseid !== null
                    ? `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverseid}&type=card`
                    : product.card_type !== null
                      ? `http://yugiohprices.com/api/card_image/${this.props
                        .searchText}`
                      : (console.log("Cat Works"), "https://http.cat/204")
                }
                alt=""
              />
              <br />
              <div className="unInfo">
                <div className="productPrice">${product.price},</div>
                <div className="productInStock">{product.amount} In Stock</div>
                <br />
                <div className="productInfo">{product.product_info}</div>
              </div>
            </div>
          );
        });
      } else if (this.props.user.loa === 1) {
        console.log("I tried");

        return this.props.currentSearchResults.map((product, i, arr) => {
          return (
            <div className="userDBSR">
              <div className="cardName">{product.card_name}</div>
              <img
                className="pimg"
                src={
                  product.multiverseid !== null
                    ? (console.log("Magic Image"),
                      `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverseid}&type=card`)
                    : product.card_type !== null
                      ? (console.log("Yugioh Image"),
                        `http://yugiohprices.com/api/card_image/${this.props
                          .searchText}`)
                      : (console.log("Cat Works"), "https://http.cat/204")
                }
                alt=""
              />
              <div className="productPrice">${product.price},</div>
              <button
                onClick={() => {
                  this.handleProductStockCheckAdd(product);
                  console.log(product)
                }}
              >
                Add
              </button>
              <button
                onClick={() => {
                  this.handleProductStockCheckRemove(product);
                }}
              >
                Remove
              </button>
              <div className="productInStock">{product.amount} In Stock</div>
              <div className="productInfo">{product.product_info}</div>
            </div>
          );
        });
      } else if (this.props.user.loa === 2) {
        console.log("I tried");
        return this.props.currentSearchResults.map((product, i, arr) => {
          if (product.multiverseid) {
            return (
              <div className="adminDBSR">
                <div className="cardName">{product.name}</div>
                <img
                  className="pimg"
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
                  className="btnArea"
                  onClick={() => {
                    this.addToInventory(product);
                  }}
                >
                  Add to Inventory
                </button>
                <button
                  className="btnArea"
                  onClick={() => {
                    this.increaseItemInventory(product);
                    console.log("Increase Item Hopefully");
                  }}
                >
                  +
                </button>

                <div className="productInStock">
                  {this.handleStock(product)} In Stock
                </div>

                <button
                  className="btnArea"
                  onClick={() => {
                    this.decreaseItemInventory(product);
                  }}
                >
                  -
                </button>
                <br />
                <div className="productInfoInsert">
                  {this.handleProductInfo(product)}
                  <input
                    type="text"
                    onChange={this.updateInfo}
                    placeholder="Insert Info"
                  />
                </div>
                <div className="productPriceInsert">
                  {this.handleProductPrice(product)}
                  <input
                    type="text"
                    onChange={this.updatePrice}
                    placeholder="Insert Price"
                  />
                  <br />
                  <button
                    className="btnArea"
                    onClick={() => {
                      this.removeFromInventory(product);
                    }}
                  >
                    Remove from Inventory
                  </button>
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
                <div className="cardName">{product.name}</div>
                <img
                  className="pimg"
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
                  Increase
                </button>

                <div className="productInStock">
                  {this.handleStock(product)} In Stock
                </div>

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
                <div className="productInfoInsert">
                  {this.handleProductInfo(product)}
                  <input
                    type="text"
                    onChange={this.updateInfo}
                    placeholder="Insert Info"
                  />
                </div>
                <div className="productPriceInsert">
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
                <div className="productPrice">${product.price}</div>
                <div className="productInStock">{product.amount} In Stock</div>
                <div className="productInStock">
                  {() => { this.handleStock(product) }} In Stock
                </div>
                <div className="productInStock">{product.amount} In Stock</div>
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
                  className="pimg"
                  src={
                    !product.imgurl ? "https://http.cat/204" : product.imgurl
                  }
                  alt=""
                />
                <div className="productPrice">${product.price}</div>
                <button
                  onClick={() => {
                    this.addItemToCart(product);
                  }}
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    this.removeItemFromCart(product);
                  }}
                >
                  Remove
                </button>
                <div className="productInStock">{product.amount} In Stock</div>
                <div className="productInfo">{product.product_info}</div>
              </div>
            );
          });
        } else if (this.props.user.loa === 2) {
          console.log("I tried");
          return this.props.currentProducts.map((product, i, arr) => {
            return (
              <div className="adminDBSR">
                <div className="productPriceInsert">
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
                  {this.handleStock(product)} In Stock
                </div>
                <div className="productInfoInsert">
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
    console.log(product.name);
    if (product.multiverseid) {
      axios.put("/api/inmagic", {
        product: product.multiverseid
      });
    } else if (product.card_type) {
      axios.put("/api/inyugioh", {
        product: product.name
      });
    } else {
      axios.put("/api/inproduct", { product: product.product_id });
    }
  }

  decreaseItemInventory(product) {
    console.log(product.name);
    if (product.multiverseid) {
      axios.put("/api/demagic", {
        product: product.multiverseid
      });
    } else if (product.card_type) {
      axios.put("/api/deyugioh", {
        product: product.name
      });
    } else {
      axios.put("/api/deproduct", { product: product.product_id });
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
