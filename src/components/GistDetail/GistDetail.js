import { useEffect, useState } from "react";

import { useHistory } from "react-router";

import GistHeader from "../GistHeader/GistHeader";
import FileViewer from "../FileViewer/FileViewer";
import { fetchAPIData } from "../../utils/utils";
import { useStyles } from "./GistDetailStyle";
import { getGistByIdEP } from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import { useSelector } from "react-redux";
import Spinner from "../Spinner/Spinner";
import GistToolbar from "../GistToolbar/GistToolbar";
import { combineFilesData } from "./GistDetail.service";

const gistTemplate = {
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

const selectUsername = (state) => state.username;

function GistDetail({ match }) {
  const classes = useStyles();
  const [gist, setGist] = useState(gistTemplate);
  const [filesData, setFilesData] = useState([]);
  const username = useSelector(selectUsername);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const gistId = match ? match.params.id : null;

  useEffect(() => {
    setLoading(true);
    if (gistId) {
      fetchAPIData(getGistByIdEP(gistId)).then((gistData) => {
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

  function isEditable() {
    return username === gist.username;
  }

  function removeGist() {
    history.push(`/profile/${gist.username}`);
  }

  return (
    <div className={classes.container}>
      {!loading ? (
        <>
          <GistHeader
            username={gist.username}
            filename={gist.mainFile.filename}
            profilePic={gist.profilePic}
            createdSince={gist.createdSince}
            server="Broadcast Server"
            fileUrl={gist.gistUrl}
            profileUrl={gist.profileUrl}
            gistId={gistId}
          >
            <GistToolbar
              gistId={gistId}
              color="secondary"
              showLabel={true}
              isEditable={isEditable()}
              username={gist.username}
              removeGist={removeGist}
            />
          </GistHeader>

          {filesData.map((fileData, index) => (
            <>
              <FileViewer
                key={index}
                filename={fileData.filename}
                fileData={fileData.content}
              />
            </>
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default GistDetail;
