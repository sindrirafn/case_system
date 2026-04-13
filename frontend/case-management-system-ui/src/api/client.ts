import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:5152/api"
});

export default apiClient;