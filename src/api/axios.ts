import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseDefaultType } from '@/types/responseType';
import CustomError from '@/utils/error/CustomError';
import { tokenManager } from '@/utils/tokenManager';
import { refreshToken } from './services/authService';
import { endpoints } from './endpoints';

const apiClient = (() =>
  axios.create({
    baseURL: import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  }))();

apiClient.interceptors.request.use(config => {
  const token = tokenManager.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

let isRefreshing = false;
let requestQueue: (() => void)[] = [];

apiClient.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    const message: string = error.response?.data?.message || '';

    const isEmailCodeError = message.includes('인증 코드');
    const isRefreshRequest = originalRequest.url?.includes(endpoints.auth.refreshToken);
    const alreadyTried = originalRequest._retry;

    // 토큰 만료 + 재시도 안 했던 요청만
    if (error.response?.status === 401 && !alreadyTried && !isRefreshRequest && !isEmailCodeError) {
      originalRequest._retry = true;

      // 이미 갱신 중이면 그걸 기다렸다가 사용
      if (isRefreshing) {
        // 다른 요청들이 기다리도록 큐에 등록
        return new Promise(resolve => {
          requestQueue.push(() => {
            const token = tokenManager.getToken();

            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      // 토큰 재발급 로직
      isRefreshing = true;
      tokenManager.clearToken();

      try {
        const newToken = await refreshToken();

        // 대기 중이던 요청들 다시 실행
        requestQueue.forEach(cb => cb());
        requestQueue = [];

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return await apiClient(originalRequest);
      } catch (err) {
        if (err instanceof CustomError) {
          if (typeof window !== 'undefined') window.location.replace(`/login?failMessage=${err.message}`);
        }
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export const fetchData = async <RequestType = undefined, ResponseDataType = undefined, ErrorType = unknown>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: RequestType,
  config?: AxiosRequestConfig,
): Promise<ResponseDefaultType<ResponseDataType>> => {
  try {
    let response: AxiosResponse<ResponseDefaultType<ResponseDataType>>;

    switch (method) {
      case 'GET':
        response = await apiClient.get(endpoint, config);
        break;
      case 'POST':
        response = await apiClient.post(endpoint, data, config);
        break;
      case 'PUT':
        response = await apiClient.put(endpoint, data, config);
        break;
      case 'DELETE':
        response = await apiClient.delete(endpoint, {
          data: data,
        });
        break;
      default:
        throw new Error('Invalid HTTP method');
    }
    return response.data;
  } catch (error: any) {
    throw new CustomError<ErrorType>(
      error.response?.data?.message || error.message || 'An unknown error occurred',
      error.response?.status,
      error.response?.data.data,
    );
  }
};
