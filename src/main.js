import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// 全剧样式
import './assets/css/global.css'
// andt
import './plugins/andt'
import { VueAxios } from './utils/request'

import bootstrap from './core/bootstrap'
// 加密
import md5 from 'js-md5';

import '@/core/directives/index'
// import PermissionHelper from '@/core/permission/permission'
// Vue.use(PermissionHelper)

const XHCopy = (bos) => {
  let ar = bos instanceof Array ? [] : {};
  for (let k in bos){
    let vul = bos[k]
    // eslint-disable-next-line valid-typeof
    ar[k] = vul !== null && typeof vul === "Object" ? XHCopy(vul) : vul
  }
  return ar;
};
Vue.prototype.$md5 = md5;
Vue.prototype.$XHCopy = XHCopy;

// permission 路由守卫
import './permission'
Vue.use(VueAxios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
