const API_KEY = "TGXwqBN5F_wS0Tb7YqWQDq_pE3seRe_TOnxXiND9FAA";

export const fetchLocations = ({ coords, limit = 30 }) =>
  fetch(
    `https://discover.search.hereapi.com/v1/discover?apikey=${API_KEY}&q=Covid&at=${coords.join(
      ",",
    )}&limit=${limit}`,
  ).then((res) => res.json());

export const getAutoCompleteTerms = (searchQuery) =>
  fetch(
    `https://photon.komoot.io/api?lang=en&limit=5&q=${searchQuery}`,
  ).then((res) => res.json());
