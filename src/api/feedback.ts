import { _post } from './http';

// 反馈
export const feedback = (data: any) => {
  const req = {
    data,
    url: 'feedback',
  };
  return _post(req);
};
