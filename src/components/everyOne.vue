<template>
  <div class="main">
    <a-layout>
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <!-- 侧边栏 -->
        <MyHeader :menu="false" :currentUser='arrs' />
      </a-layout-sider>
      <a-layout>
        <!-- Header -->
        <a-layout-header :style="{ position: 'fixed', zIndex: 9, width: '100%' }">
          <a-button
            type="primary"
            class="toggleCollapsed"
            @click="toggleCollapsed"
          >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
        </a-layout-header>
        <a-layout-content>
          <div class="rootlk">
            <TagsView />
            <Breadcrumb class="Breadcrumb" />
          </div>
          <!-- 内容 -->
          <div class="keepalv">
            <keep-alive :max="10" :include="cachedViews">
              <router-view :key="key" />
            </keep-alive>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MyHeader from "@/components/menu/menu.jsx";
import Breadcrumb from "@/components/table/breadcrumb.jsx";
import TagsView from "@/components/TagsView";
export default {
  computed: {
    cachedViews() {
      let arr = []
      for (const key in this.$store.state.user.visitedViews) {
        arr.push(this.$store.state.user.visitedViews[key].name)
      }
      return arr
    },
    key() {
      return this.$route.path
    }
  },
  data() {
    return {
      collapsed: false,
      arrs: [
        {title: '客户管理', name: 'customer', id: 1, key: '/customer', children:[
          {title:'客户公海', name: 'international', key: '/customer/international'},
          {title:'我的客户', name: 'mine', key: '/customer/mine'} 
        ]},
        {title: '开户管理', name: 'user', id: 2, key: '/user', children:[
          {title: '开户申请', name: 'openAccount', key: '/user/openAccount'},
          {title: '账号', name: 'accountNumber', key: '/user/accountNumber'}
        ]},
        {title: 'role', name: 'role', id: 3, key: '/user/role'},
        // {title: 'c', id: 3, key: 'user/roo'}
      ]
    };
  },
  components: {
    MyHeader,
    Breadcrumb,
    TagsView
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    }
  },
};
</script>

<style lang="less" scoped>
  /deep/.ant-layout-header {
    background-color: #fff;
  }
  /deep/.ant-layout-sider {
    background-color: #fff;
  }
  .main {
    height: 100%;
  }
  /deep/.ant-layout.ant-layout-has-sider {
      height: 100%;
  }
  /deep/.ant-layout-header {
    display: flex;
      align-items: center;
  }
  /deep/ .ant-layout {
      position: relative;
  }
  .toggleCollapsed{
    margin-right: 10px;
  }
  .Breadcrumb {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
    padding-left: 40px;
  }
  .rootlk {
    position: fixed;
    z-index: 9;
    width: 100%;
    margin-top: 60px;
  }
  .keepalv {
    margin-top: 130px;
  }
</style>
<style lang="less">
  .FormActionItem {
    margin-bottom: 10px;
  }
</style>
