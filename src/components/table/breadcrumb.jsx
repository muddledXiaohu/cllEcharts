
import * as pathToRegexp from 'path-to-regexp'
export default {
  props: {
  },
  data() {
    return {
        levelList: {
            type: Array,
        }
    };
  },
  render() {
    const that = this;
    const panes = that.levelList.map((item, index) => {
      return (
        <a-breadcrumb-item key={'/' + item.path}>
            {item.redirect === 'noRedirect' || index == that.levelList.length-1 ?
            <span class="no-redirect">{ item.meta.title }</span> : 
            <span {...{ on: { click: () => { this.handleLink(item) } } }}>{ item.meta.title }</span>}
        </a-breadcrumb-item>
      );
    });
    return (
      <a-breadcrumb
      >
        {panes}
      </a-breadcrumb>
    );
  },
  created() {
    this.getBreadcrumb()
  },
  watch: {
    '$route' () {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]
      if (!this.isDashboard(first)) {
        matched = [{ path: '/openAccount', meta: { title: 'Dashboard' }}].concat(matched)
      }
      this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
      // console.log(this.levelList);
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    handleLink (item) {
      console.log(item);
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      // console.log(path);
      this.$router.push(this.pathCompile(path))
    },
    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    }
  }
};
