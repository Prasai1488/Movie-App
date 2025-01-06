import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3", // Base URL for API
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
  },
});

export default axiosInstance;
