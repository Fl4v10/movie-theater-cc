import axios from "axios";

const sanitize = (obj: object) =>
  Object.entries(obj)
    .filter(([_, v]) => v != null)
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});

//&language=en-US&query=sort_by%3Dpopularity.desc
const API_KEY = "&api_key=fada6ee5b5be5031a995c825c24bd118";
export const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
// Jack+Reacher

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*"
  }
});

export const discoverMovies = () =>
  axiosInstance.get('/discover/movie?' + "sort_by=popularity.desc&page=1" + API_KEY);

export const searchMovies = (name: string, avgRate?: number) =>
  axiosInstance.get(`/search/movie?&query=?${name}&${API_KEY}`);

export const getMovie = (id: number) =>
  axiosInstance.get(API_KEY + "sort_by=popularity.desc&page=1");

