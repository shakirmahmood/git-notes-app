import * as actionTypes from "./actionTypes";

export const searchGist = (searchedText) => ({
  type: actionTypes.textSearched,
  payload: searchedText,
});

export const userLogIn = (username, profilePic, profileUrl) => ({
  type: actionTypes.userLoggedIn,
  payload: {
    username,
    profilePic,
    profileUrl,
  },
});

export const userSignOut = () => ({
  type: actionTypes.userSignedOut,
});

export const changePage = (pageNumber) => ({
  type: actionTypes.pageChanged,
  payload: pageNumber,
});

export const changeView = (viewType) => ({
  type: actionTypes.viewChanged,
  payload: viewType,
});
