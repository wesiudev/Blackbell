import axios from "axios";

const url = process.env.URL || "http://localhost:5000";

const API = axios.create({ baseURL: url });

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
//categories
export const addCategory = (req) => API.post("/api/category", req);
export const removeCategory = (req) => API.post("/api/category", req);
export const fetchCategories = (req) => API.get("/api/category");
//products
export const addProduct = (req) => API.post("/api/category/createProduct", req);
export const deleteProduct = (req) =>
  API.post("/api/category/deleteProduct", req);
