import { useEffect } from "react";
import GitHubLogin from "react-github-login";
import { useDispatch, useSelector } from "react-redux";
import { userLogIn } from "../../redux/actionCreator";
import properties from "../../configurations";
import { useStyles } from "./Login.styles";
import ProfileMenu from "../ProfileMenu/ProfileMenu";

const selectLoggedInUser = (state) => ({
  username: state.username,
});

function Login() {
  const classes = useStyles();
  const { client_id, client_secret, redirect_uri } = properties;
  const dispatch = useDispatch();

  const { username } = useSelector(selectLoggedInUser);

  useEffect(() => {
    getLoggedInUser();
  }, [username]);

  function getLoggedInUser() {
    const accessToken = localStorage.getItem("accessToken");
    if (!username) {
      fetch("https://api.github.com/user", {
        method: "GET",
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          const { avatar_url, login, html_url } = userData;
          dispatch(userLogIn(login, avatar_url, html_url));
        });
    }
  }

  const onSuccessGithub = (response) => {
    fetch(
      "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `code=${encodeURIComponent(
          response.code
        )}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`,
      }
    )
      .then((result) => result.json())
      .then((data) => {
        const accessToken = data.access_token;
        localStorage.setItem("accessToken", accessToken);
        getLoggedInUser();
      });
  };

  return (
    <div className="App" align="center">
      {!localStorage.getItem("accessToken") ? (
        <GitHubLogin
          clientId={client_id}
          onSuccess={onSuccessGithub}
          buttonText="LOGIN"
          className={`git-login ${classes.loginBtn}`}
          valid={true}
          redirectUri={redirect_uri}
          scope="gist"
        />
      ) : (
        <ProfileMenu />
      )}
    </div>
  );
}

export default Login;
