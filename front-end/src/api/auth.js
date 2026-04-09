import axios from "axios";

const API = axios.create({
  baseURL: process.env.VITE_API_BASE_URL, // your backend
});

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);
