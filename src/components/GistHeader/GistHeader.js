import "./GistHeader.css";
import "../../main.css";

export default function GistHeader(props) {
  const {
    username,
    filename,
    profilePic,
    createdSince,
    server,
    gistId,
    children,
  } = props;

  return (
    <div className="gist-header">
      <div className="profile">
        <img className="profile-pic" src={profilePic} alt="A person" />
        <div>
          <div>
            <a className="link" href={`/profile/${username}/1`}>
              {username}
            </a>{" "}
            /{" "}
            <a className="link" href={`/gist-details/${gistId}`}>
              <strong>{filename}</strong>
            </a>
          </div>
          <div className="font-size-12 lightgray">{createdSince}</div>
          <div className="font-size-10 lightgray">{server}</div>
        </div>
      </div>
      {children}
    </div>
  );
}
