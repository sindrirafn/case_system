import apiClient from "./client";

export interface CustomerOption {
  id: number;
  name: string;
  email: string;
  companyName: string;
  phoneNumber: string;
}

export async function getCustomers() {
  const response = await apiClient.get<CustomerOption[]>("/customers");
  return response.data;
}