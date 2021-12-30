import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // 进度条
import { ACCESS_TOKEN, ACCESS_ROLEID } from '@/store/mutation-types'

const loginRoutePath = '/login'
const defaultRoutePath = '/user/openAccount'
router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && typeof to.meta.title !== 'undefined'
  if (storage.get(ACCESS_TOKEN)) {
      if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        if (store.getters.roles.length === 0) {
          const userInfo = JSON.parse(decodeURIComponent(window.atob(storage.get(ACCESS_ROLEID))))
          console.log('storage:', userInfo);
          // store
          //   .dispatch('Usercenter', userInfo.roleId)
          //   .then(res => {
          //     console.log(res);
          //   })
          // store.dispatch('GenerateRoutes', userInfo.roleId).then(
          //   () => {
          //     store.getters.addRouters.forEach(r => {
          //       router.addRoute(r)
          //     })
          //   }
          // )
          // .catch(() => {
          //   console.log('失败');
          // })
        } else {
          next()
        }
      }
      next()
  } else {
    to.path === '/login' ? next() : next({ path: '/login' })
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
