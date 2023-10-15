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
