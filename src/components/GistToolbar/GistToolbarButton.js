import useStyles from "./GistToolbar.styles";

export default function GistToolbarBtn(props) {
  const { label, callBack, color, children } = props;
  const classes = useStyles();

  return (
    <div className={`${classes.btns} ${classes[color]}`} onClick={callBack}>
      <span className={classes.icons}>{children}</span>
      {label && <span>{label}</span>}
    </div>
  );
}
