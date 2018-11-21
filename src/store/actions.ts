import { ActionTree } from 'vuex';
import {Toast } from 'vant';
import { login, getToken } from '@/api/user';
import { sync } from '@/api/sync';

const actions: ActionTree<any, any> = {
  // 发起登录
  async login({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await login(data)
      // tslint:disable-next-line:no-shadowed-variable
      .then((res) => res.data)
      .catch((e: string) => Toast.fail('登录失败，系统错误！' + e));
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

  // 获取token
  async getToken({ state, commit }, data) {
    const res: Ajax.AjaxResponse = await getToken(data)
    // tslint:disable-next-line:no-shadowed-variable
    .then((res) => res.data)
    .catch((e: string) => Toast('Token获取失败，系统错误！' + e));
    // const res: any = await getToken(data);
    alert(JSON.stringify(res))
    if (res && '{}' != JSON.stringify(res)) {
      // 设置token
      commit('setToken', res);
      const user = {
        username: data.username,
        password: data.password,
        id: 1,
        createdate: '2018-11-12 21:26:25',
      }
 
      const resq: Ajax.AjaxResponse = await login(user)
      // tslint:disable-next-line:no-shadowed-variable
      .then((resq) => resq.data)
      .catch((e: string) =>  Toast.fail('登录失败，系统错误！' + e));
      // 设置用户信息和用户权限
      if (resq) {
        commit('loginSuccess', resq);
      }
    } else{
      Toast('用户名或密码错误，请重新登录！')
    }
  },
};

export default actions;
