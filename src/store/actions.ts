import { ActionTree } from 'vuex';

import { login, getToken } from '@/api/user';
import { sync } from '@/api/sync';

const actions: ActionTree<any, any> = {
  // 发起登录
  async login({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await login(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      // tslint:disable-next-line:no-console
      .catch((e: string) => console.error(e));
    if (res) {
      commit('loginSuccess', res);
    }
  },

  // 数据同步
  async sync({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await sync(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      // tslint:disable-next-line:no-console
      .catch((e: string) => console.error(e));
    if (res) {
      commit('sync', 1);
    }
  },

  // 获取token
  async getToken({ state, commit }, data) {
    // const res: Ajax.AjaxResponse = await getToken(data)
    // // tslint:disable-next-line:no-shadowed-variable
    // .then((res) => res.data)
    // // tslint:disable-next-line:no-console
    // .catch((e: string) => console.error(e));
    const res: any = await getToken(data);
    if (res) {
      commit('setToken', res);
    }
  },
};

export default actions;
