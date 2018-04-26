import axios from "axios";

const initialState = {
  user: 0,
  databaseType: 0,
  searchText: "",
  currentSearchResults: [],
  filterPopout: false,
  currentProducts: [],
  wishlistView: false,
  currentWishlist: []
};

const GET_USER_INFO = "GET_USER_INFO";
const UPDATE_DATABASE_TYPE = "UPDATE_DATABASE_TYPE";
const UPDATE_FPO = "UPDATE_FPO";
const UPDATE_ST = "UPDATE_ST";
const UPDATE_CSR = "UPDATE_CSR";
const CLEAR_CSR = "CLEAR_CSR";
const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";
const WLTOGGLE = "WLTOGGLE";
const UPDATEWL = "UPDATEWL";

export function updateWishlist(value) {
  return {
    type: UPDATEWL,
    payload: value
  }
}

export function toggleWishlist(value) {
  return {
    type: WLTOGGLE,
    payload: value
  }
}

export function clearCSR() {
  return {
    type: CLEAR_CSR,
    payload: []
  };
}
export function updateFPO(value) {
  return {
    type: UPDATE_FPO,
    payload: value
  };
}
export function updateST(value) {
  return {
    type: UPDATE_ST,
    payload: value
  };
}
export function updateCSR(value) {
  const tempCSR = [];
  value.map((product, i, arr) => {
    if (product.multiverseid) {
      tempCSR.push(product);
    } else if (product.card_type) {
      console.log("Get Here Please");
      tempCSR.push(product);
    }
  });
  console.log(tempCSR);
  return {
    type: UPDATE_CSR,
    payload: tempCSR
  };
}
export function updateProducts() {
  const cP = axios.post("/api/currentProducts").then(res => {
    console.log(res);
    return res.data;
  });
  return {
    type: UPDATE_PRODUCTS,
    payload: cP
  };
}
export function getUserInfo() {
  const userData = axios.get("/auth/me").then(res => {
    console.log(res);
    return res.data;
  });
  return {
    type: GET_USER_INFO,
    payload: userData
  };
}
export function updateDatabaseType(databaseType) {
  return {
    type: UPDATE_DATABASE_TYPE,
    payload: databaseType
  };
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO + "_FULFILLED":
      return Object.assign({}, state, { user: action.payload });
    case UPDATE_DATABASE_TYPE:
      return Object.assign({}, state, { databaseType: action.payload });
    case UPDATE_FPO:
      return Object.assign({}, state, { filterPopout: action.payload });
    case UPDATE_ST:
      return Object.assign({}, state, { searchText: action.payload });
    case UPDATE_PRODUCTS:
      return Object.assign({}, state, { currentProducts: action.payload });
    case UPDATE_CSR:
      console.log(action.payload);
      return Object.assign({}, state, { currentSearchResults: action.payload });
    case CLEAR_CSR:
      return Object.assign({}, state, { currentSearchResults: action.payload });
    case WLTOGGLE:
      return Object.assign({}, state, { wishlistView: action.payload });
    case UPDATEWL:
      return Object.assign({}, state, { currentWishlist: action.payload })
    default:
      return state;
  }
}
