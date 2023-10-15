# 网络请求 Axios

## 安装 Axios

```bash

npm install axios

# 全局安装 serve 用于本地测试服务
npm install -g serve

```

## 二次封装

在service文件夹下新建index.ts文件

```ts
import { BASE_URL, TIME_OUT } from './config';
import XsRequest from './request';

const xsRequest = new XsRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestFailFn: (config) => {
      return config;
    }
  }
});

export default xsRequest;
```

在service文件夹下新建request文件夹，并创建 request/index.ts、request/types.ts文件

```ts
// type.ts
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

//index.ts
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
```

在service文件夹下新建config文件夹，并创建 config/index.ts文件

```ts
export const BASE_URL = 'http://codercba.com:9002';
export const TIME_OUT = 10000;
// // 区分开发环境和生产环境
// let BASE_URL = '';
// if (process.env.NODE_ENV === 'development') {
//   BASE_URL = 'http://codercba.dev:9002';
// } else {
//   BASE_URL = 'http://codercba.prod:9002';
// }

// export { BASE_URL };
```
