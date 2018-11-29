import { _get, _post, _delete } from './http';

// 登录
export const login = (data: any) => {
  const req = {
    data,
    url: 'users/test',
  };
  return _get(req);
};

// 获取用户信息
export const userInfo = (data: any) => {
  const req = {
    data,
    url: 'admin/user_info',
  };
  return _get(req);
};

// 改变用户头像
export const changeAvatar = (data: any) => {
  const req = {
    data,
    url: 'admin/change_avatar',
  };
  return _get(req);
};

// 获取token信息
export const getToken = (data: any) => {
  const req = {
    data,
    url: 'login',
  };
  return _get(req);
  // return {
  //   code: 'A-0001'
  // , token: 'ASDFASDFDADSFDASFDASDFASDFASD-ASDFASDFASDFASDF-ASDVASDVASVDAS',
  // };
};

// 支付宝获取三方登录信息链接
export const aliThreeLogin = (data: any) => {
  const req = {
    data,
    url: 'alipay/aliGetToken',
  };
  return _get(req);
};

// 支付宝获取三方登录信息token
export const aliThreeToken = (data: any) => {
  const req = {
    data,
    url: 'alipay/alipayToken',
  };
  return _get(req);
};


// 支付宝获取三方登录用户信息
export const aliUserLogin = (data: any) => {
  const req = {
    data,
    url: 'alipay/alipayTokenUserInfo',
  };
  return _get(req);
};
