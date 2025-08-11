import axios from "axios";

const API_KEY = "EPJEEZD-RPT42ZD-GS9F7VW-E5NV13Z";
const API_URL = "https://api.kinopoisk.dev/v1.4";

const api = axios.create({
  baseURL: API_URL,
  headers: { "X-API-KEY": API_KEY },
});

export async function getRecommended(limit = 4) {
  const res = await api.get("/movie", {
    params: {
      "rating.kp": "9-10",
      limit,
      sortField: "year",
      sortType: "-1",
    },
  });
  return res.data.docs;
}

export async function getTrending(limit = 4) {
  const res = await api.get("/movie", {
    params: {
      limit,
      "year": "2022-2024",
      sortField: "votes.kp",
      sortType: "-1",
    },
  });
  return res.data.docs;
}

export default {
  getRecommended,
  getTrending,
};
