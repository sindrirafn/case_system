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

export interface CaseComment {
  id: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
}

export interface CaseDetails {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerCompanyName: string;
  customerPhoneNumber: string;
  assignedUserId: number | null;
  assignedUserName: string;
  createdByUserId: number;
  createdByUserName: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
  comments: CaseComment[];
}

export interface CaseQueryParams {
  status?: string;
  priority?: string;
  category?: string;
  assignedUserId?: number;
  search?: string;
}

export interface UpdateCaseRequest {
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  customerId: number;
  assignedUserId: number | null;
  dueDate: string | null;
}

export interface AddCommentRequest {
  userId: number;
  content: string;
}

export interface CreateCaseRequest {
  title: string;
  description: string;
  status: string;
  priority: string;
  category: string;
  customerId: number;
  assignedUserId: number | null;
  createdByUserId: number;
  dueDate: string | null;
}