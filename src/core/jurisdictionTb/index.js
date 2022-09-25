
import store from '@/store'

function action (directives) {
  // 权限Arr
  const roles = store.getters.roles
  let permissionId = this.$route.path
  let index = permissionId.lastIndexOf('/');
  permissionId =  permissionId.substring(index + 1, permissionId.length);
  
  const map1 = directives.map(item => {
    let arr = {}
      if (item.jurisdiction) {
        roles.forEach(p => {
          if (p.url === item.jurisdiction) {
            arr = item
          }
        })
      } else {
        arr = item
      }
    return arr
  })
  return map1
}

export default action

