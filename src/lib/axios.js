import axios from "axios";
const api = axios.create({
  baseURL: "https://think-board-mern-backend.vercel.app/",
});
export default api;
