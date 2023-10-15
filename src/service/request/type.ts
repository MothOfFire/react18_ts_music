import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

// 针对 AxiosRequestConfig 进行扩展
export interface XSInterceptors<T = AxiosResponse> {
  requestSuccessFn?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig;
  requestFailFn?: (error: any) => any;
  responseSuccessFn?: (response: T) => T;
  responseFailFn?: (error: any) => any;
}

export interface XSRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XSInterceptors<T>;
}
