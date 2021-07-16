export function getSampleData(access_token) {
  fetch("https://api.github.com/gists/4676556", {
    method: "GET",
    headers: {
      Authorization: `token ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((result) => console.log(result));

  fetch("https://api.github.com/gists/4676556/star", {
    method: "GET",
    headers: {
      Authorization: `token ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((result) => {
      console.log(result);
      return result.text();
    })
    .then((data) => console.log(data));
}
