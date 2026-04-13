import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5152/api",
});

export default apiClient;