import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useEffect, useState } from "react";
import { fetchResponseText } from "../../utils/utils";
import useStyles from "./GistToolbar.styles";

function StarButton(props) {
  const {
    gistId,
    color,
    label,
    removeGist: unstarGist,
    username,
    showStarCount,
  } = props;
  const [isStarred, setAsStarred] = useState(false);
  const classes = useStyles();
  const [starsCount, setStarsCount] = useState(undefined);

  useEffect(() => {
    fetch(`https://api.github.com/gists/${gistId}/star`, {
      method: "GET",
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((result) => {
        setAsStarred(result.status === 204);
      })
      .catch(() => {
        setAsStarred(false);
      });
    if (showStarCount) {
      fetchResponseText(
        `https://cors-anywhere.herokuapp.com/https://gist.github.com/${username}/${gistId}`
      ).then((response) => {
        const str = response.substring(
          response.indexOf("social-count") + 26,
          response.indexOf("social-count") + 40
        );
        const starCount = str.substring(0, str.indexOf("users")).trim();
        setStarsCount(starCount);
      });
    }
  }, [gistId]);

  function giveStar() {
    let requestBody = {};
    if (!isStarred) {
      requestBody = {
        method: "PUT",
        headers: {
          Authorization: `token ${localStorage.getItem("accessToken")}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Length": 0,
        },
      };
    } else {
      requestBody = {
        method: "DELETE",
        headers: {
          Authorization: `token ${localStorage.getItem("accessToken")}`,
          Accept: "application/vnd.github.v3+json",
        },
      };
    }

    fetch(`https://api.github.com/gists/${gistId}/star`, requestBody)
      .then((result) => {
        if (requestBody.method === "PUT") setAsStarred(result.status === 204);
        else if (requestBody.method === "DELETE")
          if (result.status === 204) {
            unstarGist();
            setAsStarred(false);
          } else {
            setAsStarred(true);
          }
      })
      .catch(() => setAsStarred(false));
  }
  return (
    <span onClick={giveStar} className={`${classes.btn} ${classes[color]}`}>
      {" "}
      {isStarred ? (
        <StarIcon className={classes.icon} />
      ) : (
        <StarBorderIcon className={classes.icon} />
      )}
      {label && <span>{label}</span>}
      {showStarCount && <span className={classes.count}>{starsCount}</span>}
    </span>
  );
}

export default StarButton;
