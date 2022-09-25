
import { mapActions } from 'vuex'
export default {
  props: {
    currentUser: {
      type: Array,
    },
    collapsed: {
      type: Boolean,
    },
  },
  data() {
    return {
      selectedKeys: [],
      openKeys: [],
      rootSubmenuKeys: []
    };
  },
  render() {
    const that = this;
    const panes = that.currentUser.map((item) => {
      return item.children && item.children.lenth != 0 ? (
        <a-sub-menu key={item.key + ''}>
          <span slot="title">
            <a-icon type={item.icon} />
            <span>{item.title}</span>
          </span>
          {item.children.map((itemChild) => {
            return (
              <a-menu-item key={itemChild.key}
              {...{ on: { click: ({key}) => { this.saveNavState(itemChild, key) } } }}>
                <a-icon type={itemChild.icon} />
                <span>{itemChild.title}</span>
              </a-menu-item>
            );
          })}
        </a-sub-menu>
      ) : (
        <a-menu-item key={item.key}
        {...{ on: { click: ({key}) => { this.saveNavState(item, key) } } }}>
        <a-icon type={item.icon} />
          <span>{item.title}</span>
        </a-menu-item>
      );
    });
    return (
      <a-menu
        mode="inline"
        inline-collapsed={this.collapsed}
        openKeys={this.openKeys}
        selectedKeys={this.selectedKeys}
        onOpenChange={this.onOpenChange}
      >
        {panes}
      </a-menu>
    );
  },
  mounted() {
    this.rootSubmenu()
    this.updateMenu()
  },
  created() {
    window.addEventListener('sideOpen', ()=> {
      let sideOpenKey = sessionStorage.getItem('sideOpenKey') ?? ''
      this.openKeys = [sideOpenKey]
    })
  },
  methods: {
    ...mapActions(['menuCache']),
    saveNavState (activePath, key) {
      this.$router.push(key)
      // menuCache
      const { menuCache } = this
      menuCache(activePath)
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [ routes.pop().path ]
      // console.log(this.currentUser, this.selectedKeys);
      const { menuCache } = this
      this.currentUser.map(item => {
        if (item.children) {
          item.children.map(itemCh => {
            if (itemCh.key == this.selectedKeys[0]) {
              menuCache(itemCh)
            }
          })
        }
      })
    },
    rootSubmenu() {
      this.rootSubmenuKeys = this.currentUser.map( item => {
        return item.key ?? ''
      })
    },
    onOpenChange(keys) {
      const latestOpenKey = keys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = keys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  },
  watch: {
    '$route' () {
      this.updateMenu()
    }
  }
};
