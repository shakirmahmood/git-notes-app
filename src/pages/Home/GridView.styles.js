import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  gridView: {
    display: "grid",
    grid: "repeat(3, auto) / repeat(3, auto)",
    gridGap: 50,
  },
  fileViewer: {
    height: 200,
    boxShadow: "unset",
    overflow: "hidden",
    marginBottom: 20,
    borderBottom: `1px solid ${theme.palette.primary.medium}`,
  },
  card: {
    padding: 0,
  },
}));
