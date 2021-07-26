import { useHistory } from "react-router";

import "font-awesome/css/font-awesome.min.css";
import useStyles from "./GistToolbar.styles";
import { fetchAPIData } from "../../utils/utils";

function ForkButton(props) {
  const { gistId, color, label, forksCount } = props;
  const classes = useStyles();
  const history = useHistory();

  function fork() {
    fetchAPIData(`https://api.github.com/gists/${gistId}/forks`, {
      method: "POST",
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((gist) => {
        console.log(gist);
        history.push(`/gist-details/${gist.id}`);
      })
      .catch((error) => console.log(error));
  }

  return (
    <span onClick={fork} className={`${classes.btn} ${classes[color]}`}>
      <i className={`fa fa-code-fork ${classes.icon}`} aria-hidden="true"></i>{" "}
      {label && <span>{label}</span>}
      {forksCount !== undefined && (
        <span className={classes.count}>{forksCount}</span>
      )}
    </span>
  );
}

export default ForkButton;
