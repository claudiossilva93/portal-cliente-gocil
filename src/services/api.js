import axios from "axios";
import { getHeader } from "./auth";

const api = axios.create({
  baseURL: "http://fluigqa.gocil.com.br:8181/api/public/ecm/"
});

api.interceptors.request.use(async config => {
  config.headers = getHeader(config.baseURL + config.url);
  return config;
});

export default api;
