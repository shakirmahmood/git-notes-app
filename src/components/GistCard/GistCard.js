import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function GistCard(props) {
  const classes = useStyles();
  const { children } = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
}
