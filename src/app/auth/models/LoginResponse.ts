interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: null;
  role: string;
  created_at: string;
  updated_at: string;
}

interface ResponseData {
  user: User;
  token: string;
}
export interface LoginResponse {
  status: string;
  message: string;
  data: ResponseData;
}
