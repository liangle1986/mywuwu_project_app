import { _post } from './http';

// 同步
export const sync = (data: any) => {
  // tslint:disable-next-line:no-console
  console.log(data);
  const req = {
    data,
    url: 'sync',
  };
  return _post(req);
};
