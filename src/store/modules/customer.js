import storage from 'store'
import { ACCESS_CONTACTS } from '@/store/mutation-types'
const customer = {
  state: {
    contactsOBJ: {},
  },

  mutations: {
    ACCESS_CONTACTS: (state, contactsOBJ) => {
      state.contactsOBJ = contactsOBJ
    },
  },

  actions: {
    information ({ commit }, userInfo) {
      commit('ACCESS_CONTACTS', userInfo)
      const userIf = window.btoa(window.encodeURIComponent(JSON.stringify(userInfo)))
      console.log(userIf);
      storage.set(ACCESS_CONTACTS, userIf)
    },
  }
}

export default customer
