import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { XSRequestConfig } from './type';

class XSRequest {
  instance: AxiosInstance;
  // request实例 => axios 实例
  constructor(config: XSRequestConfig) {
    this.instance = axios.create(config);

    // 给每个instance实例添加拦截器(请求、响应)
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (err) => {
        return err;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );

    // 给特定的instance实例添加拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors?.requestSuccessFn,
        config.interceptors?.requestFailFn
      );
    }
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailFn
    );
  }

  // 封装网络请求的方法
  request<T = any>(config: XSRequestConfig<T>) {
    // 单次请求成功的拦截处理
    // if (config.interceptors?.requestSuccessFn) {
    //   config = config.interceptors.requestSuccessFn(config);
    // }
    //返回 Promise
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单次请求成功的拦截处理
          if (config.interceptors?.responseSuccessFn) {
            config.interceptors.responseSuccessFn(res);
          }
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T = any>(config: XSRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' });
  }
  post<T = any>(config: XSRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' });
  }
  delete<T = any>(config: XSRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' });
  }
  patch<T = any>(config: XSRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' });
  }
}

export default XSRequest;
