export interface ApiResponse<T> {
  status: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}
