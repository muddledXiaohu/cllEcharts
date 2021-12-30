import { mapState } from 'vuex'

const baseMixin = {
  computed: {
    ...mapState({
      token: state => state.user.token,
      roles: state => state.app.roles,
      addRouters: state => state.permission.addRouters,
      visitedViews: state => state.user.visitedViews,
      contactsOBJ: state =>state.app.contactsOBJ,
    }),
  },
  methods: {
  }
}

export {
  baseMixin
}
