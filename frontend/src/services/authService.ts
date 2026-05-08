import api from "./api";

export const loginUser = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const registerUser = (data: { email: string; password: string }) =>
  api.post("/auth/register", data);

export const verifyOtp = (data: { email: string; otp: string }) =>
  api.post("/auth/verify-otp", data);

export const resendOtp = (data: { email: string }) =>
  api.post("/auth/resend-otp", data);