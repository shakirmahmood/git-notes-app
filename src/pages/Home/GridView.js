import { useHistory } from "react-router";
import GistHeader from "../../components/GistHeader/GistHeader";
import FileViewer from "../../components/FileViewer/FileViewer";

import GistCard from "../../components/GistCard/GistCard";
import { useStyles } from "./GridView.styles";

export default function GridView(props) {
  const { gists } = props;

  const classes = useStyles();
  const history = useHistory();

  function cardClicked(event) {
    debugger;
    const gistid = event.currentTarget.getAttribute("data-gistid");
    history.push(`/gist-details/${gistid}`);
  }

  return (
    <div className={classes.gridView}>
      {gists.map((userGist, index) => {
        const {
          id,
          username,
          mainFile: { filename, content },
          profilePic,
          createdSince,
          gistUrl,
          profileUrl,
        } = userGist;
        return (
          <div onClick={cardClicked} data-gistid={id}>
            <GistCard key={`${index}`}>
              <FileViewer
                filename={filename}
                fileData={content}
                isHeaderRequired={false}
                fileViewerClass={classes.fileViewer}
                onClick={cardClicked}
              />
              <GistHeader
                username={username}
                filename={filename}
                profilePic={profilePic}
                createdSince={createdSince}
                server="Broadcast Server"
                fileUrl={gistUrl}
                profileUrl={profileUrl}
                gistId={id}
              />
            </GistCard>
          </div>
        );
      })}
    </div>
  );
}
