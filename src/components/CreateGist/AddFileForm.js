import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { useState } from "react";

export default function AddFileForm() {
  const [filename, setFilename] = useState("");
  const [content, setContent] = useState("");

  function addFilename(event) {
    setFilename(event.target.value);
  }

  function addContent(event) {
    setContent(event.target.value);
  }

  return (
    <>
      <TextField
        value={filename}
        label="Enter file name..."
        variant="outlined"
        onChange={addFilename}
      />
      <TextareaAutosize
        value={content}
        minRows={10}
        maxRows={10}
        aria-label="file content"
        placeholder="Enter file content..."
        onChange={addContent}
      />
    </>
  );
}
