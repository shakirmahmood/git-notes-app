import StarButton from "./StarButton";
import ForkButton from "./ForkButton";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import useStyles from "./GistToolbar.styles";

export default function GistToolbar(props) {
  const {
    gistId,
    showLabel,
    color,
    isEditable,
    username,
    type,
    removeGist,
    forksCount,
    showStarCount,
  } = props;
  const { toolbar } = useStyles();

  return (
    <div className={toolbar}>
      {isEditable && (
        <>
          <EditButton
            label={showLabel ? "Edit" : null}
            color={color}
            gistId={gistId}
          />
          <DeleteButton
            label={showLabel ? "Delete" : null}
            color={color}
            gistId={gistId}
            username={username}
            type={type}
            removeGist={removeGist}
          />
        </>
      )}
      <StarButton
        label={showLabel ? "Star" : null}
        color={color}
        gistId={gistId}
        removeGist={removeGist}
        username={username}
        showStarCount={showStarCount}
      />

      <ForkButton
        label={showLabel ? "Fork" : null}
        color={color}
        gistId={gistId}
        forksCount={forksCount}
      />
    </div>
  );
}
