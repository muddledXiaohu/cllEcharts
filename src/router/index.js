
import Vue from 'vue'   //引入Vue
import Router from 'vue-router'  //引入vue-router
import { constantRouterMap } from '@/config/router.config'


Vue.use(Router)  //Vue全局使用Router
export default new Router({
    routes: constantRouterMap
})