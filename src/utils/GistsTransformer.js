import { map } from "ramda";
import { getDate, getDatesDifference } from "./utils";

export default function GistTransformer(gists) {
  return map(transformGist, gists);
}

function transformGist(gist) {
  const files = getFilesArray(gist);
  const mainFile = files[0];
  return {
    id: gist.id,
    description: gist.description,
    profilePic: gist.owner.avatar_url,
    username: gist.owner.login,
    updatedAt: getDate(gist.updated_at),
    updatedSince: getDatesDifference(gist.updated_at),
    createdAt: getDate(gist.created_at),
    createdSince: getDatesDifference(gist.created_at),
    files,
    mainFile,
    profileUrl: gist.owner.html_url,
    gistUrl: gist.html_url,
    forksCount: gist.forks ? gist.forks.length : null,
  };
}

function getFilesArray(gist) {
  const { files, html_url } = gist;
  const fileNames = Object.keys(gist.files);
  return map((fileName) => {
    const { filename, raw_url } = files[fileName];
    return {
      filename,
      fileUrl: raw_url,
      gistUrl: html_url,
    };
  }, fileNames);
}
