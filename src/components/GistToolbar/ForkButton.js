import "font-awesome/css/font-awesome.min.css";
import useStyles from "./GistToolbar.styles";

function ForkButton(props) {
  const { gistId, color, label } = props;
  const classes = useStyles();

  function fork() {
    fetch(`https://api.github.com/gists/${gistId}/forks`, {
      method: "POST",
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((result) => {})
      .catch((error) => console.log(error));
  }

  return (
    <span onClick={fork} className={`${classes.btn} ${classes[color]}`}>
      <i className={`fa fa-code-fork ${classes.icon}`} aria-hidden="true"></i>{" "}
      {label && <span>{label}</span>}
    </span>
  );
}

export default ForkButton;
