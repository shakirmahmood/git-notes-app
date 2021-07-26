import { getGistByIdEP } from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import { fetchAPIData } from "../../utils/utils";

export const gistTemplate = {
  id: "",
  username: "",
  mainFile: {
    filename: "",
  },
  profilePic: "",
  createdSince: "",
  gistUrl: "",
  profileUrl: "",
};

export const selectUsername = (state) => state.username;

export function combineFilesData(filesMetaData, fileContent) {
  return filesMetaData.map((fileMetaData, index) => {
    const fileData = { ...fileMetaData };
    fileData.content = fileContent[index];
    return fileData;
  });
}

export function fetchGistData(id, setFilesData, setGist, setLoading) {
  if (id) {
    return fetchAPIData(getGistByIdEP(id)).then((gistData) => {
      if (gistData.message) {
        setLoading(false);
        return;
      }
      const transformedGist = GistTransformer([gistData])[0];
      getFilesContent(transformedGist, setFilesData, setGist, setLoading);
    });
  }
}

function getFilesContent(transformedGist, setFilesData, setGist, setLoading) {
  Promise.all(transformedGist.files.map((file) => fetch(file.fileUrl)))
    .then(function (responses) {
      return Promise.all(
        responses.map(function (response) {
          return response.text();
        })
      );
    })
    .then(function (fileContent) {
      const filesData = combineFilesData(transformedGist.files, fileContent);
      setFilesData(filesData);
      setGist(transformedGist);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
    });
}
