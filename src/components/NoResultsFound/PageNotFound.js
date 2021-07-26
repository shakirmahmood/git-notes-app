import { makeStyles } from "@material-ui/core";

import image from "../../images/sad-emoji.png";

import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  noResultsCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: "80%",
    margin: "auto",
    color: theme.palette.primary.dark,
  },
  sadIcon: {
    height: 150,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  homeIcon: {
    fontSize: 33,
    marginLeft: 10,
  },
}));

export function PageNotFound() {
  const classes = useStyles();
  return (
    <div className={classes.noResultsCont}>
      <i class="fas fa-heart-broken"></i>
      <img className={classes.sadIcon} src={image} alt="Sad smilie" />
      <h3>
        Sorry the page you are looking for cannot be found. Please go back to
        <Link className={classes.link} to="/gists/1">
          Home page <HomeIcon className={classes.homeIcon} />
        </Link>
      </h3>
    </div>
  );
}
