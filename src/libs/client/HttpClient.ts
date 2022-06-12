import axios from 'axios';

type RequestData = Record<string, any>;
const http = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

class HttpClient {
  static get<T>(url: string, params?: RequestData): Promise<T> {
    return http.get<T>(url, { ...params }).then((res) => res.data);
  }

  static post<T>(url: string, data: RequestData): Promise<T> {
    return http.post<T>(url, data).then((res) => res.data);
  }

  static put<T>(url: string, data?: any): Promise<T> {
    return http.put<T>(url, data).then((res) => res.data);
  }

  static delete<T>(url: string, params?: RequestData): Promise<T> {
    return http.delete<T>(url, { ...params }).then((res) => res.data);
  }
}

export default HttpClient;
