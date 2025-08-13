import axios from "axios";
import { API_KEY } from "../config/api";

const API_URL = "https://api.kinopoisk.dev/v1.4";

const api = axios.create({
  baseURL: API_URL,
  headers: { "X-API-KEY": API_KEY },
});

export async function imageCenter(limit = 5) {
  const res = await api.get("/movie", {
    params: {
      "rating.kp": "8-9",
      limit,
      sortField: "year",
      sortType: "-1",
    },
  });
  return res.data.docs;
}

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

export async function getNewRelease(limit = 4) {
  const res = await api.get("/movie", {
    params: {
      limit,
      "year": "2025-2025",
      sortField: "votes.kp",
      sortType: "-1",
    },
  });
  return res.data.docs;
}

export async function getRecommendedMovies(limit = 4) {
  const res = await api.get("/movie", {
    params: {
      limit,
      "year": "1999-2020",
      sortField: "votes.kp",
      sortType: "-1",
    },
  });
  return res.data.docs;
}



export default {
  getRecommended,
  getTrending,
  getNewRelease,
  getRecommendedMovies,
  imageCenter,
};
