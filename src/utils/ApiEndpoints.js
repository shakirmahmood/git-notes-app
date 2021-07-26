export function getPublicGistEP(pageNumber) {
  return `https://api.github.com/gists/public?per_page=9&page=${pageNumber}`;
}

export function getGistsEP(pageNumber) {
  return `https://api.github.com/gists?per_page=2&page=${pageNumber}`;
}

export function getStarredGistsEP(pageNumber) {
  return `https://api.github.com/gists/starred?per_page=2&page=${pageNumber}`;
}

export function getGistByIdEP(id) {
  return `https://api.github.com/gists/${id}`;
}

export function getUserGistsEP(username, pageNumber) {
  return `https://api.github.com/users/${username}/gists?per_page=2&page=${pageNumber}`;
}
