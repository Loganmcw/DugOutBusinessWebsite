import React, { Component } from "react";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing.js";
import Database from "./components/Database/Database.js";
import About from "./components/About/About.js";
import Contact from "./components/Contact/Contact.js";
class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          <Route component={Landing} path="/" exact />
          <Route component={Database} path="/database" />
          <Route component={About} path="/about" />
          <Route component={Contact} path="/contact" />
        </div>
      </HashRouter>
    );
  }
}

export default App;
