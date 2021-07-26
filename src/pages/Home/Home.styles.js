import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  gistsCont: { margin: "auto", width: "80%" },
  tableCont: {
    boxShadow: "none",
    marginTop: 80,
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#def5ec",
  },
  tableCell: {
    padding: 5,
    borderBottom: `1px solid ${theme.palette.primary.light}`,
  },
  profilePic: {
    width: "50px",
    borderRadius: "50%",
  },
  viewChangeBtns: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 5px",
  },
  viewChangeBtn: {
    color: theme.palette.primary.medium,
    cursor: "pointer",
    fontSize: 30,
    padding: "0 10px",
    "&:hover": {
      color: theme.palette.primary.main,
    },
  },
  selectedView: {
    color: theme.palette.primary.main,
  },
  gridBtn: {
    borderRight: `1px solid ${theme.palette.primary.medium}`,
  },
}));
