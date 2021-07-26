import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  userProfileCont: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    width: "80%",
    margin: "50px auto",
    borderBottom: `1px solid ${theme.palette.primary.medium}`,
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${theme.palette.primary.medium}`,
  },
  profilePic: {
    borderRadius: "50%",
    width: 300,
    marginBottom: 20,
  },
  link: {
    border: `1px solid ${theme.palette.primary.medium}`,
    borderRadius: 5,
    textDecoration: "none",
    color: theme.palette.primary.links,
    padding: "7px 50px",
  },
  username: {
    fontWeight: 500,
  },
  gistCont: {
    padding: 30,
    height: 500,
    overflow: "hidden",
    // "&::-webkit-scrollbar": {
    //   width: 10,
    // },
    // "&::-webkit-scrollbar-track": {
    //   background: "#f1f1f1",
    // },
    // "&::-webkit-scrollbar-thumb": {
    //   background: theme.palette.primary.medium,
    //   borderRadius: 5,
    // },
    // "&::-webkit-scrollbar-thumb:hover": {
    //   background: "#555",
    // },
  },
  fileViewerClass: {
    minHeight: "fit-content",
    overflow: "hidden",
    maxHeight: "100px",
  },
}));

export default useStyles;
