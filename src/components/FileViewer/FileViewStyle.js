import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fileCont: {
    overflowX: "hidden",
    boxShadow: "0px 2px 10px 1px rgb(0 0 0 / 20%);",
    borderRadius: 5,
    lineHeight: 1.25,
    paddingBottom: 10,
    margin: "30px 0 50px",
    whiteSpace: "",
    // overflow: "auto",
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
  fileHeader: {
    borderBottom: `1px solid ${theme.palette.primary.medium}`,
    color: theme.palette.primary.links,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    padding: 7,
  },
  codeIcon: {
    border: `1px solid ${theme.palette.primary.dark}`,
    margin: "0 10px",
    width: 20,
    height: 15,
  },
  "@global": {
    "td:nth-child(1)": {
      color: theme.palette.primary.medium,
      textAlign: "right",
      paddingRight: 20,
    },
  },
}));

export default useStyles;
