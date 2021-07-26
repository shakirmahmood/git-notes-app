import { getGistByIdEP, getGistsEP } from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import { fetchAPIData } from "../../utils/utils";

export function fetchGistData(id, setFilesData, setDescription) {
  if (id) {
    fetchAPIData(getGistByIdEP(id)).then((gistData) => {
      const transformedGist = GistTransformer([gistData])[0];
      getFilesContent(transformedGist, setFilesData, setDescription);
    });
  }
}

function getFilesContent(transformedGist, setFilesData, setDescription) {
  Promise.all(transformedGist.files.map((file) => fetch(file.fileUrl)))
    .then(function (responses) {
      return Promise.all(
        responses.map(function (response) {
          return response.text();
        })
      );
    })
    .then(function (filesContent) {
      setFilesData(
        filesContent.map((fileContent, index) => ({
          ...transformedGist.files[index],
          content: fileContent,
        }))
      );
      setDescription(transformedGist.description);
    })
    .catch(function (error) {
      console.log(error);
    });
}
export function createGist(filesData, description, history) {
  const body = {
    description,
    files: createFilesDataforApi(filesData),
    public: true,
  };
  const requrestBody = {
    method: "POST",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(body),
  };
  fetchAPIData(getGistsEP(1), requrestBody)
    .then((data) => {
      history.push(`/gist-details/${data.id}`);
    })
    .catch((error) => console.log(error));
}

export function updateGist(id, filesData, description, history) {
  const body = {
    description,
    files: createFilesDataforApi(filesData),
  };
  const requrestBody = {
    method: "PATCH",
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify(body),
  };
  fetchAPIData(getGistByIdEP(id), requrestBody)
    .then(() => {
      history.push(`/gist-details/${id}`);
    })
    .catch((error) => console.log(error));
}

function createFilesDataforApi(filesData) {
  const files = {};
  filesData.forEach((fileData) => {
    files[fileData.filename] = fileData;
  });
  return files;
}
