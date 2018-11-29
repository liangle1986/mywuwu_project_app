import { State, RepeatingDateState, ClockLog } from '@/store/state';
import Cookies from 'js-cookie';
// import {AlipayJSBridge} from 'https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js';

const userInfo = 'xiaomuzhu';

const toKen = 'my_token';

export function getInfo() {
  return localStorage.getItem(userInfo);
}

export function setInfo(username: string) {
  return localStorage.setItem(userInfo, username);
}

export function removeInfo() {
  return localStorage.removeItem(userInfo);
}

// 获取token 值
export function getToken() {
  return Cookies.get(toKen);
}

// 设置token 值
export function setToken(token: string) {
  return Cookies.set(toKen, token);
}

// 删除token 值
export function removeToken() {
  Cookies.remove(toKen);
}



function getDateList(arr: RepeatingDateState[]) {
  const list: string[] = [];
  arr.forEach((item) => {
    if (item.checked) {
      list.push(item.date);
    }
  });
  return list;
}

// 星期与数字相互转化
function transformDate(date: string | number) {
  const weekday = new Map([
    [0, '星期日'],
    [1, '星期一'],
    [2, '星期二'],
    [3, '星期三'],
    [4, '星期四'],
    [5, '星期五'],
    [6, '星期六'],
  ]);

  if (typeof date === 'number') {
    return weekday.get(date);
  } else if (typeof date === 'string') {
    for (const [key, value] of weekday) {
      if (value === date) {
        return key;
      }
    }
  } else {
    return null;
  }
}


// 验证是手机还是浏览器
export function IsPC() {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  Agents.forEach((item) => {
    if (userAgentInfo.indexOf(item) > 0) {
      flag = false;
      return;
    }
  });
  return flag;
}

// 关闭浏览器
export function CloseWebPage() {
    const regex = /micromessenger/i;
    // 判断是否为ie
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('msie') > 0) {
        // 判断是否为ie6
        if (ua.indexOf('msie 6.0') > 0) {
            window.opener = null; window.close();
        } else {
            window.open('', '_top'); window.top.close();
        }
    } else if (ua.indexOf('firefox') > 0) { // 判断是否为firefox
        window.location.href = 'about:blank ';
    } else if (regex.test(ua) === true) {
      // WeixinJSBridge.call('closeWindow');
    } else if (ua.indexOf('alipay') !== -1) {
      // AlipayJSBridge.call('closeWebview');
    } else {  // 其他非firefox等主流浏览器如chrome,safari
        window.opener = null;
        window.open('', '_self', '');
        window.close();
    }
}

const utils = {
  getDateList,
  transformDate,
};

export default utils;
