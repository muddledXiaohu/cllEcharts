import store from '@/store'
import storage from 'store'
import {
  ACCESS_CONTACTS,
  ACCESS_ROLEID
} from '@/store/mutation-types'

export default function Initializer () {
  if (storage.get(ACCESS_CONTACTS)) {
    const cONTACTS = JSON.parse(decodeURIComponent(window.atob(storage.get(ACCESS_CONTACTS))))
    store.commit(ACCESS_CONTACTS, cONTACTS)
  }
  if (storage.get(ACCESS_ROLEID)) {
    const roleid = JSON.parse(decodeURIComponent(window.atob(storage.get(ACCESS_ROLEID))))
    store.commit(ACCESS_ROLEID, roleid)
  }
  // last step
}
