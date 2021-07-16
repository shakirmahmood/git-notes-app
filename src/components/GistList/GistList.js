import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, useParams } from "react-router-dom";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { fetchAPIData } from "../../utils/utils";
import { getPublicGistEP } from "../../utils/ApiEndpoints";
import GistTransformer from "../../utils/GistsTransformer";
import { openGist } from "../../redux/actionCreator";
import { useStyles } from "./GistListStyles";
import Pagination from "../Pagination/Pagination";
import Spinner from "../Spinner/Spinner";
import GistToolbar from "../GistToolbar/GistToolbar";

const getState = (state) => ({
  searchedText: state.searchedText,
  selectedGist: state.selectedGist,
  pageNumber: state.pageNumber,
});
const searchGist = (gists, searchedText) =>
  gists.filter((gist) => gist.username === searchedText); // didn't use rambda as this is much simple as compare to rambda

function GistList() {
  const accessToken = localStorage.getItem("accessToken");
  const classes = useStyles();

  const [gists, setGists] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchedText, pageNumber } = useSelector(getState);

  const dispatch = useDispatch();
  useEffect(() => {
    const requestBody = {};
    setLoading(true);
    if (accessToken) {
      requestBody["headers"] = { Authorization: `token ${accessToken}` };
    }
    fetchAPIData(getPublicGistEP(pageNumber), requestBody).then((data) => {
      const transformedGists = GistTransformer(data);
      const filteredGists = searchedText
        ? searchGist(transformedGists, searchedText)
        : transformedGists;

      setGists(filteredGists ? filteredGists : []);
      setLoading(false);
    });
  }, [searchedText, accessToken, pageNumber]);
  const history = useHistory();

  function tableRowClicked(event) {
    const parentElement = event.target.parentElement;
    let rowData = parentElement.getAttribute("data-gist");
    if (!rowData)
      rowData = parentElement.parentElement.getAttribute("data-gist");
    const selectedGist = JSON.parse(rowData);
    dispatch(openGist(selectedGist));
    history.push(`/gist-details/${selectedGist.id}`);
  }

  function getTableRows() {
    return gists.map((gist) => {
      const {
        id,
        username,
        updatedAt: { date, time },
        profilePic,
        mainFile: { filename },
      } = gist;
      return (
        <TableRow
          key={id}
          className={classes.tableRow}
          data-gist={JSON.stringify(gist)}
        >
          <TableCell
            onClick={tableRowClicked}
            align="center"
            className={classes.tableCell}
          >
            <img
              className={classes.profilePic}
              src={profilePic}
              alt="A person"
            />
          </TableCell>
          <TableCell onClick={tableRowClicked} className={classes.tableCell}>
            {username}
          </TableCell>
          <TableCell onClick={tableRowClicked} className={classes.tableCell}>
            {date}
          </TableCell>
          <TableCell onClick={tableRowClicked} className={classes.tableCell}>
            {time}
          </TableCell>
          <TableCell onClick={tableRowClicked} className={classes.tableCell}>
            Web Server
          </TableCell>
          <TableCell onClick={tableRowClicked} className={classes.tableCell}>
            {filename}
          </TableCell>
          {accessToken && (
            <TableCell align="center" className={classes.tableCell}>
              <GistToolbar gistId={id} color="primary" />
            </TableCell>
          )}
        </TableRow>
      );
    });
  }

  return (
    <>
      <TableContainer component={Paper} className={classes.tableCont}>
        {!loading ? (
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Date</strong>
                </TableCell>
                <TableCell>
                  <strong>Time</strong>
                </TableCell>
                <TableCell>
                  <strong>Keyword</strong>
                </TableCell>
                <TableCell>
                  <strong>Notebook Name</strong>
                </TableCell>
                {accessToken && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody> {getTableRows()}</TableBody>
          </Table>
        ) : (
          <Spinner />
        )}
      </TableContainer>
      <Pagination pageNo={pageNumber} />
    </>
  );
}

export default GistList;
