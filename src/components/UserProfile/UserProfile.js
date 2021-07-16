import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAPIData } from "../../utils/utils";
import {
  getGistsEP,
  getStarredGistsEP,
  getUserGistsEP,
} from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import GistHeader from "../GistHeader/GistHeader";
import FileViewer from "../FileViewer/FileViewer";

import useStyles from "./UserProfileStyles";

import Spinner from "../Spinner/Spinner";
import GistToolbar from "../GistToolbar/GistToolbar";
import { combineFilesData } from "./UserProfile.service";

const getState = (state) => ({
  username: state.username,
  profilePic: state.profilePic,
  profileUrl: state.profileUrl,
});

export default function UserProfile() {
  const loggedInUserData = useSelector(getState);
  const accessToken = localStorage.getItem("accessToken");
  const [userGists, setUserGists] = useState([]);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const { type, username } = useParams();

  useEffect(() => {
    setLoading(true);
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
          ? getStarredGistsEP()
          : username !== loggedInUserData.username
          ? getUserGistsEP(username)
          : getGistsEP();
      fetchAPIData(apiEndpoint, requestBody).then((userGists) => {
        userGists = GistTransformer(userGists);
        if (username === loggedInUserData.username) {
          setUserData(loggedInUserData);
        } else {
          const { username, profilePic, profileUrl } = userGists[0];
          setUserData({ username, profilePic, profileUrl });
        }

        Promise.all(
          userGists.map((userGist) => fetch(userGist.mainFile.fileUrl))
        )
          .then(function (responses) {
            return Promise.all(
              responses.map(function (response) {
                return response.text();
              })
            );
          })
          .then(function (filesContent) {
            const gists = combineFilesData(userGists, filesContent);
            setUserGists(gists);
            setLoading(false);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
  }, [type, username, loggedInUserData.username, accessToken]);

  function removeGist(id) {
    return () => {
      const gists = userGists.filter((gist) => gist.id !== id);
      setUserGists(gists);
    };
  }

  function isEditable(username) {
    return loggedInUserData.username === username;
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
            <GistToolbar
              gistId={id}
              color="secondary"
              showLabel={true}
              isEditable={isEditable(username)}
              removeGist={removeGist(id)}
            />
          </GistHeader>
          <FileViewer filename={filename} fileData={content} />
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
          <div className={classes.gistCont}>{listFilesData()}</div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}
