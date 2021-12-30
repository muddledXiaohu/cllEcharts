import storage from 'store'
import { login, usercenter } from '@/api/login'
import { ACCESS_TOKEN, ACCESS_ROLEID } from '@/store/mutation-types'
const user = {
  state: {
    token: '',
    roles: {},
    visitedViews: [
      {key: "/customer/international",
      name: "international",
      title: "客户公海"}
    ],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_visitedViews: (state, visitedViews) => {
      console.log(visitedViews);
      state.visitedViews = visitedViews
    },
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response.data
          console.log(result);
          storage.set(ACCESS_TOKEN, result.accessToken, 4 * 60 * 60 * 1000)
          const userInfo = window.btoa(window.encodeURIComponent(JSON.stringify(result.userInfo)))
          storage.set(ACCESS_ROLEID, userInfo)
          commit('SET_TOKEN', result.accessToken)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // tmd，如果未用到vuex不要写在user
    Usercenter({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        usercenter(userInfo).then(response => {
          commit('SET_ROLES', response.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit }) {
      return new Promise((resolve) => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', {})
          storage.remove(ACCESS_TOKEN)
          storage.remove(ACCESS_ROLEID)
          resolve()
      })
    },
    // 菜单缓存
    menuCache ({ commit }, userInfo) {
      return new Promise((resolve) => {
          let visitedViews = user.state.visitedViews
          if (visitedViews && visitedViews.length > 0) {
            for (const key in visitedViews) {
              if (visitedViews[key].key == userInfo.key) {
                return;
              }
            }
          }
          visitedViews.push(userInfo)
          commit('SET_visitedViews', visitedViews)
          resolve()
      })
    },
    // 关闭菜单缓存
    menuClose ({ commit }, userInfo) {
      return new Promise((resolve) => {
          let visitedViews = user.state.visitedViews
          if (visitedViews && visitedViews.length > 0) {
            for (const key in visitedViews) {
              if (visitedViews[key].key == userInfo.key) {
                visitedViews.splice(key, 1)
              }
            }
          }
          commit('SET_visitedViews', visitedViews)
          resolve()
      })
    }
  }
}

export default user
