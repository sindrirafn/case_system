export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: string;
}

export interface AuthUser {
  token: string;
  userId: number;
  fullName: string;
  email: string;
  role: string;
}