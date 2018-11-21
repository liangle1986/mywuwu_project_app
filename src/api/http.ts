import * as Axios from 'axios';

import config from '@/config';
import router from '@/router';
import { removeInfo } from '@/utils';

const baseURL = config.url.basicUrl;
const axios = Axios.default.create({
  baseURL, // api请求的baseURL
  timeout: 0,
  // withCredentials: true, // 允许跨域 cookie
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  maxContentLength: 2000,
  transformResponse: [
    (data) => {
      try {
        data = JSON.parse(data);
      } catch (e) {
        data = {};
      }
      if (data.status === 403) {
        removeInfo();
        router.push('/login');
      }
      return data;
    },
  ],
});

// get
// tslint:disable-next-line:variable-name
export const _get = (req: any) => {
  return axios.get(req.url, { params: req.data });
};

// post
// tslint:disable-next-line:variable-name
export const _post = (req: any) => {
  return axios({ method: 'post', url: `/${req.url}`, data: req.data });
};

// patch
// tslint:disable-next-line:variable-name
export const _put = (req: any) => {
  return axios({ method: 'put', url: `/${req.url}`, data: req.data });
};

// delete
// tslint:disable-next-line:variable-name
export const _delete = (req: any) => {
  return axios({ method: 'delete', url: `/${req.url}`, data: req.data });
};
