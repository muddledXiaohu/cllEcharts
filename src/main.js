import Vue from 'vue'
import App from './App.vue'
import { Layout, Menu, Icon, Button } from 'ant-design-vue';
import router from './router'
// 导入全剧样式
import './assets/css/global.css'

Vue.use( Layout )
Vue.use( Menu )
Vue.use( Icon )
Vue.use( Button )

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
