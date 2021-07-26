import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import ListIcon from "@material-ui/icons/List";
import GridOnIcon from "@material-ui/icons/GridOn";

import { changeView } from "../../redux/actionCreator";

import { useStyles } from "./Home.styles";
import Pagination from "../../components/Pagination/Pagination";
import Spinner from "../../components/Spinner/Spinner";
import GridView from "./GridView";
import ListView from "./ListView";
import { fetchGistsData, getState } from "./Home.service";
import { NoResultsFound } from "../../components/NoResultsFound/NoResultsFound";

export default function Home() {
  const accessToken = localStorage.getItem("accessToken");

  const classes = useStyles();
  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { searchedText, viewType } = useSelector(getState);
  const dispatch = useDispatch();
  const { page } = useParams();

  useEffect(() => {
    setLoading(true);
    fetchGistsData(
      accessToken,
      searchedText,
      page,
      setGists,
      setLoading,
      viewType,
      gists
    );
  }, [searchedText, accessToken, page, viewType]);

  function changePage(pageNo) {
    history.push(`/gists/${pageNo}`);
  }

  function switchView(type) {
    dispatch(changeView(type));
  }

  return (
    <div className={classes.gistsCont}>
      <div className={classes.viewChangeBtns}>
        <GridOnIcon
          className={`${classes.viewChangeBtn} ${
            viewType === "grid" ? classes.selectedView : ""
          } ${classes.gridBtn}`}
          onClick={() => switchView("grid")}
        />
        <ListIcon
          className={`${classes.viewChangeBtn} ${
            viewType === "list" ? classes.selectedView : ""
          }`}
          onClick={() => switchView("list")}
        />
      </div>
      {!loading ? (
        <>
          {gists.length ? (
            <>
              {viewType === "grid" ? (
                <GridView
                  gists={gists}
                  setUserGists={setGists}
                  setLoading={setLoading}
                />
              ) : (
                <ListView gists={gists} />
              )}{" "}
              <Pagination
                pageNo={parseInt(page)}
                changePage={changePage}
                pageSize={9}
              />
            </>
          ) : (
            <NoResultsFound />
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
