import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((customTheme) => {
  return {
    loginBtn: {
      backgroundColor: customTheme.palette.common.white,
      "&:hover": {
        border: "1px solid darkgray",
      },
      color: customTheme.palette.primary.main,
      border: "none",
      borderRadius: 5,
      marginLeft: 30,
      width: 100,
      height: 30,
      cursor: "pointer",
    },
  };
});
