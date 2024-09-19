import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jobportal.zingthing.in/api",
});

export default apiClient;
