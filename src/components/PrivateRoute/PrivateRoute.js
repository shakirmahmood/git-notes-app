import GistList from "../GistList/GistList";
import { Route } from "react-router-dom";

export default function PrivateRoute({ path, component }) {
  const isAccessible = isAccessAllowed(path);
  return (
    <Route
      exact
      path={isAccessible ? path : "/"}
      component={isAccessible ? component : GistList}
    />
  );
}

function isAccessAllowed() {
  let accessToken = localStorage.getItem("accessToken");
  return accessToken ? true : false;
}
