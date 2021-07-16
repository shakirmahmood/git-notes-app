import { useEffect, useState } from "react";

import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import { fetchAPIData } from "../../utils/utils";
import { getGistByIdEP, getGistsEP } from "../../utils/ApiEndpoints";
import { useStyles } from "./CreateGistStyles";
import GistTransformer from "../../utils/GistsTransformer";

export default function CreateGist({ match }) {
  const fileDataTemplate = { filename: "", content: "" };
  const classes = useStyles();
  const [filesData, setFilesData] = useState([fileDataTemplate]);
  const [description, setDescription] = useState("");
  const gistId = match ? match.params.id : null;

  useEffect(() => {
    if (gistId) {
      fetchAPIData(getGistByIdEP(gistId), {}).then((gistData) => {
        const transformedGist = GistTransformer([gistData])[0];
        getFilesContent(transformedGist);
      });
    }
  }, [gistId]);

  function getFilesContent(transformedGist) {
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

  function createOrUpdateGist() {
    if (gistId) {
      updateGist();
    } else {
      createGist();
    }
  }

  function createGist() {
    const body = {
      description,
      files: createFilesDataforApi(),
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
    fetchAPIData(getGistsEP(), requrestBody)
      .then((data) => {
        setFilesData([fileDataTemplate]);
        setDescription("");
      })
      .catch((error) => console.log(error));
  }

  function updateGist() {
    const body = {
      description,
      files: createFilesDataforApi(),
    };
    const requrestBody = {
      method: "PATCH",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(body),
    };
    fetchAPIData(getGistByIdEP(gistId), requrestBody)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  function createFilesDataforApi() {
    const files = {};
    filesData.forEach((fileData) => {
      files[fileData.filename] = fileData;
    });
    return files;
  }

  function addDescription(event) {
    setDescription(event.target.value);
  }

  function addFilename(idx, event) {
    const filesDataCopy = [...filesData];
    filesDataCopy[idx].filename = event.target.value;
    setFilesData(filesDataCopy);
  }

  function addContent(idx, event) {
    const filesDataCopy = [...filesData];
    filesDataCopy[idx].content = event.target.value;
    setFilesData(filesDataCopy);
  }

  function addFile() {
    const filesDataCopy = [...filesData];
    filesDataCopy.push(fileDataTemplate);
    setFilesData(filesDataCopy);
  }

  return (
    <div className={classes.createGistCont}>
      <form className={classes.form}>
        <TextField
          value={description}
          placeholder="Enter gist description..."
          variant="outlined"
          onChange={addDescription}
        />
        {filesData.map((fileData, idx) => {
          return (
            <>
              <TextField
                key={`${idx}`}
                value={fileData.filename}
                placeholder="Enter file name..."
                variant="outlined"
                onChange={(e) => addFilename(idx, e)}
              />
              <TextareaAutosize
                key={`${fileData.filename}-${idx}-content`}
                value={fileData.content}
                minRows={10}
                maxRows={10}
                aria-label="file content"
                placeholder="Enter file content..."
                onChange={(e) => addContent(idx, e)}
                className={classes.fileContent}
              />
            </>
          );
        })}
        <Button
          onClick={addFile}
          className={classes.button}
          variant="contained"
          color="primary"
        >
          Add File
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={createOrUpdateGist}
        >
          {gistId ? "Update" : "Create"} Gist
        </Button>
      </form>
    </div>
  );
}
