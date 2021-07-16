export function getPublicGistEP(pageNumber) {
  return `https://api.github.com/gists/public?per_page=14&page=${pageNumber}`;
}

export function getGistsEP() {
  return `https://api.github.com/gists`;
}

export function getStarredGistsEP() {
  return `https://api.github.com/gists/starred`;
}

export function getGistByIdEP(id) {
  return `https://api.github.com/gists/${id}`;
}

export function getUserGistsEP(username) {
  return `https://api.github.com/users/${username}/gists`;
}
