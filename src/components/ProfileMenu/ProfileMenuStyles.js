import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  profilePic: {
    width: 50,
    borderRadius: "50%",
  },
  username: {
    borderBottom: `1px solid ${theme.palette.primary.medium}`,
    pointerEvents: "none",
  },
  removeDecoration: {
    textDecoration: "none",
    color: "unset",
  },
}));

export default useStyles;
