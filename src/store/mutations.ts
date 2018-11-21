import { State, ImgInfo, ToKenInfo } from './state';
import _ from '@/utils';

export default {
  // 切换活动图标的状态
  getActivePage(state: State, id: number) {
    state.activePage.map((item) => {
      // 将当前活动的页脚图表点亮
      if (item.id !== id) {
        item.isActived = false;
      } else {
        item.isActived = true;
      }
    });
  },

  // 切换header上图标
  changeHeaderState(state: State, id: number) {
    const { headerInfo } = state;
    switch (id) {
      case 0:
        headerInfo.left = 'shouye_xuanzhong';
        headerInfo.right = ''; // filter
        headerInfo.title = '首页';
        break;
      case 1:
        headerInfo.left = 'star_fill';
        headerInfo.right = '';
        headerInfo.title = '照片';
        break;
      case 2:
        headerInfo.left = 'wode_xuanzhong';
        headerInfo.right = ''; // skin
        headerInfo.title = '设置';
        break;
    }
  },


  // 登陆成功后执行
  loginLoading(state: State, data: any) {
    state.user!.isLogin = 0;
  },
  // 登陆成功后执行
  loginSuccess(state: State, data: any) {
    const currentState = JSON.parse(data.content);

    state.activePage = currentState.activePage;
    state.headerInfo = currentState.headerInfo;
    state.card = currentState.card;
    // state.today = currentState.today;
    state.setting = currentState.setting;

    state.user!.id = data.id;
    state.user!.username = data.username;
    state.user!.url = data.url;
    state.user!.isLogin = 1;
  },
  // 退出登录
  logoutSuccess(state: State) {
    state.user!.id = null;
    state.user!.username = '';
    state.user!.url = 'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/' +
    'be1306d8-e343-2adb-2b04-9a6884300499/pr_source.jpg/1200x630bb.jpg';
    state.user!.isLogin = -1;
  },
  // 是否开启整点报时
  changeHourly(state: State, checked: boolean) {
    state.setting.checked = checked;
  },
  // 是否同步成功
  sync(state: State, isSync: number) {
    state.user!.isSync = isSync;
  },

  // 获取首页图片
  gethomeImg(state: State, homeImg: ImgInfo[]) {
    state!.imgageList = homeImg;
  },

  // 设置token 缓存
  setToken(state: State, data: any) {
    state!.toKen = data;
  },
};
