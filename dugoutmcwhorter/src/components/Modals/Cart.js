// import React, { Component } from "react";
// import "./Database.css";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import Nav from "../../components/Nav/Nav.js";
// import Search from "../Search/Search.js";
// import Filter from "../Filter/Filter.js";
// import {} from "../../ducks/reducer";

// class Database extends Component {
//   constructor() {
//     super();
//     this.state = {
//       crs: [],
//       currentPrice: 0,
//       cartItemRemoval: false,
//       currentInfo: ""
//     };

//     this.handleDatabaseAccess = this.handleDatabaseAccess.bind(this);
//     this.handleInStock = this.handleInStock.bind(this);
//     this.updatePrice = this.updatePrice.bind(this);
//     this.updateInfo = this.updateInfo.bind(this);
//     // this.addItemToCart = this.addItemToCart.bind(this);
//     // this.removeItemFromCart = this.removeItemFromCart.bind(this);
//     this.addToInventory = this.addToInventory.bind(this);
//     this.removeFromInventory = this.removeFromInventory.bind(this);
//     this.handleProductPrice = this.handleProductPrice.bind(this);
//     this.handleProductInfo = this.handleProductInfo.bind(this);
//   }

//   handleInStock(product) {
//     if (product.amount <= 0 || undefined) {
//       return "Not In Stock";
//     } else {
//       return product.amount + " In Stock";
//     }
//   }

//   // addItemToCart(product) {
//   //   if (this.props.databaseType === 1) {
//   //     if (product.product_type === 2 || 3) {
//   //       axios.post("http://localhost:3005/api/cartcard", product);
//   //     }
//   //   } else if (this.props.databaseType === 2) {
//   //     axios.post("http://localhost:3005/api/cartproduct", product);
//   //   }
//   // }

//   // removeItemFromCart(product) {
//   //   if (this.props.databaseType === 1) {
//   //     if (product.product_type === 2) {
//   //       axios.delete("http://localhost:3005/api/dcartcard", product);
//   //     }
//   //   } else if (this.props.databaseType === 2) {
//   //     axios.delete("http://localhost:3005/api/dcartproduct", product);
//   //   }
//   // }
//   addToInventory(product) {
//     const product_id = this.state;
//     if (this.props.databaseType === 1) {
//       if (product.multiverse_id) {
//         const { currentPrice, currentInfo } = this.state;
//         const murl = `http://api.magicthegathering.io/v1/cards?multiverseid=${product.multiverse_id}`;
//         const ming = `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${product.multiverse_id}&type=card`;
//         axios
//           .post(
//             "http://localhost:3005/api/addmagic",
//             product,
//             currentPrice,
//             murl,
//             currentInfo,
//             ming
//           )
//           .then(response => {
//             response.status(200).send();
//           });
//       } else if (product.card_type) {
//         const { currentPrice, currentInfo } = this.state;
//         const yurl = `http://yugiohprices.com/api/card_data/${product.card_name}`;
//         const ying = `http://yugiohprices.com/api/card_image/${product.card_name}`;
//         axios
//           .post(
//             "http://localhost:3005/api/addyugioh",
//             product,
//             currentPrice,
//             currentInfo,
//             ying,
//             yurl
//           )
//           .then(response => {
//             response.status(200).send();
//           });
//       }
//     }
//   }
//   removeFromInventory(product) {
//     if (this.props.databaseType === 1) {
//       if (product.product_type === 2) {
//         axios
//           .delete("http://localhost:3005/api/removemagic", product)
//           .then(response => {
//             response.status(200).send();
//           });
//       } else if (product.product_type === 3) {
//         axios
//           .delete("http://localhost:3005/api/removeyugioh", product)
//           .then(response => {
//             response.status(200).send();
//           });
//       }
//     } else if (this.props.databaseType === 2) {
//       axios
//         .delete("http://localhost:3005/api/removeproduct", product)
//         .then(response => {
//           response.status(200).send();
//         });
//     }
//   }

