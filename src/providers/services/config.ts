import axios from "axios";
// const BASE_URL = "http://199.168.1.78:8000/api/v1"
// const BASE_URL = "http://localhost:8000/api/v1"
const BASE_URL = "https://expertnaire-be.onrender.com/api/v1"

export const axiosPublic = axios.create({
    baseURL: "http://localhost:3333/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

axios.defaults.baseURL = BASE_URL;

axios.defaults.withCredentials = false;

export function setToken(token: string | null): void {
  if (token) {
    axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : "";
  }
}
