import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { changePage } from "../../redux/actionCreator";
import useStyles from "./PaginationStyle";

export default function Pagination(props) {
  const { pageNo } = props;
  const [pageNumber, setPageNumber] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    setPageNumber(pageNo);
  }, [pageNo]);

  const dispatch = useDispatch();

  function prevPage() {
    if (pageNo > 1) dispatch(changePage(pageNo - 1));
  }

  function nextPage() {
    dispatch(changePage(pageNo + 1));
  }

  function changePageNumber(event) {
    setPageNumber(event.target.value);
  }

  function jumpToPage(event) {
    if (event.key === "Enter") dispatch(changePage(event.target.value));
  }

  return (
    <div className={classes.paginationCont}>
      <div></div>
      <Button
        variant="contained"
        color="primary"
        endIcon={<ArrowForwardIcon />}
        onClick={nextPage}
        className={classes.nextBtn}
      >
        Next page
      </Button>
      <div className={classes.pagination}>
        <span>Page</span>
        <input
          className={classes.pageNumber}
          value={pageNumber}
          onChange={changePageNumber}
          onKeyDown={jumpToPage}
        ></input>
        <span>of 14</span>
        <ArrowBackIosIcon
          className={[classes.prev, classes.paginationBtns]}
          onClick={prevPage}
          style={pageNo > 1 ? { cursor: "pointer" } : { pointerEvent: "none" }}
        />
        <ArrowForwardIosIcon
          className={[classes.next, classes.paginationBtns]}
          onClick={nextPage}
        />
      </div>
    </div>
  );
}
