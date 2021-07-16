import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  container: {
    width: "80%",
    margin: "50px auto",
  },
  count: {
    border: `1px solid ${theme.palette.primary.medium}`,
    padding: "0px 10px 2px",
    borderRadius: 5,
  },
}));
