import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
// 全剧样式
import './assets/css/global.css'
// andt
import './plugins/andt'
import { VueAxios } from './utils/request'
import i18n from './internationalization';

import bootstrap from './core/bootstrap'
// 加密
import md5 from 'js-md5';
import * as XLSX from 'xlsx';
import oaSvg from './assets/OASvg.json'

import directives from '@/core/directives/index'
import jurisdictionTb from '@/core/jurisdictionTb/index'
import imports from '@/core/jurisdictionTb/imports'
import resetSetItem from '@/store/resetSt'
import PermissionHelper from '@/core/permission/permission'
Vue.use(PermissionHelper)

/**
* 深拷贝
* @param {arr} 
*/
const XHCopy = (bos) => {
  let ar = bos instanceof Array ? [] : {};
  for (let k in bos){
    let vul = bos[k]
    ar[k] = vul !== null && vul instanceof Object ? XHCopy(vul) : vul
  }
  return ar;
};
Vue.prototype.oaSvg = oaSvg
Vue.prototype.$XLSX = XLSX;
Vue.prototype.$md5 = md5;
Vue.prototype.$XHCopy = XHCopy;
Vue.prototype.$directives = directives;
Vue.prototype.$jurisdictionTb = jurisdictionTb;
Vue.prototype.$imports = imports;
Vue.prototype.resetSetItem = resetSetItem;

// permission 路由守卫
import './permission'
Vue.use(VueAxios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: h => h(App),
}).$mount('#app')
