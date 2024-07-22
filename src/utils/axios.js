import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URI, // (Optional) Add base URL if applicable
  headers: {
    "Content-Type": "application/json", // Add default headers as needed
  },
});
