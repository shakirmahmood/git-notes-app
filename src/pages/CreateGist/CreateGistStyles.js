import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  createGistCont: {
    width: "80%",
    margin: "auto",
  },
  form: {
    display: "grid",
    gridTemplateRows: "repeat(5, auto)",
    gridRowGap: 30,
    marginTop: 50,
  },
  button: {
    width: 130,
  },
  fileContent: {
    padding: 13,
    fontSize: 17,
    fontFamily: "inherit",
    fontWeight: 400,
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: 5,
    "&:hover": {
      border: `1px solid ${theme.palette.common.black}`,
    },
    "&::placeholder": {
      color: theme.palette.primary.dark,
    },
  },
}));
