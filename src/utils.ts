import { State, RepeatingDateState, ClockLog } from '@/store/state';

const userInfo = 'xiaomuzhu';

export function getInfo() {
  return localStorage.getItem(userInfo);
}

export function setInfo(username: string) {
  return localStorage.setItem(userInfo, username);
}

export function removeInfo() {
  return localStorage.removeItem(userInfo);
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

const utils = {
  getDateList,
  transformDate,
};

export default utils;
