import axios from "axios";

const initialState = {
  user: {},
  databaseType: 0
};

const GET_USER_INFO = "GET_USER_INFO";
const UPDATE_DATABASE_TYPE = "UPDATE_DATABASE_TYPE";

export function getUserInfo() {
  const userData = axios.get("/auth/me").then(res => {
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
    default:
      return state;
  }
}
