import * as actionTypes from "./actionTypes";

const initialState = {
  searchedText: "",
  pageNumber: 1,
  starred: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.textSearched:
      return {
        ...state,
        searchedText: action.payload,
      };
    case actionTypes.gistOpened:
      return {
        ...state,
        selectedGist: action.payload,
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
    case actionTypes.changePage:
      return {
        ...state,
        pageNumber: action.payload,
      };
    default:
      return state;
  }
}
