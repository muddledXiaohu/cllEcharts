const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters,
  visitedViews: state => state.user.visitedViews,
}

export default getters
