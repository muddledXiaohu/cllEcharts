
export default {
  props: {
    treeData: {
      type: Array,
    },
  },
  data() {
    return {
      checkedKeys: ['0-0-0'],
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      selectedKeys: [],
    };
  },
  render() {
    return (
        <a-tree
            class="custom-tree"
            {...{ on: { check: (key) => { this.$_handleInputUser(key) } } }}
            checkable
            expanded-keys={this.expandedKeys}
            auto-expand-parent={this.autoExpandParent}
            selected-keys={this.selectedKeys}
            tree-data={this.treeData}
            selectable={false}
            {...{ on: { expand: (key) => { this.onExpand(key) } } }}
            draggable
            // {...{ on: { select: (key) => { this.onSelect(key) } } }}
        >
        </a-tree>
    );
  },
  mounted() {
  },
  methods: {
    $_handleInputUser(checkedKeys) {
      console.log('onCheck', checkedKeys);
      this.checkedKeys = checkedKeys;
    },
    onExpand(expandedKeys) {
      console.log('onExpand', expandedKeys);
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    // onSelect(selectedKeys, info) {
    //   console.log('onSelect', info);
    //   this.selectedKeys = selectedKeys;
    // },
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val);
    },
  }
};