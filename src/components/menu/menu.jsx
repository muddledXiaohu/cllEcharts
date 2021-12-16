
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
    };
  },
  render() {
    const that = this;
    const panes = that.currentUser.map((item) => {
      return item.children && item.children.lenth != 0 ? (
        <a-sub-menu key={item.key + ''}>
          <span slot="title">
            <a-icon type="appstore" />
            <span>{item.title}</span>
          </span>
          {item.children.map((itemChild) => {
            return (
              <a-menu-item key={itemChild.key}
              {...{ on: { click: ({key}) => { this.saveNavState(itemChild, key) } } }}>
                <a-icon type="appstore" />
                <span>{itemChild.title}</span>
              </a-menu-item>
            );
          })}
        </a-sub-menu>
      ) : (
        <a-menu-item key={item.key}
        {...{ on: { click: ({key}) => { this.saveNavState(item, key) } } }}>
          <a-icon type="pie-chart" />
          <span>{item.title}</span>
        </a-menu-item>
      );
    });
    return (
      <a-menu
        mode="inline"
        inline-collapsed={this.collapsed}
        default-selected-keys={[1]}
        default-open-keys={[2]}
        selectedKeys={this.selectedKeys}
      >
        {panes}
      </a-menu>
    );
  },
  mounted() {
    this.updateMenu()
  },
  methods: {
    ...mapActions(['menuCache']),
    saveNavState (activePath, key) {
      this.$router.push(key)
      // console.log(activePath);
      // menuCache
      const { menuCache } = this
      menuCache(activePath)
    },
    updateMenu () {
      const routes = this.$route.matched.concat()
      this.selectedKeys = [ routes.pop().path ]
    }
  },
  watch: {
    '$route' () {
      this.updateMenu()
    }
  }
};
