import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://trello-clone-api.onrender.com/api",
})