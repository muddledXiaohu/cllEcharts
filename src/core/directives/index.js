// export default {
//   inserted(el, bindings, vnode) {
//     console.log(el, bindings, vnode);
//     let butPermissionValue = bindings.value;
//     let boolean = vnode.context.$store.state.butPermission(butPermissionValue)
//     !boolean && el.parentNode.removeChild(el)
//   }
// }
// import Vue from 'vue'
import store from '@/store'
// const action = Vue.directive('action', {
//   inserted: function (el, binding, vnode) {
//       // if (!permissionId.includes(p.url)) {
        
//     // check
//     const actionName = binding.value
//     // 权限Arr
//     const roles = store.getters.roles
//     const elVal = vnode.context.$route.path
//     // 地址
//     let permissionId = elVal instanceof String && [elVal] || elVal
//     let index = permissionId.lastIndexOf('/');
//     permissionId =  permissionId.substring(index + 1, permissionId.length);
//     roles.forEach(p => {
//       if (p && p.url && !p.code) {
//         return
//       }
//       if (!p.url.includes(permissionId)) {
//         return
//       }
//       // console.log(actionName);
//       console.log(p);
//       if (p.url.includes(actionName)) {
//         el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
//         return
//       }
//       // if (p.code && !p.code.includes(actionName)) {
//       // }
//     })
//     console.log(1);
//   }
// })

function action (directives, operationGroup) {
  // 权限Arr
  const roles = store.getters.roles
  let permissionId = this.$route.path
  let index = permissionId.lastIndexOf('/');
  permissionId =  permissionId.substring(index + 1, permissionId.length);
  
  const map1 = directives.map(item => {
    let arr = {}
    roles.forEach(p => {
      if (p && p.url && !p.code) {
        return
      }
      if (item.name === '调价记录' && permissionId === 'accountJoin') {
        permissionId = 'accountPrice'
      }
      if (permissionId == 'myCustomer' || permissionId == 'details') {
        permissionId = 'customer'
      }
      if (permissionId == 'accountApply') {
        permissionId = 'account/apply/'
      }
      // permitDistribute分配
      if (permissionId === 'customer' && item.title === 'permitDistribute' && p.url === "/customer/transfer") {
        // console.log(p);
        arr = item
        return
      }
      if (p.code.includes(item.title) && item.title == "permitGiveUp") {
        arr = item
        return
      }
      if (item.imports) {
        if (p.code.includes('import') && operationGroup) {
          let title = item.title + ':import'
          if (title && title === p.code) {
            arr = item
          }
        }
        return
      }
      if (item.title == 'permitReceive' && p.code === "customer:permitReceive") {
        arr = item
      }
      // 操作全部和自己
      if (!operationGroup && permissionId === 'customer' && p.code === "customer:permitDelete" && (item.title === "delete" || item.title === "save")) {
        item.whole = true
        arr = item
        return
      }
      if (item.title == 'hwg') {
        arr = item
        return
      }
      if (!p.url.includes(permissionId) && permissionId != 'dataImportJournal') {
        return
      }
      if (p.url.includes(item.title)) {
        arr = item
      }
    })
    return arr
  })
  return map1
}

export default action

