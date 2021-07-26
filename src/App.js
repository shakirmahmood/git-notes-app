import React from "react";
import CreateGist from "./pages/CreateGist/CreateGist";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import UserProfile from "./pages/UserProfile/UserProfile";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GistDetail from "./pages/GistDetail/GistDetail";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import GistCard from "./components/GistCard/GistCard";
import { NoResultsFound } from "./components/NoResultsFound/NoResultsFound";
import { PageNotFound } from "./components/NoResultsFound/PageNotFound";

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
            <Route path="/gists/:page" exact component={Home} />
            <Route path="/no-results" exact component={NoResultsFound} />
            <Route path="/gist-details/:id" component={GistDetail} />
            <Route path="/gist-card" exact component={GistCard} />
            <PrivateRoute
              path={["/create-gist", "/update-gist/:id"]}
              component={CreateGist}
            />
            <Route
              exact
              path={[
                "/profile/:username/:page",
                "/profile/:username/:type/:page",
              ]}
              component={UserProfile}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
