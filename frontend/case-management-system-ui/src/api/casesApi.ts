import apiClient from "./client";
import type { CaseListItem, CaseQueryParams } from "../types/case";

export async function getCases(params?: CaseQueryParams) {
  const response = await apiClient.get<CaseListItem[]>("/cases", {
    params
  });

  return response.data;
}