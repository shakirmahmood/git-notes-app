import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "grid",
    gridTemplateColumns: "repeat(4, auto)",
    gridGap: 10,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  primary: {
    color: theme.palette.primary.main,
  },
  secondary: {
    color: theme.palette.primary.links,
  },
  icon: {
    marginRight: 5,
  },
  count: {
    border: `1px solid ${theme.palette.primary.medium}`,
    padding: "0px 10px 2px",
    borderRadius: 5,
    marginLeft: 5,
  },
}));

export default useStyles;
