// import * as moment from 'moment';
import {getToken } from '@/utils';
export interface ClockLog {
  id: number;
  time?: string | undefined;
  isFinished: boolean;
  message?: string;
}
// 用户信息 logintype 0:本地登录， 2：支付宝授权登录 3：微信授权登录
export interface UserState {
  username: string | undefined;
  id: string | undefined;
  createdTime: string | undefined;
  url: string;
  isLogin: number;
  isSync: number;
  loginType: number;
}

export interface SettingState {
  checked: boolean;
  url: string;
}

export interface TimeSlotList {
  id: number;
  title: string;
}

export interface RemindState {
  id: number;
  remind: string;
  isOpen: boolean;
}

export interface RepeatingDateState {
  id: number;
  date: string;
  checked: boolean;
}

export interface Card {
  src: string;
  content?: string;
}

// 二级菜单
export interface PageInfo {
  id: number;
  isActived: boolean;
  name: {
    defaultName: string;
    activedName: string;
  };
  path: string;
  tagName: string;
}

// 头部菜单
export interface HeaderInfo {
  left?: string;
  title: string;
  right?: string;
}

// 图片信息
export interface ImgInfo {
  id: number;
  url: string;
  createdate: string;
  size: number;
  name: string;
  showOrder: number;
  desc: string;
}

// 设置token信息
export interface ToKenInfo {
  code: string | undefined;
  token: string | undefined;
}


// 设置信息
export interface MessageInfo {
  code: string | undefined;
  message: string | undefined;
}



export interface State {
  activePage: PageInfo[];
  headerInfo: HeaderInfo;
  card: Card;
  // habitList: HabitList[];
  // today: {
  //   active: string[] | never[] | number[];
  //   finishedDate: moment.Moment[] | never[];
  //   isReceived: boolean;
  // };
  setting: SettingState;
  user?: UserState;
  imgInfo: ImgInfo;
  imgageList: ImgInfo[];
  toKen: ToKenInfo | undefined;
  mess: MessageInfo;
}






// 初始状态
const state: State = {

  // Footer 默认值
  activePage: [
    {
      id: 0,
      isActived: true,
      name: {
        defaultName: 'shouye',
        activedName: 'shouye_xuanzhong',
      },
      path: '/',
      tagName: '首页',
    },
    {
      id: 1,
      isActived: false,
      name: {
        defaultName: 'star',
        activedName: 'star_fill',
      },
      path: '/habit',
      tagName: '照片',
    },
    {
      id: 2,
      isActived: false,
      name: {
        defaultName: 'wode',
        activedName: 'wode_xuanzhong',
      },
      path: '/setting',
      tagName: '我的',
    },
  ],
  headerInfo: {
    left: 'letter',
    title: '首页',
    right: '', // filter
  },
  // today: {
  //   active: [0],
  //   finishedDate: [],
  //   isReceived: false,
  // },
  setting: {
    checked: false,
    url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
  },
  card: {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-5xlxmMc1UjkLOsMSPPX9sKgNr3XuCNHCCCwI__iXCx2zftWo',
    content: '1',
  },
  user: {
    isLogin: -1,
    username: '',
    id: '',
    createdTime: '',
    isSync: -1,
    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499' +
      '/pr_source.jpg/1200x630bb.jpg',
    loginType: 0,
  },
  imgageList: [
    {id: 0, name: '', size: 0,
    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499' +
    '/pr_source.jpg/1200x630bb.jpg', createdate: '2018-01-01', showOrder: 0, desc: '备注'},
    {id: 1, name: '', size: 0,
    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499' +
    '/pr_source.jpg/1200x630bb.jpg', createdate: '2018-01-01', showOrder:  1, desc: '备注'},
    {id: 2, name: '', size: 0,
    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499' +
    '/pr_source.jpg/1200x630bb.jpg', createdate: '2018-01-01', showOrder: 2, desc: '备注'},
    {id: 3, name: '', size: 0,
    url: 'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499' +
    '/pr_source.jpg/1200x630bb.jpg', createdate: '2018-01-01', showOrder: 3, desc: '备注'},
  ],
  imgInfo: {id: 0, name: '', size: 0,
  url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
   createdate: '2018-01-01', showOrder: 0, desc: '备注'},
   toKen: {
     code: '',
     token: getToken(),
   },
   mess: {
     code: '',
     message: '获取消息啦！',
   },
};

export default state;
