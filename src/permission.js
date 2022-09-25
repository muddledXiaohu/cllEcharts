import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // 进度条
import { ACCESS_TOKEN } from '@/store/mutation-types'

const loginRoutePath = '/login'
const defaultRoutePath = '/index/index'
router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && typeof to.meta.title !== 'undefined'
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
        next({ path: defaultRoutePath })
        NProgress.done()
      } else {
        if (store.getters.roles.length == 0) {
          console.log(123);
        } else {
          next()
        }
      }
      next()
  } else {
    to.path === '/login' ? next() : next({ path: '/login' })
    // next()
  }
})
router.afterEach(() => {
  NProgress.done() // finish progress bar
})
