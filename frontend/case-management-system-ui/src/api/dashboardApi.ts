import apiClient from "./client";

export interface DashboardSummary {
  totalOpenCases: number;
  criticalCases: number;
  casesAssignedToUser: number;
  resolvedLast7Days: number;
  newLast7Days: number;
  overdueOpenCases: number;
}

export async function getDashboardSummary(userId?: number) {
  const response = await apiClient.get<DashboardSummary>("/dashboard/summary", {
    params: userId ? { userId } : {}
  });

  return response.data;
}