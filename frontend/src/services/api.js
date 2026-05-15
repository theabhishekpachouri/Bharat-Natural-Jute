import axios from 'axios';
const BACKEND_URL = 'http://localhost:5000'; 
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("bnj_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authApi = {
  signup: (data) => api.post("/auth/signup", data).then((r) => r.data),
  login: (data) => api.post("/auth/login", data).then((r) => r.data),
  me: () => api.get("/auth/me").then((r) => r.data),
};

export const productsApi = {
  list: (params) => api.get("/products", { params }).then((r) => r.data),
  get: (slug) => api.get(`/products/${slug}`).then((r) => r.data),
  categories: () => api.get("/products/categories").then((r) => r.data),
};

export const ordersApi = {
  create: (data) => api.post("/orders", data).then((r) => r.data),
  get: (id) => api.get(`/orders/${id}`).then((r) => r.data),
};

export const blogApi = {
  list: () => api.get("/blog").then((r) => r.data),
  get: (slug) => api.get(`/blog/${slug}`).then((r) => r.data),
};

export const contactApi = {
  submit: (data) => api.post("/contact", data).then((r) => r.data),
  newsletter: (email) => api.post("/newsletter", { email }).then((r) => r.data),
};