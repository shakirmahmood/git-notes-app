import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import useStyles from "./UserProfileStyles";

import FileViewer from "../../components/FileViewer/FileViewer";
import GistHeader from "../../components/GistHeader/GistHeader";
import GistToolbar from "../../components/GistToolbar/GistToolbar";
import Spinner from "../../components/Spinner/Spinner";
import { fetchGistsData, getState } from "./UserProfile.service";
import Pagination from "../../components/Pagination/Pagination";

export default function UserProfile() {
  const loggedInUserData = useSelector(getState);
  const accessToken = localStorage.getItem("accessToken");
  const [userGists, setGists] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const classes = useStyles();
  const { type, username, page } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchGistsData(
      type,
      loggedInUserData,
      username,
      setUserData,
      setGists,
      setLoading,
      accessToken,
      page
    );
  }, [type, username, loggedInUserData.username, accessToken, page]);

  function removeGist(id) {
    return () => {
      const gists = userGists.filter((gist) => gist.id !== id);
      setGists(gists);
    };
  }

  function isEditable(username) {
    return loggedInUserData.username === username;
  }

  function changePage(page) {
    history.push(`/profile/${username}${type ? `/${type}` : ""}/${page}`);
  }
  function listFilesData() {
    return userGists.map((userGist, index) => {
      const {
        id,
        username,
        mainFile: { filename, content },
        profilePic,
        createdSince,
        gistUrl,
        profileUrl,
      } = userGist;
      return (
        <div key={`${index}`}>
          <GistHeader
            username={username}
            filename={filename}
            profilePic={profilePic}
            createdSince={createdSince}
            server="Broadcast Server"
            fileUrl={gistUrl}
            profileUrl={profileUrl}
            gistId={id}
          >
            {accessToken && (
              <GistToolbar
                gistId={id}
                color="secondary"
                showLabel={true}
                isEditable={isEditable(username)}
                removeGist={removeGist(id)}
                forksCount={userGist.forks ? userGist.forks.length : undefined}
              />
            )}
          </GistHeader>
          <FileViewer
            filename={filename}
            fileData={content}
            fileViewerClass={classes.fileViewerClass}
          />
        </div>
      );
    });
  }

  return (
    <>
      {!loading ? (
        <div className={classes.userProfileCont}>
          <div className={classes.profile}>
            <img
              className={classes.profilePic}
              src={userData.profilePic}
              alt="A person"
            />
            <h3 className={classes.username}>{userData.username}</h3>
            <a className={classes.link} href={userData.profileUrl}>
              View GitHub Profile
            </a>
          </div>
          <div className={classes.gistCont}>
            {listFilesData()}
            <Pagination
              pageNo={parseInt(page)}
              changePage={changePage}
              pageSize={2}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
