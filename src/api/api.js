import axios from "axios";

export const API = axios.create({
  baseURL: "http://127.0.0.1:8000", //백엔드단 endpoint
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키사용
});
export default API;
