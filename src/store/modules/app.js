import storage from 'store'
import {
  // ACCESS_TOKEN,
  ACCESS_ROLEID,
  ACCESS_CONTACTS,
} from '@/store/mutation-types'

const app = {
  state: {
    contactsOBJ: {},
    roles: [],
    roleid: {}

  },
  mutations: {
    [ACCESS_CONTACTS]: (state, type) => {
      state.contactsOBJ = type
      const userIf = window.btoa(window.encodeURIComponent(JSON.stringify(type)))
      storage.set(ACCESS_CONTACTS, userIf)
    },
    [ACCESS_ROLEID]: (state, type) => {
      state.roleid = type
      const userIf = window.btoa(window.encodeURIComponent(JSON.stringify(type)))
      storage.set(ACCESS_ROLEID, userIf)
    },
  },
  actions: {
  }
}

export default app
