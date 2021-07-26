export async function fetchAPIData(url = "", data = {}) {
  return await fetch(url, data)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function fetchResponseText(url = "", data = {}) {
  try {
    return await fetch(url, data).then((response) => response.text());
  } catch (error) {
    return error;
  }
}

export function getDate(ISODateString) {
  const date = new Date(ISODateString);
  return { time: date.toLocaleTimeString(), date: date.toDateString() };
}

export function getDatesDifference(ISODateString) {
  const date1 = new Date(ISODateString);
  const date2 = new Date();

  const diffInSecs = getDifferenceInSeconds(date1, date2);
  if (diffInSecs <= 60) {
    const diffsecs = Math.floor(diffInSecs);
    return `${diffsecs} second${diffsecs > 1 ? "s" : ""} ago`;
  } else {
    const diffInMins = getDifferenceInMinutes(date1, date2);
    if (diffInMins <= 60) {
      return `${Math.floor(diffInMins)} minutes ago`;
    } else {
      const hoursDiff = getDifferenceInHours(date1, date2);
      if (hoursDiff <= 60) {
        return `${Math.floor(hoursDiff)} hours ago`;
      } else {
        const daysDiff = getDifferenceInDays(date1, date2);
        if (daysDiff <= 30) {
          return `${Math.floor(daysDiff)} days ago`;
        } else {
          const monthsDiff = getDifferenceInMonths(date1, date2);
          if (monthsDiff < 12) {
            return `${Math.floor(monthsDiff)} months ago`;
          } else {
            const yearsDiff = getDifferenceInYears(date1, date2);
            return `${Math.floor(yearsDiff)} years ago`;
          }
        }
      }
    }
  }
}

function getDifferenceInYears(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24 * 30 * 12);
}

function getDifferenceInMonths(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24 * 30);
}

function getDifferenceInDays(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
}

function getDifferenceInHours(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60);
}

function getDifferenceInMinutes(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60);
}

function getDifferenceInSeconds(date1, date2) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / 1000;
}
