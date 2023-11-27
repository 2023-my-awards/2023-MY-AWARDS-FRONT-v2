import axios from "axios";

export const API = axios.create({
  baseURL: "https://2023-my-awards.com", //백엔드단 endpoint
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키사용
});
export default API;
