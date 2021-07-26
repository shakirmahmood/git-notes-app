import { getPublicGistEP } from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import { fetchAPIData } from "../../utils/utils";
import { combineFilesData } from "../UserProfile/UserProfile.service";

import { filter } from "ramda";

export const getState = (state) => ({
  searchedText: state.searchedText,
  viewType: state.viewType,
});

const searchGist = (gists, searchedText) =>
  filter((gist) => gist.username === searchedText, gists);

export function fetchGistsData(
  accessToken,
  searchedText,
  page,
  setGists,
  setLoading,
  viewType,
  gists
) {
  const requestBody = {};

  if (accessToken) {
    requestBody["headers"] = { Authorization: `token ${accessToken}` };
  }
  if (viewType === "grid") {
    console.log(gists.length);
    if (gists.length > 0) {
      fetchFilesData(gists, setGists, setLoading);
    } else if (!gists || gists.length === 0) {
      fetchAPIData(getPublicGistEP(page), requestBody).then((data) => {
        const transformedGists = GistTransformer(data);
        const filteredGists = searchedText
          ? searchGist(transformedGists, searchedText)
          : transformedGists;
        fetchFilesData(filteredGists, setGists, setLoading);
      });
    }
  } else {
    console.log("list view");
    fetchAPIData(getPublicGistEP(page), requestBody).then((data) => {
      const transformedGists = GistTransformer(data);
      const filteredGists = searchedText
        ? searchGist(transformedGists, searchedText)
        : transformedGists;
      console.log(filteredGists);
      setGists(filteredGists);
      setLoading(false);
    });
  }
}

export function fetchFilesData(gists, setGists, setLoading) {
  Promise.all(gists.map((gist) => fetch(gist.mainFile.fileUrl)))
    .then(function (responses) {
      return Promise.all(
        responses.map(function (response) {
          return response.text();
        })
      );
    })
    .then(function (filesContent) {
      const userGists = combineFilesData(gists, filesContent);
      setGists(userGists);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
}
