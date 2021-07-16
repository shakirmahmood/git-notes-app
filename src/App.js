import React from "react";
import CreateGist from "./components/CreateGist/CreateGist";
import GistList from "./components/GistList/GistList";
import Header from "./components/Header/Header";
import UserProfile from "./components/UserProfile/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GistDetail from "./components/GistDetail/GistDetail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import GistToolbar from "./components/GistToolbar/GistToolbar";

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#def5ec",
      main: "#5acba1",
      dark: "darkgray",
      contrastText: "#fff",
      medium: "lightgray",
      links: "#1a7eff",
    },
    secondary: {
      light: "#ff7961",
      main: "#1a7eff",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/gists/:page" exact component={GistList} />
            <Route path="/gist-details/:id" component={GistDetail} />
            <Route path="/gist-toolbar" exact component={GistToolbar} />
            <PrivateRoute
              path={["/create-gist", "/update-gist/:id"]}
              component={CreateGist}
            />
            <Route
              exact
              path={["/profile/:username", "/profile/:username/:type"]}
              component={UserProfile}
            />
            {/* <Route path="/gists/:username" exact component={UserProfile} /> */}
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
