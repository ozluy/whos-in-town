const API_URL = "https://rest.bandsintown.com/artists/";

export const fetchArtist = async (artistName: string) =>
  await fetch(`${API_URL}${artistName}?app_id=123`)
    .then((res) => res.json())
    .catch((err) => err);

export const fetchArtistEvents = async (artistName: string) =>
  await fetch(`${API_URL}${artistName}/events?app_id=123`)
    .then((res) => res.json())
    .catch((err) => err);


