// src/services/authService.ts
import api from "./api";

export const loginUser = (data: { email: string; password: string }) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data: { email: string; password: string }) => {
  return api.post("/auth/register", data);
};