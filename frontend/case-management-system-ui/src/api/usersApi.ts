import apiClient from "./client";

export interface UserOption {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  role: string;
  team: string;
}

export async function getUsers() {
  const response = await apiClient.get<UserOption[]>("/users");
  return response.data;
}