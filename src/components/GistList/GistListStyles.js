import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  tableCont: {
    boxShadow: "none",
    marginTop: 80,
  },
  table: {
    margin: "auto",
    width: "80%",
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
}));
