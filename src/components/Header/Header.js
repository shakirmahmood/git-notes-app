import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { searchGist } from "../../redux/actionCreator";
import Login from "../Login/Login";
import { useStyles } from "./HeaderStyles";

import image from "../../images/favicon.png";

export default function Header() {
  const classes = useStyles();

  const dispatch = useDispatch();

  const onSearchTextChange = (event) => {
    const searchedText = event.target.value;
    if (event.key === "Enter" || !searchedText)
      dispatch(searchGist(searchedText));
  };

  return (
    <div className={classes.root}>
      <AppBar color="primary" position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h4" noWraps>
            <Link to="/gists/1" classes={classes.removeDecoration}>
              <img className={classes.favicon} src={image} alt="emumba icon" />
              MUMBA
            </Link>
          </Typography>

          <div className={classes.search}>
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              disabled={window.location.pathname !== "/" ? true : false}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
                disabled: classes.disabled,
              }}
              inputProps={{ "aria-label": "search" }}
              onKeyDown={onSearchTextChange}
            />
          </div>
          <Login />
        </Toolbar>
      </AppBar>
    </div>
  );
}
