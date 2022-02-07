// export default {
//   inserted(el, bindings, vnode) {
//     console.log(el, bindings, vnode);
//     let butPermissionValue = bindings.value;
//     let boolean = vnode.context.$store.state.butPermission(butPermissionValue)
//     !boolean && el.parentNode.removeChild(el)
//   }
// }
import Vue from 'vue'
import store from '@/store'
const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    const actionName = binding.value
    const roles = store.getters.roles
    const elVal = vnode.context.$route.path
    console.log(elVal);
    // const permissionId = elVal instanceof String && [elVal] || elVal
    const permissionId ="/notice/check"
    roles.forEach(p => {
      if (!permissionId.includes(p.url)) {
        return
      }
      if (p && p.url) {
        let index = p.url.lastIndexOf('/');
        p.url = p.url.substring(index + 1, p.url.length);
      }
      if (p.url && !p.url.includes(actionName)) {
        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
      }
    })
  }
})


export default action
