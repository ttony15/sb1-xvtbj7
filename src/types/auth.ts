export interface User {
  id: string;
  email: string;
  name: string;
  onboardingCompleted?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}