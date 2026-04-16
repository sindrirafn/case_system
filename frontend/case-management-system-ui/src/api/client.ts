import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5152/api"
});

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem("casevia-auth");

  if (stored) {
    const authUser = JSON.parse(stored);
    if (authUser?.token) {
      config.headers.Authorization = `Bearer ${authUser.token}`;
    }
  }

  return config;
});

export default apiClient;