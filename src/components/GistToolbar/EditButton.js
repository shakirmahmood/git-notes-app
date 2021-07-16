import EditIcon from "@material-ui/icons/Edit";

import { useHistory } from "react-router-dom";

import useStyles from "./GistToolbar.styles";

export default function EditButton(props) {
  const { label, color, gistId } = props;
  const classes = useStyles();
  const history = useHistory();

  function editGist(gistId) {
    history.push(`/update-gist/${gistId}`);
  }

  return (
    <span
      className={`${classes.btn} ${classes[color]}`}
      onClick={() => editGist(gistId)}
    >
      <EditIcon className={classes.icon} />
      {label && <span>{label}</span>}
    </span>
  );
}