//   handleDatabaseAccess() {
//     if (this.props.databaseType === 1) {
//       if (!this.props.user) {
//         return this.props.currentSearchResults.map((product, i, arr) => {
//           return (
//             <div className="unDBSR">
//               <img
//                 className=""
//                 src={
//                   !product.imageUrl ? "https://http.cat/204" : product.imageUrl
//                 }
//                 alt=""
//               />
//               <div className="productPrice">{product.price}</div>
//               <div className="productInStock">
//                 {this.handleInStock(product)}
//               </div>
//               <div className="productInfo">{product.product_info}</div>
//             </div>
//           );
//         });
//       } else if (this.props.user.loa === 1) {
//         return this.props.currentSearchResults.map((product, i, arr) => {
//           return (
//             <div className="userDBSR">
//               <img
//                 className=""
//                 src={
//                   !product.imageUrl ? "https://http.cat/204" : product.imageUrl
//                 }
//                 alt=""
//               />
//               <div className="productPrice">{product.price}</div>
//               <button /*onClick={this.addItemToCart(product)}*/>Add</button>
//               <button /*onClick={this.removeItemFromCart(product)}*/>
//                 Minus
//               </button>
//               <div className="productInStock">
//                 {this.handleInStock(product)}
//               </div>
//               <div className="productInfo">{product.product_info}</div>
//             </div>
//           );
//         });
//       } else if (this.props.user.loa === 2) {
//         return this.props.currentSearchResults.map((product, i, arr) => {
//           console.log(this.props.currentSearchResults[i]);
//           console.log(product);
//           return (
//             <div className="adminDBSR">
//               <div>{product.name}</div>
//               <img
//                 className=""
//                 src={
//                   !product.imageUrl ? "https://http.cat/204" : product.imageUrl
//                 }
//                 alt=""
//               />
//               <div className="productInStock">
//                 {this.handleInStock(product)}
//               </div>
//               <div className="productInfo">
//                 {this.handleProductInfo(product)}
//                 <input type="text" onChange={this.updateInfo} />
//               </div>
//               <div className="productPrice">
//                 {this.handleProductPrice(product)}
//                 <input type="text" onChange={this.updatePrice} />
//               </div>
//               <button
//                 onClick={() => {
//                   this.addToInventory(product);
//                 }}
//               >
//                 Add to Inventory
//               </button>
//               <button
//                 onClick={() => {
//                   this.increaseItemInventory(product);
//                 }}
//               >
//                 +
//               </button>
//               <button
//                 onClick={() => {
//                   this.removeFromInventory(product);
//                 }}
//               >
//                 Remove from Inventory
//               </button>
//               <button
//                 onClick={() => {
//                   this.decreaseItemInventory(product);
//                 }}
//               >
//                 -
//               </button>
//               <br />
//               <br />
//               <br />
//             </div>
//           );
//         });
//       }
//     } else if (this.props.databaseType === 2) {
//       if (!this.props.user) {
//         return this.props.currentSearchResults.map((product, i, arr) => {
//           return (
//             <div className="unDBSR">
//               <img
//                 className="productImg"
//                 src={
//                   !product.imageUrl ? "https://http.cat/204" : product.imageUrl
//                 }
//                 alt=""
//               />
//               <div className="productPrice">{product.price}</div>
//               <div className="productInStock">
//                 {this.handleInStock(product)}
//               </div>
//               <div className="productInfo">{product.product_info}</div>
//             </div>
//           );
//         });
//       } else if (this.props.user.loa === 1) {
//         return this.props.currentSearchResults.map((product, i, arr) => {
//           return (
//             <div className="userDBSR">
//               <img
//                 className=""
//                 src={
//                   !product.imageUrl ? "https://http.cat/204" : product.imageUrl
//                 }
//                 alt=""
//               />
//               <div className="productPrice">{product.price}</div>
//               <button /*onClick={this.addItemToCart(product)}*/>Add</button>
//               <button /*onClick={this.removeItemFromCart(product)}*/>
//                 Minus
//               </button>
//               <div className="productInStock">
//                 {this.handleInStock(product)}
//               </div>
//               <div className="productInfo">{product.product_info}</div>
//             </div>
//           );
//         });
//       } else {
//         return this.props.currentSearchResults.map((product, i, arr) => {
//           return (
//             <div className="adminDBSR">
//               <div className="productPrice">
//                 <input type="text" onChange={this.updatePrice} />
//               </div>
//               <button
//                 onClick={() => {
//                   this.removeFromInventory(product);
//                 }}
//               >
//                 Minus
//               </button>
//               <div className="productInStock">
//                 {this.handleInStock(product)}
//               </div>
//               <div className="productInfo">
//                 {this.handleProductInfo(product)}
//                 <input type="text" onChange={this.updateInfo} />
//               </div>
//             </div>
//           );
//         });
//       }
//     }
//   }

//   updateInfo(e) {
//     this.setState({
//       currentInfo: e.target.value
//     });
//   }
//   handleProductInfo(product) {
//     product.product_info !== null ? product.product_info : "";
//   }
//   updatePrice(e) {
//     this.setState({
//       currentPrice: e.target.value
//     });
//   }
//   handleProductPrice(product) {
//     product.price !== null ? product.price : "Price Undetermined";
//   }

//   increaseItemInventory(product) {
//     axios.put("http://localhost:3005/api/incard", product).then(response => {
//       response.status(200).send();
//     });
//   }
//   decreaseItemInventory(product) {
//     axios.put("http://localhost:3005/api/decard", product).then(response => {
//       response.status(200).send();
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         <Nav />
//         <Search />
//         <Filter />
//         <div className="piCon">{this.handleDatabaseAccess()}</div>
//       </div>
//     );
//   }
// }
// function mapStateToProps(state) {
//   const {
//     updateCSR,
//     user,
//     searchText,
//     currentSearchResults,
//     filterPopout
//   } = state;

//   return {
//     databaseType: state.databaseType,
//     user: state.user,
//     searchText: state.searchText,
//     currentSearchResults: state.currentSearchResults,
//     filterPopout: state.filterPopout
//   };
// }

// export default connect(mapStateToProps)(Database);
