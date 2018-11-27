import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home/Home.vue';
import Habit from './views/Habit/Habit.vue';
import Setting from './views/Setting/Setting.vue';

const New = (r: any) => import(/* webpackChunkName: "about" */ '@/views/New/New.vue'); // 新建

// const Edit = (r: any) => import(/* webpackChunkName: "about" */ '@/views/Edit/Edit.vue');  // 编辑

// const Library = (r: any) => import(/* webpackChunkName: "about" */ '@/views/New/Library/Library.vue');  // 习惯库

const NewHabit = (r: any) => import(/* webpackChunkName: "about" */ '@/views/New/Habit/Habit.vue'); // 新建习惯惯

// const Calendar = (r: any) => import('@/views/Edit/Calendar/Calendar.vue');  // 日历

const Feedback = (r: any) => import('@/views/Feedback/Feedback.vue'); // 反馈

const UpdateLog = (r: any) =>  import('@/views/UpdateLog/UpdateLog.vue'); // 更新日志

const Login = (r: any) => import('@/views/Login/Login.vue'); // 登录

const Error = (r: any) => import('@/views/404/error.vue'); // 错误

const Follow = (r: any) => import('@/views/Follow/Follow.vue'); // 评论

const Redirect = (r: any) => import('@/components/common/LoginRedirect/Redirect.vue'); // 登录回调


Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'today',
      component: Home,
      meta: { main: true },
    },
    {
      path: '/habit',
      name: 'habit',
      component: Habit,
      meta: { main: true },
      children: [
        // {
        //   path: 'new',
        //   name: 'new',
        //   component: NewHabit,
        // },
      ],
    },
    {
      path: '/setting',
      name: '设置',
      component: Setting,
      meta: { main: true },
    },
    {
      path: '/feedback',
      name: '反馈',
      component: Feedback,
    },
    {
      path: '/update',
      name: '更新日志',
      component: UpdateLog,
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
    },
    {
      path: '/Follow',
      name: '评论',
      component: Follow,
    },
    {
      path: '/redirect',
      name: '评论',
      component: Redirect,
    },
    // {
    //   path: '/card',
    //   name: '卡片管理',
    //   component: Card,
    //   children: [
    //     {
    //       path: 'receive',
    //       name: '今日卡片',
    //       component: Receive,
    //     },
    //   ],
    // },
    {
      path: '/error',
      name: '找不到该页面',
      component: Error,
    },
    {
      path: '*',
      redirect: '/error',
    },
  ],
});
