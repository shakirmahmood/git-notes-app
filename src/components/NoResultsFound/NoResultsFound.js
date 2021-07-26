import { makeStyles } from "@material-ui/core";

import image from "../../images/sad-emoji.png";

const useStyles = makeStyles((theme) => ({
  noResultsCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    color: theme.palette.primary.dark,
  },
  icon: {
    height: 150,
  },
}));

export function NoResultsFound() {
  const classes = useStyles();
  return (
    <div className={classes.noResultsCont}>
      <i className="fas fa-heart-broken"></i>
      <img className={classes.icon} src={image} alt="emumba icon" />
      <h3>Sorry, we couldn't find any results.</h3>
    </div>
  );
}
