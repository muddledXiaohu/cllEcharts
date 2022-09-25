
import store from '@/store'

function action (directives) {
  // 权限Arr
  const roles = store.getters.roles
  let permissionId = this.$route.path
  let index = permissionId.lastIndexOf('/');
  permissionId =  permissionId.substring(index + 1, permissionId.length);
  
  const map1 = directives.map(item => {
    let arr = {}
    roles.forEach(p => {
      if (p.url !== '/file/import' && p.url.includes('import')) {
        let index = p.url.lastIndexOf('/');
        let urls = p.url.substring(1, index)
        if (item.value === urls) {
          arr = item
        }
        // arr = urls === item.value ? item : {}
      }
    })
    return arr
  })
  return map1
}

export default action

