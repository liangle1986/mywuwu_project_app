import { ActionTree } from 'vuex';
import {Toast } from 'vant';
import { login, getToken, aliUserLogin } from '@/api/user';
import { sync } from '@/api/sync';

const actions: ActionTree<any, any> = {
  // 发起登录
  async login({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await login(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      .catch((e: string) => Toast('登录失败，系统错误！' + e));
    if (res) {
      commit('loginSuccess', res);
    }
  },

  // 数据同步
  async sync({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await sync(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      .catch((e: string) => Toast.fail('数据同步失败，系统错误！' + e));
    if (res) {
      commit('sync', 1);
    }
  },
    // 获取图片信息
    async getImageInfo({ state, commit }, data) {
      const res: Ajax.AjaxResponse = await sync(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      // tslint:disable-next-line:no-console
      .catch((e: string) => console.error(e));
      if (res) {
        commit('getImageInfo', 1);
      }
    },

  // 获取本地token 换取用户信息
  async getToken({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await getToken(data)
    // tslint:disable-next-line:no-shadowed-variable
    .then((res) => res.data)
    .catch((e: string) => Toast('Token获取失败,系统错误！' + e));
    if (res && '{}' !== JSON.stringify(res)) {
      // 设置token
      commit('setToken', res);
      const user = {
        username: data.username,
        password: data.password,
        id: 1,
        createdate: '2018-11-12 21:26:25',
        loginType: 1,
      };
      const resq: Ajax.AjaxResponse = await login(user)
      // tslint:disable-next-line:no-shadowed-variable
      .then((resq) => resq.data)
      .catch((e: string) =>  Toast('登录失败，系统错误！' + e));
      // 设置用户信息和用户权限
      if (resq) {
        commit('loginSuccess', resq);
      }
    } else {
      Toast('用户名或密码错误，请重新登录！');
    }
  },

    // 第三方等登录
    async threeLogin({ state, commit }, data) {
      const res: Ajax.AjaxResponse = await aliUserLogin(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      .catch((e: string) => Toast('获取连接,系统错误！' + e));
      if (res) {
        commit('loginSuccess', res);
      }
    },
};

export default actions;
