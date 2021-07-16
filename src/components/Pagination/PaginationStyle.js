import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paginationCont: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    width: "80%",
    margin: "50px auto",
    alignItems: "center",
    fontSize: 12,
  },
  paginationBtns: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontSize: 15,
  },
  next: {
    borderRadius: "0px 5px 5px 0",
    cursor: "pointer",
    marginRight: 10,
  },
  prev: {
    borderRadius: "5px 0px 0px 5px",
    margin: "0px 1px 0px 10px",
  },
  pageNumber: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    width: 30,
    margin: "0 10px",
  },
  nextBtn: {
    margin: "auto",
  },
  pagination: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export default useStyles;
