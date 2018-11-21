import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
// import '@/assets/iconfont.js';
import FastClick from 'fastclick';
import 'vant/lib/index.css';

import '@/assets/iconfont/iconfont.css';
// 样式统一
import 'normalize.css';
// import 'vue2-animate/dist/vue2-animate.min.css';

import VueLazyComponent from '@xunlei/vue-lazy-component';
// import VueSkeletonLoading from 'vue-skeleton-loading';


// 移动端300ms延迟问题，同时解决点透事件的出现。
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  });
}


Vue.use(VueLazyComponent);

// Vue.use(VueSkeletonLoading);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
