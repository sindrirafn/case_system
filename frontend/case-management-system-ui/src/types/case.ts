export interface CaseListItem {
  id: number;
  title: string;
  status: string;
  priority: string;
  category: string;
  customerName: string;
  assignedUserName: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
}

export interface CaseQueryParams {
  status?: string;
  priority?: string;
  category?: string;
  assignedUserId?: number;
  search?: string;
}