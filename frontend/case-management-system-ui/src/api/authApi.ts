import apiClient from "./client";
import type { LoginRequest, LoginResponse } from "../types/auth";

export async function login(request: LoginRequest) {
  const response = await apiClient.post<LoginResponse>("/auth/login", request);
  return response.data;
}