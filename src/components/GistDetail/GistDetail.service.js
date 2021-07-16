export function combineFilesData(filesMetaData, fileContent) {
  return filesMetaData.map((fileMetaData, index) => {
    const fileData = { ...fileMetaData };
    fileData.content = fileContent[index];
    return fileData;
  });
}
