export type UserRole = "Employer" | "Job Seeker";
export type User = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  password: string;
  auth_token: string;
  role: UserRole;
};
