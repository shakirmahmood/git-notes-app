import { map, addIndex } from "ramda";

import CodeIcon from "@material-ui/icons/Code";

import useStyles from "./FileViewStyle";

const createRows = (fileData) => {
  if (fileData) {
    const fileContentArray = fileData ? fileData.split("\n") : fileData;
    const mapIndexed = addIndex(map);
    return mapIndexed((line, index) => {
      return (
        <tr key={`fileline-${index}`}>
          <td>{index + 1}</td>
          <td>{line}</td>
        </tr>
      );
    }, fileContentArray);
  }
};

function FileViewer(props) {
  const { fileData, filename, isHeaderRequired, fileViewerClass } = props;
  const rows = createRows(fileData);

  const classes = useStyles();

  return (
    <div className={`${fileViewerClass} ${classes.fileCont}`}>
      {isHeaderRequired && (
        <div className={classes.fileHeader}>
          <CodeIcon className={`${classes.codeIcon} font-size-10`} />
          {filename}
        </div>
      )}
      <table className={"font-size-15"}>
        <colgroup>
          <col style={{ width: 80 }} />
          <col />
        </colgroup>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default FileViewer;
