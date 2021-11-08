<script>
export default {
  props: {
    currentUser: {
      type: Array
    },
    menu: {
      type: Boolean
    },
  },
  data() {
      return {
        collapsed: false,
      }
  },
  render() {
    // const that = this;
    // const panes = that.currentUser.map((page) => {
    //   return (
    //     <a-menu-item key="{page.id}">
    //       <a-icon type="mail" />
    //         {page.title}
    //     </a-menu-item>
    //   );
    // });
    return (
      <a-menu
      >
      <a-menu-item key="1">
        <a-icon type="mail" />
        Navigation One
      </a-menu-item>
      <a-menu-item key="2">
        <a-icon type="calendar" />
        Navigation Two
      </a-menu-item>
      <a-sub-menu key="sub1">
        <span slot="title"><a-icon type="appstore" /><span>Navigation Three</span></span>
        <a-menu-item key="3">
          Option 3
        </a-menu-item>
        <a-menu-item key="4">
          Option 4
        </a-menu-item>
        <a-sub-menu key="sub1-2" title="Submenu">
          <a-menu-item key="5">
            Option 5
          </a-menu-item>
          <a-menu-item key="6">
            Option 6
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      </a-menu>
    );
  },
};
</script>
