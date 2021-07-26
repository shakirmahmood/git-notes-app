import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";

import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import { useStyles } from "./CreateGistStyles";
import { createGist, fetchGistData, updateGist } from "./CreateGist.service";

export default function CreateGist() {
  const fileDataTemplate = { filename: "", content: "" };
  const classes = useStyles();
  const [filesData, setFilesData] = useState([fileDataTemplate]);
  const [description, setDescription] = useState("");

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    fetchGistData(id, setFilesData, setDescription);
  }, [id]);

  function createOrUpdateGist() {
    id
      ? updateGist(id, filesData, description, history)
      : createGist(filesData, description, history);
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
                key={`${idx}-filename`}
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
          {id ? "Update" : "Create"} Gist
        </Button>
      </form>
    </div>
  );
}
