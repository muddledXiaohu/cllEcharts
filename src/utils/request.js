
import axios from 'axios'
import notification from 'ant-design-vue/es/notification'
import storage from 'store'
import store from '@/store'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import Cookies from 'js-cookie'
Cookies.set('device', 'WEB');

// axios实例
const request = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    // withCredentials: true,
    headers: {
      // 'Content-Type': 'application/json;charset=UTF-8',
      'device': 'WEB'
    },
    timeout: 60000
  })
  // 
  request.defaults.baseURL = 'http://47.93.241.39:5000/'
  // request.defaults.baseURL = 'http://192.168.1.134/crm/'
  // request.defaults.baseURL = 'http://192.168.1.41/crm'
  // request.defaults.baseURL = 'https://oa.wxxsxx.com/crm/'
  // document
  // request.defaults.baseURL = '/apis/'

  // 异常拦截处理器
const errorHandler = (error) => {
    if (error.response) {
      const data = error.response.data
      const token = storage.get(ACCESS_TOKEN)
      if (error.response.status === 403) {
        notification.error({
          message: 'Forbidden',
          description: data.message
        })
      }
      // if (error.response.status === 500) {
      //   notification.error({
      //     message: 'Forbidden',
      //     description: data.message
      //   })
      // }
      if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
        notification.error({
          message: 'Unauthorized',
          description: 'Authorization verification failed'
        })
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        console.log(123);
        }
      }
    }
    return Promise.reject(error)
  }
// 请求拦截器// request interceptor
request.interceptors.request.use(config => {
    const token = storage.get(ACCESS_TOKEN)
    // 如果 token 存在
    // 让每个请求携带自定义 token 请根据实际情况自行修改
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  }, errorHandler)
  
  // response interceptor
  request.interceptors.response.use((response) => {
    const token = storage.get(ACCESS_TOKEN)
    // if (response.header && response.header.accessToken)
    if (response.data.code == 401) {
      notification.error({
        message: 'Forbidden',
        description: response.data.msg
      })
      if (token) {
        store.dispatch('Logout')
          setTimeout(() => {
            window.location.reload()
          }, 500)
        console.log(111);
      }
    }
    //  else if (response.data.code == -1) {
    //   notification.error({
    //     message: 'Forbidden',
    //     description: response.data.msg
    //   })
    // }
    //   storage.set(ACCESS_TOKEN, response.header.accessToken, 4 * 60 * 60 * 1000)
    return response.data
  }, errorHandler)

  const installer = {
    vm: {},
    install (Vue) {
      Vue.use(VueAxios, request)
    }
  }
  export default request
  export {
    installer as VueAxios,
    request as axios
  }