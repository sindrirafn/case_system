import apiClient from "./client";
import type {
  AddCommentRequest,
  CaseDetails,
  CaseListItem,
  CaseQueryParams,
  UpdateCaseRequest
} from "../types/case";

export async function getCases(params?: CaseQueryParams) {
  const response = await apiClient.get<CaseListItem[]>("/cases", {
    params
  });

  return response.data;
}

export async function getCaseById(id: number) {
  const response = await apiClient.get<CaseDetails>(`/cases/${id}`);
  return response.data;
}

export async function updateCase(id: number, request: UpdateCaseRequest) {
  const response = await apiClient.put<CaseDetails>(`/cases/${id}`, request);
  return response.data;
}

export async function addComment(id: number, request: AddCommentRequest) {
  const response = await apiClient.post(`/cases/${id}/comments`, request);
  return response.data;
}