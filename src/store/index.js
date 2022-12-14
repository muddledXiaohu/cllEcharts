import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/async-router'
import customer from './modules/customer'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    customer
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
