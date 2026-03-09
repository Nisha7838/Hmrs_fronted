import axios from "axios";

const api = axios.create({
  baseURL: "https://hrms-backend-new-pmn9.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
