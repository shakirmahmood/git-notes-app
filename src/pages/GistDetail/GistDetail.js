import { useEffect, useState } from "react";

import { useHistory, useParams } from "react-router";

import GistHeader from "../../components/GistHeader/GistHeader";
import FileViewer from "../../components/FileViewer/FileViewer";
import { useStyles } from "./GistDetailStyle";
import { useSelector } from "react-redux";
import Spinner from "../../components/Spinner/Spinner";
import GistToolbar from "../../components/GistToolbar/GistToolbar";
import {
  fetchGistData,
  gistTemplate,
  selectUsername,
} from "./GistDetail.service";
import { NoResultsFound } from "../../components/NoResultsFound/NoResultsFound";

function GistDetail() {
  const accessToken = localStorage.getItem("accessToken");
  const classes = useStyles();
  const [gist, setGist] = useState(gistTemplate);
  const [filesData, setFilesData] = useState([]);
  const username = useSelector(selectUsername);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchGistData(id, setFilesData, setGist, setLoading);
  }, [id]);

  function isEditable() {
    return username === gist.username;
  }

  function removeGist() {
    history.push(`/profile/${gist.username}/1`);
  }

  return (
    <div className={classes.container}>
      {!loading ? (
        <>
          {gist.id ? (
            <>
              <GistHeader
                username={gist.username}
                filename={gist.mainFile.filename}
                profilePic={gist.profilePic}
                createdSince={gist.createdSince}
                server="Broadcast Server"
                fileUrl={gist.gistUrl}
                profileUrl={gist.profileUrl}
                gistId={id}
              >
                {accessToken && (
                  <GistToolbar
                    gistId={id}
                    color="secondary"
                    showLabel={true}
                    isEditable={isEditable()}
                    username={gist.username}
                    removeGist={removeGist}
                    forksCount={gist.forks ? gist.forks.length : 0}
                    showStarCount={true}
                  />
                )}
              </GistHeader>

              {filesData.map((fileData, index) => (
                <>
                  <FileViewer
                    key={`fileviewer-${index}`}
                    filename={fileData.filename}
                    fileData={fileData.content}
                    isHeaderRequired={true}
                  />
                </>
              ))}
            </>
          ) : (
            <NoResultsFound />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default GistDetail;
