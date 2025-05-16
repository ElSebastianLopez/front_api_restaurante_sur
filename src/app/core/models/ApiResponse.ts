export interface ApiResponse<T> {
  success: boolean;
  warning: boolean;
  message: string;
  data: T;
}
