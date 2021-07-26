import Button from "@material-ui/core/Button";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useEffect, useState } from "react";

import useStyles from "./PaginationStyle";

export default function Pagination(props) {
  const { pageNo, changePage, pageSize } = props;
  const [pageNumber, setPageNumber] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    setPageNumber(pageNo);
  }, [pageNo]);

  function prevPage() {
    changePage(pageNo - 1);
  }

  function nextPage() {
    changePage(pageNo + 1);
  }

  function changePageNumber(event) {
    setPageNumber(event.target.value);
  }

  function jumpToPage(event) {
    if (event.key === "Enter") changePage(event.target.value);
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
        <span>
          {pageNo * pageSize - (pageSize - 1)}-{pageNo * pageSize} results
        </span>
        <span
          style={pageNo > 1 ? { cursor: "pointer" } : { cursor: "not-allowed" }}
        >
          <ArrowBackIosIcon
            className={`${classes.prev} ${classes.paginationBtns}`}
            onClick={prevPage}
            style={pageNo > 1 ? {} : { pointerEvents: "none" }}
            disabled={pageNo > 1 ? false : true}
          />
        </span>
        <span>
          <ArrowForwardIosIcon
            className={`${classes.next} ${classes.paginationBtns}`}
            onClick={nextPage}
          />
        </span>
      </div>
    </div>
  );
}
