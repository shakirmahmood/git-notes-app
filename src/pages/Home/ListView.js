import { useHistory } from "react-router-dom";

import { useStyles } from "./ListView.style";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import GistToolbar from "../../components/GistToolbar/GistToolbar";

export default function ListView(props) {
  const accessToken = localStorage.getItem("accessToken");
  const classes = useStyles();
  const { gists } = props;
  const history = useHistory();

  function tableRowClicked(event) {
    const parentElement = event.target.parentElement;
    let gistid = parentElement.getAttribute("data-gistid");
    if (!gistid)
      gistid = parentElement.parentElement.getAttribute("data-gistid");
    history.push(`/gist-details/${gistid}`);
  }

  function getTableRows() {
    return gists.map((gist) => {
      const {
        id,
        username,
        updatedAt: { date, time },
        profilePic,
        mainFile: { filename },
        description,
      } = gist;
      return (
        <TableRow key={id} className={classes.tableRow} data-gistid={id}>
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
            {description}
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
    <TableContainer component={Paper} className={classes.tableCont}>
      <Table aria-label="simple table">
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
              <strong>Description</strong>
            </TableCell>
            <TableCell>
              <strong>Notebook Name</strong>
            </TableCell>
            {accessToken && <TableCell></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>{getTableRows()}</TableBody>
      </Table>
    </TableContainer>
  );
}
