const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  roleid: state => state.user.roleid,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.user.visitedViews,
  contactsOBJ: state => state.app.contactsOBJ,
}

export default getters
