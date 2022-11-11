import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//authentication
export const signIn = (userInput) => API.post("/api/user/signin", userInput);
export const signUp = (userInput) => API.post("/api/user/signup", userInput);
export const signInAdmin = (userInput) =>
  API.post("/api/owner/signin", userInput);
export const fetchUser = (userInput) =>
  API.post("/api/user/fetchUser", userInput);
