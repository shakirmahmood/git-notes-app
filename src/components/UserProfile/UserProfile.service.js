export function combineFilesData(userGists, fileContent) {
  return userGists.map((userGist, index) => {
    const gist = { ...userGist };
    gist.mainFile.content = fileContent[index];
    return gist;
  });
}
