import {
  getGistsEP,
  getStarredGistsEP,
  getUserGistsEP,
} from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import { fetchAPIData } from "../../utils/utils";
import { fetchFilesData } from "../Home/Home.service";

export const getState = (state) => ({
  username: state.username,
  profilePic: state.profilePic,
  profileUrl: state.profileUrl,
});

export function fetchGistsData(
  type,
  loggedInUserData,
  username,
  setUserData,
  setGists,
  setLoading,
  accessToken,
  page
) {
  if ((accessToken && loggedInUserData.username) || !accessToken) {
    let requestBody = {};
    if (accessToken)
      requestBody = {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      };
    const apiEndpoint =
      type === "starred" && username === loggedInUserData.username
        ? getStarredGistsEP(page)
        : username !== loggedInUserData.username
        ? getUserGistsEP(username, page)
        : getGistsEP(page);
    fetchAPIData(apiEndpoint, requestBody).then((userGists) => {
      userGists = GistTransformer(userGists);
      if (username === loggedInUserData.username) {
        setUserData(loggedInUserData);
      } else {
        const { username, profilePic, profileUrl } = userGists[0];
        setUserData({ username, profilePic, profileUrl });
      }
      fetchFilesData(userGists, setGists, setLoading);
    });
  }
}

export function combineFilesData(userGists, fileContent) {
  return userGists.map((userGist, index) => {
    const gist = { ...userGist };
    gist.mainFile.content = fileContent[index];
    return gist;
  });
}
