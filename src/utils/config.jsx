import axios from "axios";

export const API = axios.create({
  baseURL: "https://books-backend-production-6f61.up.railway.app/",
});
