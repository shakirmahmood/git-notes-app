import DeleteIcon from "@material-ui/icons/Delete";

import { getGistByIdEP } from "../../utils/ApiEndpoints";
import { fetchResponseText } from "../../utils/utils";

import useStyles from "./GistToolbar.styles";

export default function DeleteButton(props) {
  const { label, color, gistId, removeGist } = props;
  const classes = useStyles();

  function deleteGist(gistId) {
    const requestBody = {
      method: "DELETE",
      headers: {
        Authorization: `token ${localStorage.getItem("accessToken")}`,
      },
    };
    fetchResponseText(getGistByIdEP(gistId), requestBody)
      .then((data) => {
        removeGist();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <span
      className={`${classes.btn} ${classes[color]}`}
      onClick={() => deleteGist(gistId)}
    >
      <DeleteIcon className={classes.icon} />
      {label && <span>{label}</span>}
    </span>
  );
}
