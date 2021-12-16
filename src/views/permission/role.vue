<template>
  <div>
    <a-card
      style="width:100%"
      :tab-list="tabList"
      :active-tab-key="noTitleKey"
      @tabChange="key => onTabChange(key)"
    >
      <a-collapse :bordered="false">
        <a-collapse-panel key="1" header="CRM" :style="customStyle">
          <h5>通讯录</h5>
          <TreeProps :treeData='treeData' />
          <h5>通知公告</h5>
          <TreeProps :treeData='treeData' />
        </a-collapse-panel>
      </a-collapse>
    </a-card>
  </div>
</template>

<script>
import TreeProps from "@/components/tree/TreeProps.jsx";
export default {
  name: 'role',
  components: {
    TreeProps
  },
  data() {
    return {
      tabList: [
        {
          key: 'tab1',
          tab: '系统管理员',
        },
        {
          key: 'tab2',
          tab: '普通员工',
        },
        {
          key: 'tab3',
          tab: '行政',
        },
        {
          key: 'tab4',
          tab: '人事',
        },
      ],
      noTitleKey: 'tab1',
      treeData: [
        { title: '0-0-0-0', key: '0-0-0-0' },
        { title: '0-0-0-1', key: '0-0-0-1' },
        { title: '0-0-0-2', key: '0-0-0-2' },
      ],
      customStyle:'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
    };
  },
  mounted () {
  },
  methods: {
    onTabChange(key) {
      this['noTitleKey'] = key;
      console.log(key);
    }
  },
};
</script>
<style lang="less">
.custom-tree {
  display: flex;
}
</style>
