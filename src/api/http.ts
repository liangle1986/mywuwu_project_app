import * as Axios from 'axios';

import config from '@/config';
import router from '@/router';
import { removeInfo, getToken, removeToken, setToken } from '@/utils';

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


/* 请求拦截器 */
// tslint:disable-next-line:no-shadowed-variable
axios.interceptors.request.use((config) => { // 每次请求时会从cookie中获取token
  const token = getToken();
  if (token) {
      // 把token加入到默认请求参数中
      config.headers.common.my_token = token;
  }
  return config;
},  (error) => {
    return Promise.reject(error);
});

/* 响应拦截器 */

axios.interceptors.response.use((response) => { // ①10010 token过期（30天） ②10011 token无效

    if (response.data.code === 10010 || response.data.code === 10011) {
      // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
      removeToken();
      // 到登录页重新获取token
      router.replace({
          path: '/login',
      });

    } else if (response.data.token) { // 判断token是否存在，如果存在说明需要更新token
      // 覆盖原来的token(默认一天刷新一次)
      setToken(response.data.token);

    }
    return response;
}, (error) => {
    return Promise.reject(error);
});

// export default axios;



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
