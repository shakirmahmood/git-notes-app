import * as actionTypes from "./actionTypes";

const initialState = {
  searchedText: "",
  pageNumber: 1,
  viewType: "list",
  username: null,
  profilePic: null,
  profileUrl: null,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.textSearched:
      return {
        ...state,
        searchedText: action.payload,
      };

    case actionTypes.userLoggedIn:
      return {
        ...state,
        username: action.payload.username,
        profilePic: action.payload.profilePic,
        profileUrl: action.payload.profileUrl,
      };
    case actionTypes.userSignedOut:
      return {
        ...state,
        username: null,
        profilePic: null,
        profileUrl: null,
      };
    case actionTypes.pageChanged:
      return {
        ...state,
        pageNumber: action.payload,
      };
    case actionTypes.viewChanged:
      return {
        ...state,
        viewType: action.payload,
      };
    default:
      return state;
  }
}
