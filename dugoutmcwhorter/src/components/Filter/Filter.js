import React, { Component } from "react";
import "./Filter.css";
import { connect } from "react-redux";
import axios from "axios";
import Search from "../Search/Search.js";
import { updateCSR, updateFPO } from "../../ducks/reducer";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      filter: "card_name",
      filterText: ""
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleFilterText = this.handleFilterText.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }
  handleFilterText(e) {
    this.setState({
      filterText: e
    });
  }
  updateFilter(e) {
    this.setState({
      filter: e
    });
  }
  handleFilter() {
    console.log(this.state.filter);
    console.log(this.state.filterText);
    if (this.props.searchText === "") {
      axios
        .post("/api/filter", {
          fText: this.state.filterText,
          fter: this.state.filter
        })
        .then(response => {
          this.props.updateCSR(response.data);
          updateFPO(this.props.filterPopout === false ? true : false);
        });
    } else {
      axios
        .post("/api/sfilter", {
          fText: this.state.filterText,
          fter: this.state.filter,
          sText: this.props.searchText
        })
        .then(response => {
          this.props.updateCSR(response.data);
          updateFPO(this.props.filterPopout === false ? true : false);
        });
    }
  }
  render() {
    return (
      <div className="filterPopout">
        <select
          className="sort"
          value={this.state.filter}
          onChange={e => this.updateFilter(e.target.value)}
        >
          <option value="card_name">Name</option>
          <option value="set_name">Magic Set</option>
          <option value="magictype">Magic SubTypes</option>
          <option value="card_type">Yugioh Card Type</option>
          <option value="yugiohtype">Yugioh SubType</option>
        </select>
        <input
          placeholder="Name"
          type="text"
          onChange={e => {
            this.handleFilterText(e.target.value);
          }}
        />
        <button
          type="submit"
          onClick={() => {
            this.handleFilter();
          }}
        >
          Filter
        </button>
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
    filterPopout,
    updateFPO
  } = state;

  return {
    databaseType: state.databaseType,
    user: state.user,
    searchText: state.searchText,
    currentSearchResults: state.currentSearchResults,
    filterPopout: state.filterPopout
  };
}
export default connect(mapStateToProps)(Filter);
